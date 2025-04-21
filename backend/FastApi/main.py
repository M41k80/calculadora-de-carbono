from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import joblib
import os
import pandas as pd
from typing import Callable
import asyncio
from fastapi.middleware.cors import CORSMiddleware
import io

# Cargar variables de entorno
load_dotenv()

# Configurar cliente OpenAI (OpenRouter)
client = OpenAI(
    api_key=os.getenv("OPENROUTER_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# Inicializar FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

modelo_regresion = None
modelo_clasificacion = None

# Cargar modelos asincrónicamente
async def cargar_modelos_asincrono() -> None:
    global modelo_regresion, modelo_clasificacion
    if modelo_regresion is None or modelo_clasificacion is None:
        print("Cargando modelos...")
        ruta_regresion = os.path.join(os.path.dirname(__file__), 'ml/modelo_regresion_comprimido.pkl')
        ruta_clasificacion = os.path.join(os.path.dirname(__file__), 'ml/modelo_clasificacion_comprimido.pkl')
        modelo_regresion = await asyncio.to_thread(joblib.load, ruta_regresion)
        modelo_clasificacion = await asyncio.to_thread(joblib.load, ruta_clasificacion)
        print("Modelos cargados correctamente.")

# Dependencia para cargar modelos
async def cargar_modelos() -> None:
    await cargar_modelos_asincrono()

# Esquema de entrada
class InputData(BaseModel):
    electricidad_uso: float
    auto_uso: float
    avion_uso: int
    residuos_uso: float
    agua_uso: float

def calcular_emisiones(data: InputData):
    return {
        'electricidad': data.electricidad_uso * 0.233,
        'auto': data.auto_uso * 0.2,
        'avion': data.avion_uso * 1000 * 0.115,
        'residuos': data.residuos_uso * 0.9,
        'agua': data.agua_uso * 0.3
    }

def predecir_emisiones(data: InputData):
    emisiones = calcular_emisiones(data)
    entrada_df = pd.DataFrame([{
        **data.dict(),
        **{f"{k}_emisiones": v for k, v in emisiones.items()}
    }])
    return float(modelo_regresion.predict(entrada_df[modelo_regresion.feature_names_in_])[0])

def clasificar_emisiones(data: InputData):
    emisiones = calcular_emisiones(data)
    entrada_df = pd.DataFrame([{
        **data.dict(),
        **{f"{k}_emisiones": v for k, v in emisiones.items()}
    }])
    return modelo_clasificacion.predict(entrada_df[modelo_clasificacion.feature_names_in_])[0]

# --- Generación de prompts ---
def generar_prompt_individual(data: InputData, total: float, clasificacion: str) -> str:
    return f"""
    Como experto en sostenibilidad, analiza estos datos MENSUALES:
    - Electricidad: {data.electricidad_uso} kWh
    - Transporte: {data.auto_uso} km en auto, {data.avion_uso} vuelos
    - Residuos: {data.residuos_uso} kg
    - Agua: {data.agua_uso} m³
    
    Huella calculada: {total:.2f} kg CO2 ({clasificacion})
    
    Proporciona:
    1. 3 acciones concretas priorizando las áreas más contaminantes
    2. Reducción estimada para cada acción
    3. Ejemplos prácticos implementables
    """

def generar_prompt_anual(promedios: dict, detalles_mensuales: list, total_anual: float) -> str:
    meses_info = "\n".join(
        f"- {d['mes']}: "
        f"Elec: {d['electricidad_uso']} kWh, "
        f"Auto: {d['auto_uso']} km, "
        f"Vuelos: {d['avion_uso']}, "
        f"Residuos: {d['residuos_uso']} kg, "
        f"Agua: {d['agua_uso']} m³"
        for d in detalles_mensuales
    )
    
    return f"""
    Como consultor senior, analiza estos datos ANUALES:
    
    Promedios mensuales:
    - Electricidad: {promedios['electricidad']:.1f} kWh/mes
    - Transporte: {promedios['auto']:.1f} km/mes, {promedios['avion']:.1f} vuelos/mes
    - Residuos: {promedios['residuos']:.1f} kg/mes
    - Agua: {promedios['agua']:.1f} m³/mes
    
    Detalle mensual:
    {meses_info}
    
    Huella total: {total_anual:.2f} kg CO2
    
    Genera SOLO 3 recomendaciones PRIORIZADAS con:
    - 🎯 Acción concreta
    - 📈 Impacto estimado (kg CO2/año)

    Ejemplo: 
    "1. Instalar paneles solares (15,000 kWh/año) → Ahorro estimado: 3,500 kg CO2/año • Rentabilidad alta • Plazo medio"
    """

# --- Endpoints ---
@app.post("/predict/emisiones/")
async def predict_individual(data: InputData, _: Callable = Depends(cargar_modelos)):
    try:
        total = predecir_emisiones(data)
        clasificacion = clasificar_emisiones(data)
        prompt = generar_prompt_individual(data, total, clasificacion)
        return {
            "emisiones": total,
            "clasificacion": clasificacion,
            "consejos": generar_respuesta(prompt)
        }
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/predict/from-csv-mensual/")
async def predict_csv(csv: UploadFile = File(...)):
    await cargar_modelos()
    
    try:
        # Procesamiento del CSV
        df = pd.read_csv(io.BytesIO(await csv.read()), sep=';')
        if df.shape[1] == 1:
            df = df.iloc[:, 0].str.split(",", expand=True)
            df.columns = df.iloc[0]
            df = df.drop(0)
        
        df.columns = df.columns.str.strip()
        required_cols = ['mes', 'anio', 'electricidad_uso', 'auto_uso', 'avion_uso', 'residuos_uso', 'agua_uso']
        if missing := [c for c in required_cols if c not in df.columns]:
            raise HTTPException(400, f"Faltan columnas: {', '.join(missing)}")

        # Procesamiento de datos
        resultados = []
        resumen_anual = {}
        
        for _, row in df.iterrows():
            data = InputData(
                electricidad_uso=float(row['electricidad_uso']),
                auto_uso=float(row['auto_uso']),
                avion_uso=int(row['avion_uso']),
                residuos_uso=float(row['residuos_uso']),
                agua_uso=float(row['agua_uso'])
            )
            
            total = predecir_emisiones(data)
            cls = clasificar_emisiones(data)
            
            resultados.append({
                "mes": row['mes'],
                "anio": row['anio'],
                **data.dict(),
                "emisiones": total,
                "clasificacion": cls
            })
            
            if row['anio'] not in resumen_anual:
                resumen_anual[row['anio']] = {"total": 0.0, "detalles": []}
            resumen_anual[row['anio']]["total"] += total
            resumen_anual[row['anio']]["detalles"].append({
                "mes": row['mes'],
                "emisiones": total
            })

        # Generación de recomendaciones anuales
        recomendaciones = []
        for anio, info in resumen_anual.items():
            df_anio = df[df['anio'] == anio]
            promedios = {
                'electricidad': df_anio['electricidad_uso'].astype(float).mean(),
                'auto': df_anio['auto_uso'].astype(float).mean(),
                'avion': df_anio['avion_uso'].astype(int).mean(),
                'residuos': df_anio['residuos_uso'].astype(float).mean(),
                'agua': df_anio['agua_uso'].astype(float).mean()
            }
            
            detalles_mensuales = [
                d for d in resultados if d["anio"] == anio
            ]
            
            prompt = generar_prompt_anual(
                promedios=promedios,
                detalles_mensuales=detalles_mensuales,
                total_anual=info["total"]
            )
            
            recomendaciones.append({
                "anio": anio,
                "emisiones_totales": info["total"],
                "promedios_mensuales": promedios,
                "consejos": generar_respuesta(prompt)
            })

        return {
            "detalle_mensual": resultados,
            "resumen_anual": recomendaciones
        }

    except Exception as e:
        raise HTTPException(500, str(e))

# --- Funciones auxiliares ---
def generar_respuesta(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct",
            messages=[
                {"role": "system", "content": "Eres un consultor de sostenibilidad experto en reducción de huella de carbono en empresas solamente."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=600
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error al generar recomendaciones: {str(e)}"

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)