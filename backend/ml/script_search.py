import random
import csv

# Factores validados
FACTORES_VALIDOS = {
    "electricidad": {"unit": "kWh", "valor_unitario": 0.4752},
    "auto": {"unit": "km", "valor_unitario": 0.1773},
    "avion": {"unit": "km", "valor_unitario": 0.255},
    "residuos": {"unit": "kg", "valor_unitario": 1.9},
    "agua": {"unit": "litros", "valor_unitario": 0.0003}
}

def generar_dato_actividad(nombre, unidad):
    if unidad == "kWh":
        return round(random.uniform(100, 10000), 2)
    elif unidad == "km":
        return round(random.uniform(10, 2000), 2)
    elif unidad == "kg":
        return round(random.uniform(5, 500), 2)
    elif unidad == "litros":
        return round(random.uniform(1000, 50000), 2)
    return 0

def clasificar_emisiones(valor):
    if valor < 1000:
        return "baja"
    elif valor < 5000:
        return "media"
    else:
        return "alta"

def generar_registros(n=10000):
    registros = []
    for _ in range(n):
        registro = {}
        total_emisiones = 0

        for actividad, datos in FACTORES_VALIDOS.items():
            valor = generar_dato_actividad(actividad, datos["unit"])
            emisiones = round(valor * datos["valor_unitario"], 4)
            registro[f"{actividad}_uso"] = valor
            registro[f"{actividad}_emisiones"] = emisiones
            total_emisiones += emisiones

        registro["total_emisiones"] = round(total_emisiones, 4)
        registro["clasificacion"] = clasificar_emisiones(total_emisiones)
        registros.append(registro)

    return registros

def guardar_csv(registros, filename="dataset_emisiones_clasificado.csv"):
    if not registros:
        return

    campos = list(registros[0].keys())
    with open(filename, mode="w", newline="") as archivo:
        writer = csv.DictWriter(archivo, fieldnames=campos)
        writer.writeheader()
        writer.writerows(registros)
    print(f"✅ Dataset guardado como {filename}")

# Ejecutar
if __name__ == "__main__":
    dataset = generar_registros(50000)
    guardar_csv(dataset)
