## API Documentation

### Authentication

#### Register User

**Endpoint**
```
POST /api/v1/auth/register
 "https://calculadora-de-carbono-1rzt.onrender.com/api/v1/auth/register"
```

**Request Body**
```json
{
  "email": "caleb@example.com",
  "password": "password123",
  "name": "Caleb",
  "companyname": "Example"
}
```

**Response**
```json
{
  "id": 1,
  "email": "caleb@example.com",
  "name": "Caleb",
  "companyname": "Example"
}
```

#### Login User

**Endpoint**
```
POST /api/v1/auth/login
 "https://calculadora-de-carbono-1rzt.onrender.com/api/v1/auth/login"
```

**Request Body**
```json
{
  "email": "caleb@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "token": "<jwt-token>"
}
```

Include the token in subsequent requests as an Authorization header:
```
Authorization: Bearer <jwt-token>
```

---

### Carbon Calculator

All endpoints below require a valid JWT in the `Authorization` header.

#### Upload Monthly CSV

**Endpoint**
```
POST /api/v1/carbon/upload
```

**Form Data**
- `csv` &mdash; File field containing the CSV. Must include header row and columns: `month`, `year`, `electricity_usage`, `vehicle_usage`, `flight_count`, `waste_amount`, `water_usage`.

**Curl Example**
```bash
curl -X POST "https://your-domain.com/api/v1/carbon/upload" \
  -H "Authorization: Bearer <jwt-token>" \
  -F "csv=@data.csv"
```

**Response**
```json
{
    "detalle_mensual": [
        {
            "mes": "enero",
            "anio": "2024",
            "electricidad_uso": 1200.0,
            "auto_uso": 350.0,
            "avion_uso": 2,
            "residuos_uso": 500.0,
            "agua_uso": 100.0,
            "emisiones": 1252.975127248603,
            "clasificacion": "media"
        }, 
        ...
    ],
    "resumen_anual": [
        {
            "anio": "2024",
            "emisiones_totales": 14811.004658184866,
            "promedios_mensuales": {
                "electricidad": 1212.5,
                "auto": 360.8333333333333,
                "avion": 1.25,
                "residuos": 493.3333333333333,
                "agua": 102.25
            },
            "consejos": "..."
        }
    ]
}
```

#### Get Emission History

**Endpoint**
```
GET /api/v1/carbon/history
```

**Curl Example**
```bash
curl -X GET "http://localhost:4000/api/v1/carbon/history" \
  -H "Authorization: Bearer <TU_JWT_AQUÍ>"

```

**Response**
```json
{
    "detalle_mensual": [
        {
            "mes": "septiembre",
            "anio": "2024",
            "electricidad_uso": 1200,
            "auto_uso": 370,
            "avion_uso": 1,
            "residuos_uso": 500,
            "agua_uso": 100,
            "emisiones": 1214.995,
            "clasificacion": "media"
        },{
            ...
        }
  
    ],
    "resumen_anual": [
        {
            "anio": "2024",
            "emisiones_totales": 14811.005,
            "promedios_mensuales": {
                "electricidad": 1212.5,
                "auto": 360.83334,
                "avion": 1.25,
                "residuos": 493.33334,
                "agua": 102.25
            }
        },
        {
           ...
        }
    ]
}
```
