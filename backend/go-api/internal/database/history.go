package database

import "database/sql"

type HistoryModel struct {
	DB *sql.DB
}

type Prediction struct {
    Month          int     `json:"month"`
    Year           int     `json:"year"`
    ElectricityUse float64 `json:"electricity_use"`
    CarUse         float64 `json:"car_use"`
    FlightUse      int     `json:"flight_use"`
    WasteUse       float64 `json:"waste_use"`
    WaterUse       float64 `json:"water_use"`
    Emissions      float64 `json:"emissions"`
    Rating         string  `json:"rating"`
}

type Payload struct {
    PersonID     int          `json:"person_id"`
    Predictions  []Prediction `json:"predictions"`
}


func (m *HistoryModel) Insert() error {
	return nil
}

func (m *HistoryModel) GetHystory() error {
	return nil
}
