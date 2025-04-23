package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func Migrate(dns string) error {

	db, err := sql.Open("mysql", dns)
	if err != nil {

		return err
	}
	defer db.Close()

	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		return err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://cmd/migrate/migrations",
		"carbono",
		driver)

	if err != nil {
		log.Fatalf("Error >: %v", err)
		return err
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Error <: %v", err)
		return err
	}

	return nil
}

func main() {
	
	dsn := flag.String("dsn", "root:admin@tcp(localhost:3306)/carbono", "MySQL Database DSN ")
	flag.Parse()
	
	err := Migrate(*dsn)
	if err != nil {
		log.Fatalf("Error al ejecutar migraciones: %v", err)
	}
	fmt.Println("Migraciones ejecutadas correctamente.")
}
