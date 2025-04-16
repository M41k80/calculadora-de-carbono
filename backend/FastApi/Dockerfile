# Usa una imagen oficial de Python como base
FROM python:3.10-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de FastAPI y ML al contenedor
COPY backend/FastApi/ /app/fastapi/
COPY backend/ml/ /app/ml/

# Copia el archivo de requerimientos a la imagen
COPY requirements.txt /app/

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt


# Expón el puerto donde FastAPI estará escuchando
EXPOSE 8000

# Comando para ejecutar la aplicación con Uvicorn
CMD ["uvicorn", "fastapi.main:app", "--host", "0.0.0.0", "--port", "8000"]
