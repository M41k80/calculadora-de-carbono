package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (app *application) routes() http.Handler {
	g := gin.Default()

	g.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Authorization"},
	}))

	// public routes
	v1 := g.Group("/api/v1")
	{
		v1.GET("/", app.home)
		v1.POST("/auth/register", app.registerUser)
		v1.POST("/auth/login", app.loginUser)

	}

	// Grupo de rutas protegidas
	authGroup := v1.Group("/")
	authGroup.Use(app.AuthMiddleware())
	{
		authGroup.PUT("/user/edit", app.EditUser)
		authGroup.POST("/carbon/upload", app.UploadCSV)
		authGroup.GET("/carbon/history", app.GetHistory)
	}

	return g
}
