package main

import (
	"calculadora-service/internal/database"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type registerRequest struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	Name        string `json:"name"`
	CompanyName string `json:"companyname"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token string `json:"token"`
}

func (app *application) registerUser(c *gin.Context) {

	var register registerRequest

	if err := c.ShouldBindJSON(&register); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(register.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": "Something went wrong"})
		return
	}
	register.Password = string(hashedPassword)
	user := database.User{
		Email:       register.Email,
		Name:        register.Name,
		Password:    register.Password,
		CompanyName: register.CompanyName,
	}

	err = app.models.Users.Insert(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

func (app *application) loginUser(c *gin.Context) {

	var auth loginRequest
	if err := c.ShouldBindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existingUser, err := app.models.Users.GetByEmail(auth.Email)

	if existingUser == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(auth.Password))
	
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Crear un nuevo token JWT con el ID del usuario y una expiración de 72 horas
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": existingUser.Id,
		"expr":   time.Now().Add(time.Hour * 72).Unix(),
	})
	
	tokenString, err := token.SignedString([]byte(app.jwtSecret))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		return
	}

	c.JSON(http.StatusOK, loginResponse{Token: tokenString})
}
