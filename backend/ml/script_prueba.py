import os
import requests
from decouple import config


API_KEY = "FMMDYB1GV14HBAH28E4H0TQYZC"
url = "https://api.climatiq.io/data/v1/estimate"

payload = {
    "emission_factor": {
        "activity_id": "electricity-supply_grid-source_residual_mix",
        "data_version": "21.21"               
    },
    "parameters": {
        "energy": 4200,
        "energy_unit": "kWh"
    }
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


resp = requests.post(url, json=payload, headers=headers)
resp.raise_for_status() 

data = resp.json()
print(f"Emisiones estimadas: {data['co2e']} {data['co2e_unit']}")