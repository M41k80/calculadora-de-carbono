from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar OpenRouter
client = OpenAI(
    api_key=os.getenv("OPENROUTER_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# Factores de emisión
FACTORES_EMISION = {
    "electricidad": 0.4,
    "auto": 0.2,
    "avion": 150,
    "residuos": 0.5,
    "agua": 0.1
}

# Modelo de entrada
class InputData(BaseModel):
    electricidad_uso: float
    auto_uso: float
    avion_uso: int
    residuos_uso: float
    agua_uso: float

app = FastAPI()

# Calcular emisiones
def calcular_emisiones(data: InputData):
    electricidad_emisiones = data.electricidad_uso * FACTORES_EMISION["electricidad"]
    auto_emisiones = data.auto_uso * FACTORES_EMISION["auto"]
    avion_emisiones = data.avion_uso * FACTORES_EMISION["avion"]
    residuos_emisiones = data.residuos_uso * FACTORES_EMISION["residuos"]
    agua_emisiones = data.agua_uso * FACTORES_EMISION["agua"]
    total_emisiones = electricidad_emisiones + auto_emisiones + avion_emisiones + residuos_emisiones + agua_emisiones

    return {
        "electricidad_emisiones": electricidad_emisiones,
        "auto_emisiones": auto_emisiones,
        "avion_emisiones": avion_emisiones,
        "residuos_emisiones": residuos_emisiones,
        "agua_emisiones": agua_emisiones,
        "total_emisiones": total_emisiones,
        "clasificacion": clasificacion_emisiones(total_emisiones)
    }

# Clasificación según el total
def clasificacion_emisiones(total_emisiones):
    if total_emisiones < 10000:
        return "baja"
    elif total_emisiones < 25000:
        return "media"
    else:
        return "alta"

# Función para generar texto con OpenRouter (GPT)
def generar_respuesta(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct",
            messages=[
                {"role": "system", "content": "Eres un asistente experto en sostenibilidad que ayuda a empresas a reducir su huella de carbono."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error al generar la respuesta: {str(e)}"

# Función para generar el prompt ajustado a empresas
def generar_prompt(data: InputData, prediccion: dict) -> str:
    return f"""
    Eres un asistente experto en sostenibilidad empresarial. El cliente es una empresa que busca reducir su huella de carbono. 

    El consumo mensual de la empresa es el siguiente:
    - Electricidad: {data.electricidad_uso} kWh
    - Auto: {data.auto_uso} km
    - Vuelos: {data.avion_uso}
    - Residuos: {data.residuos_uso} kg
    - Agua: {data.agua_uso} m3

    La huella de carbono total estimada de la empresa es de {prediccion['total_emisiones']} kg de CO2.

    Basado en estos datos, ¿qué recomendaciones específicas podrías dar a la empresa para reducir su huella de carbono? Considera acciones que las empresas puedan tomar en sus operaciones y procesos para reducir su impacto ambiental.
    """

# Endpoint principal
@app.post("/predict/emisiones/")
async def predict_emisiones(data: InputData):
    try:
        prediccion = calcular_emisiones(data)  # Calculas las emisiones
        prompt = generar_prompt(data, prediccion)  # Generas el prompt ajustado para empresas
        respuesta_openai = generar_respuesta(prompt)  # Obtienes la respuesta de OpenAI
        return {
            "emisiones": prediccion,
            "consejos": respuesta_openai
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
