package database

import "database/sql"

type Models struct {
	Users   UserModel
	Emission EmissionModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users:   UserModel{DB: db},
		Emission: EmissionModel{DB: db},
	}
}
