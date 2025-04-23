
CREATE TABLE emissions_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    month INT NOT NULL,                 -- 1 = Enero, 5 = Mayo, etc.
    year INT NOT NULL,
    electricity_usage DECIMAL(10, 2),   -- en kWh
    car_usage DECIMAL(10, 2),           -- en km
    flight_usage INT,                   -- número de vuelos
    waste_usage DECIMAL(10, 2),         -- en kg
    water_usage DECIMAL(10, 2),         -- en m³
    total_emissions DECIMAL(10, 2),     -- en kg CO₂
    rating VARCHAR(20),                 -- Ej: "Alta", "Media", "Baja"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (person_id) REFERENCES people(id)
        ON DELETE CASCADE
);
