package database

import (
	"context"
	"database/sql"
	"time"
)

type UserModel struct {
	DB *sql.DB
}

type User struct {
	Id          int    `json:"id"`
	Email       string `json:"email"`
	Name        string `json:"name"`
	Password    string `json:"-"`
	CompanyName string `json:"companyname"`
}

func (m *UserModel) Insert(user *User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "INSERT INTO people (email, password_hash, full_name, company_name) VALUES (?, ?, ?, ?)"

	result, err := m.DB.ExecContext(ctx, query, user.Email, user.Password, user.Name, user.CompanyName)
	if err != nil {
		return err
	}

	insertedID, err := result.LastInsertId()
	if err != nil {
		return err
	}

	user.Id = int(insertedID)
	return nil
}

func (m *UserModel) getUser(query string, args ...interface{}) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user User
	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&user.Id, &user.Email, &user.Name, &user.Password, &user.CompanyName)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil 
		}
		return nil, err 
	}

	return &user, nil
}

func (m *UserModel) Get(id int) (*User, error) {
	query := "SELECT id, email, full_name, password_hash, company_name FROM people WHERE id = ?"
	return m.getUser(query, id)
}

func (m *UserModel) GetByEmail(email string) (*User, error) {
	query := "SELECT id, email, full_name, password_hash, company_name FROM people WHERE email = ?"
	return m.getUser(query, email)
}
