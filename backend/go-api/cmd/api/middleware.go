package main

import (
	//"net/http"
	//"strings"

	"github.com/gin-gonic/gin"
	//"github.com/golang-jwt/jwt"
)

func (app *application) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
	

		c.Next()
	}
}