package database

import "database/sql"

type Models struct {
	Users   UserModel
	History HistoryModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Users:   UserModel{DB: db},
		History: HistoryModel{DB: db},
	}
}
