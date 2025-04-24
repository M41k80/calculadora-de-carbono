package main

import (
	"database/sql"
	"flag"
	"log"

	"calculadora-service/internal/database"
	_ "github.com/go-sql-driver/mysql"
)

type application struct {
	addr      string
	jwtSecret string
	models    database.Models
}

func main() {

	dsn := flag.String("dsn", "root:admin@tcp(localhost:3306)/carbono", "MySQL Database DSN ")
	addr := flag.String("addr", "4000", "HTTP network address")
	jwt := flag.String("jwt", "no-tan-secreto", "JWT secret")

	flag.Parse()

	// Start database
	db, err := openDB(*dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	models := database.NewModels(db)



	app := &application{
		addr:      *addr,
		jwtSecret: *jwt,
		models:    models,
	}

	if err := app.serve(); err != nil {
		log.Fatal(err)
	}

}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
