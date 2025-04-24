CREATE TABLE resumen_anual (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    anio YEAR,
    emisiones_totales FLOAT,
    promedio_electricidad FLOAT,
    promedio_auto FLOAT,
    promedio_avion FLOAT,
    promedio_residuos FLOAT,
    promedio_agua FLOAT,
    FOREIGN KEY (user_id) REFERENCES people(id) ON DELETE CASCADE
);
