import joblib
import pandas as pd

# Cargar el modelo
modelo_regresion = joblib.load('modelo_regresion.pkl')
modelo_clasificacion = joblib.load('modelo_clasificacion.pkl')

# Supongamos que tienes un archivo CSV con los datos de entrenamiento
# Si no tienes el archivo, usa el mismo dataset que usaste para entrenar el modelo
# df = pd.read_csv('dataset_emisiones.csv')
df = pd.read_csv('dataset_emisiones_clasificado.csv')


print("Columnas del DataFrame:", df.columns)
# Extraer las características
X_train = df.drop(columns='target')  # Suponiendo que 'target' es la variable objetivo

# Ver los nombres de las características
print("Características del modelo:", X_train.columns)