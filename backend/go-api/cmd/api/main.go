package main

import (
	"calculadora-service/cmd/migrate"
	"calculadora-service/internal/database"
	"database/sql"
	"flag"
	"fmt"
	"log"
)

type application struct {
	addr      string
	jwtSecret string
	models    database.Models
}

func main() {

	dsn := flag.String("dsn", "root:admin@tcp(localhost:3306)/carbono", "MySQL Database DSN ")
	addr := flag.String("addr", "4000", "HTTP network address")
	jwt  := flag.String("jwt", "no-tan-secreto", "JWT secret")

	flag.Parse()

	// for migrations
	err := migrate.Migrate(*dsn)
	if err != nil {
		log.Fatalf("Error al ejecutar migraciones: %v", err)
	}
	fmt.Println("Migraciones ejecutadas correctamente.")

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
