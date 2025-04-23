# 🌍 **Proyecto: Calculadora de Huella de Carbono para Empresas**

## 🎯 **Objetivo**
El propósito de este proyecto es ayudar a las empresas a medir, visualizar y reducir su huella de carbono a través de una plataforma web fácil de usar. La plataforma integra:

- **Cálculo automatizado de emisiones** basadas en el consumo de energía, transporte, residuos, y otros factores.
- **Predicciones de emisiones futuras** utilizando modelos de IA.
- **Recomendaciones personalizadas** para reducir las emisiones y promover prácticas más sostenibles.

## 🔧 **Tecnologías Utilizadas**
- **Dataset**: Dataset de emisiones de c02 Climatiq.io
- **Backend**: FastAPI
- **Frontend**: React.js (por definir si se incluirá)
- **Modelos de IA**: Scikit-learn / TensorFlow (para predicciones de emisiones)
- **Base de datos**: (en caso de usar una DB)
- **Plataforma de Despliegue**: Render

# Endpoint

## POST /predict/emisiones

URL:

https://calculadora-carbono-7ero.onrender.com/predict/emisiones/


{
    "electricidad_uso": 100,
    "auto_uso": 10,
    "avion_uso": 3,
    "residuos_uso": 15,
    "agua_uso": 35
}

## electricidad_uso: Consumo de electricidad en kWh.
## auto_uso: Kilómetros recorridos en automóvil.
## avion_uso: Número de vuelos tomados por la empresa.
## residuos_uso: Cantidad de residuos generados en la empresa (en kg).
## agua_uso: Consumo de agua en litros por m3.



# 📊 Ejemplo de Uso

## Realiza una petición POST con los valores deseados:

curl -X 'POST' \
  'https://calculadora-carbono-7ero.onrender.com/predict/emisiones/' \
  -H 'Content-Type: application/json' \
  -d '{
  "electricidad_uso": 100,
  "auto_uso": 10,
  "avion_uso": 3,
  "residuos_uso": 15,
  "agua_uso": 35
}'



## response

{
    "emisiones_estimadas": 531.2031430597182,
    "clasificacion": "baja",
    "consejos": "1. Electricidad:\n   - Aumentar la eficiencia energética en la empresa. Esto se puede lograr mediante la implementación de aparatos de consumo bajo, la inspección y mantenimiento regular de la iluminación y la instalación de paneles solares en el techo de la oficina o en un parque solar.\n   - Contratar energía renovable de proveedores certificados.\n\n2. Auto:\n   - Fomentar el trabajo desde casa, si es posible, para reducir el número de viajes a pie o en bicicleta.\n   - Si es necesario viajar, utilizar vehículos híbridos o eléctricos.\n   - Combinar los viajes de los empleados para reducir el número de coches en carretera.\n\n3. Vuelos:\n   - Utilizar videoconferencia o teletrabajo en lugar de vuelos para las reuniones y las visitas a clientes.\n   - Si es necesario viajar, compensar el impacto carbónico del vuelo mediante proyectos de reforestación o reducir el impacto de los viajes en el resto del itinerario.\n\n4. Residuos:\n   -"
}


## https://calculadora-carbono-7ero.onrender.com/predict/from-csv-mensual/

# para cargar un csv con el formato de ejemplo


## https://calculadora-carbono-7ero.onrender.com/predict/future/

# para predicciones futuras


## https://calculadora-carbono-7ero.onrender.com/chat-carbono 
# para el chat