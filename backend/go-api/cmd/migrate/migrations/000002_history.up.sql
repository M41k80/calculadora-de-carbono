CREATE TABLE historial_emisiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mes VARCHAR(20),
    anio YEAR,
    electricidad_uso FLOAT,
    auto_uso FLOAT,
    avion_uso INT,
    residuos_uso FLOAT,
    agua_uso FLOAT,
    emisiones FLOAT,
    clasificacion VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES people(id) ON DELETE CASCADE
);
