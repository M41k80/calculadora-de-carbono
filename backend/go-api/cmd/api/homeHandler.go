package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) home(c *gin.Context) {
	c.String(http.StatusOK, "Hello, World!")
}