import requests
from decouple import config

API_KEY = config("CLIMATIQ_API_KEY")
url = "https://api.climatiq.io/data/v1/estimate"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

factores = {
    "electricidad": {
        "activity_id": "electricity-supply_grid-source_residual_mix",
        "parameters": {"energy": 1, "energy_unit": "kWh"}
    },
    "auto": {
        "activity_id": "passenger_vehicle-vehicle_type_medium_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na",
        "parameters": {"distance": 1, "distance_unit": "km"}
    },
    "avion": {
        "activity_id": "passenger_flight-route_type_short-haul-aircraft_type_na-class_economy-fuel_source_jet_fuel",
        "parameters": {"distance": 1, "distance_unit": "km"}
    },
    "residuos": {
        "activity_id": "waste_type_organic_matter_disposal_method_landfill",
        "parameters": {"weight": 1, "weight_unit": "kg"}
    }
}

factores_resultado = {}

for nombre, datos in factores.items():
    payload = {
        "emission_factor": {
            "activity_id": datos["activity_id"],
            "data_version": "21.21"
        },
        "parameters": datos["parameters"]
    }

    resp = requests.post(url, json=payload, headers=headers)

    if resp.status_code != 200:
        print(f"❌ Error al consultar {nombre}: {resp.status_code}")
        print(resp.text)
        continue

    co2e = resp.json()["co2e"]
    factores_resultado[nombre] = co2e
    print(f"✅ {nombre.capitalize()}: {co2e} kg CO₂e por unidad")

# Agua (estimación manual)
factores_resultado["agua"] = 0.0003
print(f"✅ Agua: 0.0003 kg CO₂e por litro (estimado)")

print("\n🌱 Factores de emisión finales:")
print(factores_resultado)

