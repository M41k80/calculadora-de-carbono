package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

)

func (app *application) routes() http.Handler {
	g := gin.Default()

	// public routes 
	v1 := g.Group("/api/v1")
	{
		v1.GET("/hello", app.home)
		v1.POST("/auth/register", app.registerUser)
		v1.POST("/auth/login", app.loginUser)

	}

	// protected 
 	authGroup := v1.Group("/")
	authGroup.Use(app.AuthMiddleware())
	{
		authGroup.POST("/create", app.create)
	}


	return g
}