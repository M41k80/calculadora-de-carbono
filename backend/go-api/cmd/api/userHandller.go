package main

import (
	"calculadora-service/internal/database"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type editUser struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	Name        string `json:"name"`
	CompanyName string `json:"companyname"`
}

func (app *application) EditUser(c *gin.Context) {
	
	var updatedUser editUser 
	userId := c.GetUint("userID")
	

	if userId == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updatedUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": "Something went wrong"})
		return
	}
	updatedUser.Password = string(hashedPassword)

	user := database.User{
		Id: int(userId),
		Email:       updatedUser.Email,
		Name:        updatedUser.Name,
		Password:    updatedUser.Password,
		CompanyName: updatedUser.CompanyName,
	}

	err = app.models.Users.Update(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update the  user"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusCreated, user)

}
