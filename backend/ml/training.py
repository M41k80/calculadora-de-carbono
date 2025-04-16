import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, accuracy_score
import joblib

# Cargar el dataset
dataset = pd.read_csv('dataset_emisiones_clasificado.csv')

# Preparamos las variables predictoras y las etiquetas
X = dataset.drop(columns=["total_emisiones", "clasificacion"])  # Características (features)
y_regresion = dataset["total_emisiones"]  # Etiqueta para regresión
y_clasificacion = dataset["clasificacion"]  # Etiqueta para clasificación

# Dividir en conjunto de entrenamiento y prueba
X_train, X_test, y_reg_train, y_reg_test = train_test_split(X, y_regresion, test_size=0.2, random_state=42)
X_train_class, X_test_class, y_class_train, y_class_test = train_test_split(X, y_clasificacion, test_size=0.2, random_state=42)

# Modelo de regresión: RandomForestRegressor
modelo_regresion = RandomForestRegressor(n_estimators=100, random_state=42)
modelo_regresion.fit(X_train, y_reg_train)

# Predecir y evaluar el modelo de regresión
y_reg_pred = modelo_regresion.predict(X_test)
mae = mean_absolute_error(y_reg_test, y_reg_pred)
print(f"Regresión - Error absoluto medio (MAE): {mae}")

# Modelo de clasificación: RandomForestClassifier
modelo_clasificacion = RandomForestClassifier(n_estimators=100, random_state=42)
modelo_clasificacion.fit(X_train_class, y_class_train)

# Predecir y evaluar el modelo de clasificación
y_class_pred = modelo_clasificacion.predict(X_test_class)
accuracy = accuracy_score(y_class_test, y_class_pred)
print(f"Clasificación - Precisión (Accuracy): {accuracy}")

# Guardar los modelos entrenados
joblib.dump(modelo_regresion, 'modelo_regresion.pkl')
joblib.dump(modelo_clasificacion, 'modelo_clasificacion.pkl')

print("✅ Modelos entrenados y guardados como 'modelo_regresion.pkl' y 'modelo_clasificacion.pkl'")
