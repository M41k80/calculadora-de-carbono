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
from fastapi import Query
from datetime import datetime
from typing import List
import calendar

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
    # Calcular las emisiones
    emisiones = calcular_emisiones(data)

    # Crear un diccionario con los datos de entrada y las emisiones
    input_data_dict = {**data.dict(), **{f"{k}_emisiones": v for k, v in emisiones.items()}}

    # Crear un DataFrame con las columnas que el modelo espera
    # Asegúrate de que las columnas coincidan exactamente con las que el modelo usa
    entrada_df = pd.DataFrame([input_data_dict])

    # Verifica que las columnas esperadas estén presentes
    columnas_faltantes = [
        col for col in modelo_regresion.feature_names_in_ if col not in entrada_df.columns
    ]
    if columnas_faltantes:
        raise ValueError(f"Faltan las columnas: {', '.join(columnas_faltantes)}")

    # Realizar la predicción con las características del modelo
    return float(modelo_regresion.predict(entrada_df[modelo_regresion.feature_names_in_])[0])


    # Crear el DataFrame con las columnas renombradas
    entrada_df = pd.DataFrame([input_data_dict_renamed])

    # Realizar la predicción con las características esperadas por el modelo
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


def generar_prompt_futuro(promedios, n_meses, predicciones):
    return (
        f"Soy un asistente experto en sostenibilidad ambiental. A continuación se muestran los valores promedio "
        f"de consumo de una empresa (en los últimos meses):\n"
        f"- Electricidad: {promedios['electricidad_uso']:.2f} kWh\n"
        f"- Auto: {promedios['auto_uso']:.2f} km\n"
        f"- Avión: {int(round(promedios['avion_uso']))} vuelos\n"
        f"- Residuos: {promedios['residuos_uso']:.2f} kg\n"
        f"- Agua: {promedios['agua_uso']:.2f} m³\n\n"
        f"Se han estimado las emisiones para los próximos {n_meses} meses. "
        f"En base a esto, sugiere recomendaciones específicas para reducir las emisiones futuras y ser más sostenible."
    )

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





class HistorialMensual(BaseModel):
    mes: str
    anio: int
    electricidad_uso: float
    auto_uso: float
    avion_uso: int
    residuos_uso: float
    agua_uso: float
    
    

meses_espanol = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

def generar_meses_prediccion(n_meses: int) -> List[dict]:
    fecha_actual = datetime.now()
    meses = []
    
    for i in range(1, n_meses + 1):
        fecha_pred = fecha_actual + pd.DateOffset(months=i)
        mes_numero = fecha_pred.month
        mes_espanol = meses_espanol[mes_numero - 1]
        meses.append({
            "mes": mes_espanol,
            "anio": fecha_pred.year
        })
    
    return meses

@app.post("/predict/future/")
async def predict_future(
    historial: List[HistorialMensual], 
    meses_a_predecir: int, 
    _: Callable = Depends(cargar_modelos)
):
    try:
        # 1. Validación básica
        if meses_a_predecir <= 0:
            raise HTTPException(400, "El número de meses a predecir debe ser positivo")
        
        if len(historial) < 3:
            raise HTTPException(400, "Se requieren al menos 3 meses de historial")

        # 2. Procesamiento de datos
        df = pd.DataFrame([h.dict() for h in historial])
        
        # Mapeo de meses a números
       
        df['mes_numero'] = df['mes'].str.lower().map(lambda x: meses_espanol.index(x) + 1)
        
        # 3. Ordenamiento temporal
        df['fecha'] = pd.to_datetime(df['anio'].astype(str) + '-' + df['mes_numero'].astype(str), format='%Y-%m')
        df = df.sort_values('fecha')
        
        # 4. Predicción por mes
        resultados = []
        meses_prediccion = generar_meses_prediccion(meses_a_predecir)
        
        for mes_pred in meses_prediccion:
            # Usar promedio de últimos 3 meses
            df_reciente = df.tail(3)
            promedios = {
                'electricidad_uso': df_reciente['electricidad_uso'].mean(),
                'auto_uso': df_reciente['auto_uso'].mean(),
                'avion_uso': round(df_reciente['avion_uso'].mean()),
                'residuos_uso': df_reciente['residuos_uso'].mean(),
                'agua_uso': df_reciente['agua_uso'].mean()
            }
            
            # Validación de promedios
            if any(pd.isna(val) for val in promedios.values()):
                raise HTTPException(400, "No se pudieron calcular promedios para los últimos 3 meses")
            
            # Predicción
            data = InputData(**promedios)
            emisiones = predecir_emisiones(data)
            
            resultados.append({
                "mes": mes_pred['mes'],
                "anio": mes_pred['anio'],
                **promedios,
                "emisiones_estimadas": emisiones,
                "clasificacion": clasificar_emisiones(data)
            })
        
        # 5. Generación de consejos
        prompt = f"""
        Basado en {len(historial)} meses históricos y {meses_a_predecir} meses proyectados:
        
        Consumo promedio proyectado:
        - Electricidad: {sum(r['electricidad_uso'] for r in resultados)/meses_a_predecir:.1f} kWh/mes
        - Transporte: {sum(r['auto_uso'] for r in resultados)/meses_a_predecir:.1f} km/mes
        - Vuelos: {sum(r['avion_uso'] for r in resultados)/meses_a_predecir:.1f}/mes
        
        Genera 3 recomendaciones específicas con:
        - Acción concreta
        - % reducción esperada
        - Dificultad de implementación
        """
        
        return {
            "predicciones": resultados,
            "consejos": generar_respuesta(prompt)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Error interno: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
    
