package database

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"time"
)

type EmissionModel struct {
	DB *sql.DB
}

// Estructuras para el JSON
type DetalleMensual struct {
	Mes             string  `json:"mes"`
	Anio            string  `json:"anio"`
	ElectricidadUso float64 `json:"electricidad_uso"`
	AutoUso         float64 `json:"auto_uso"`
	AvionUso        int     `json:"avion_uso"`
	ResiduosUso     float64 `json:"residuos_uso"`
	AguaUso         float64 `json:"agua_uso"`
	Emisiones       float64 `json:"emisiones"`
	Clasificacion   string  `json:"clasificacion"`
}

type ResumenAnual struct {
	Anio               string  `json:"anio"`
	EmisionesTotales   float64 `json:"emisiones_totales"`
	PromediosMensuales struct {
		Electricidad float64 `json:"electricidad"`
		Auto         float64 `json:"auto"`
		Avion        float64 `json:"avion"`
		Residuos     float64 `json:"residuos"`
		Agua         float64 `json:"agua"`
	} `json:"promedios_mensuales"`
}

type History struct {
	Detalle []DetalleMensual `json:"detalle_mensual"`
	Resumen []ResumenAnual   `json:"resumen_anual"`
}

func (m *EmissionModel) Create(userID int, responseJSON []byte) error {
	// Parsear el JSON
	var response struct {
		Detalle []DetalleMensual `json:"detalle_mensual"`
		Resumen []ResumenAnual   `json:"resumen_anual"`
	}

	if err := json.Unmarshal(responseJSON, &response); err != nil {
		return fmt.Errorf("error parsing JSON: %v", err)
	}

	// Iniciar transacción
	tx, err := m.DB.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %v", err)
	}

	// Insertar detalle mensual
	for _, detalle := range response.Detalle {
		query := `INSERT INTO historial_emisiones (
            user_id, mes, anio, electricidad_uso, auto_uso, 
            avion_uso, residuos_uso, agua_uso, emisiones, clasificacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

		_, err := tx.Exec(query,
			userID,
			detalle.Mes,
			detalle.Anio,
			detalle.ElectricidadUso,
			detalle.AutoUso,
			detalle.AvionUso,
			detalle.ResiduosUso,
			detalle.AguaUso,
			detalle.Emisiones,
			detalle.Clasificacion,
		)

		if err != nil {
			tx.Rollback()
			return fmt.Errorf("error inserting historial: %v", err)
		}
	}

	// Insertar resumen anual
	for _, resumen := range response.Resumen {
		query := `INSERT INTO resumen_anual (
            user_id, anio, emisiones_totales, 
            promedio_electricidad, promedio_auto, 
            promedio_avion, promedio_residuos, promedio_agua
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

		_, err := tx.Exec(query,
			userID,
			resumen.Anio,
			resumen.EmisionesTotales,
			resumen.PromediosMensuales.Electricidad,
			resumen.PromediosMensuales.Auto,
			resumen.PromediosMensuales.Avion,
			resumen.PromediosMensuales.Residuos,
			resumen.PromediosMensuales.Agua,
		)

		if err != nil {
			tx.Rollback()
			return fmt.Errorf("error inserting resumen: %v", err)
		}
	}

	// Commitear la transacción
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("error committing transaction: %v", err)
	}

	return nil
}

func (m *EmissionModel) GetByUserID(userID uint) (*History, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	h := &History{}

	// 1) Traer detalle mensual
	q1 := `
      SELECT 
        mes, anio, electricidad_uso, auto_uso,
        avion_uso, residuos_uso, agua_uso, emisiones, clasificacion
      FROM historial_emisiones
      WHERE user_id = ?
      ORDER BY anio DESC, mes DESC
    `
	rows, err := m.DB.QueryContext(ctx, q1, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var d DetalleMensual
		if err := rows.Scan(
			&d.Mes,
			&d.Anio,
			&d.ElectricidadUso,
			&d.AutoUso,
			&d.AvionUso,
			&d.ResiduosUso,
			&d.AguaUso,
			&d.Emisiones,
			&d.Clasificacion,
		); err != nil {
			return nil, err
		}
		h.Detalle = append(h.Detalle, d)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	// 2) Traer resumen anual
	q2 := `
      SELECT 
        anio, emisiones_totales,
        promedio_electricidad, promedio_auto,
        promedio_avion, promedio_residuos, promedio_agua
      FROM resumen_anual
      WHERE user_id = ?
      ORDER BY anio DESC
    `
	rows2, err := m.DB.QueryContext(ctx, q2, userID)
	if err != nil {
		return nil, err
	}
	defer rows2.Close()

	for rows2.Next() {
		var r ResumenAnual
		if err := rows2.Scan(
			&r.Anio,
			&r.EmisionesTotales,
			&r.PromediosMensuales.Electricidad,
			&r.PromediosMensuales.Auto,
			&r.PromediosMensuales.Avion,
			&r.PromediosMensuales.Residuos,
			&r.PromediosMensuales.Agua,
		); err != nil {
			return nil, err
		}
		h.Resumen = append(h.Resumen, r)
	}
	if err := rows2.Err(); err != nil {
		return nil, err
	}

	return h, nil
}
