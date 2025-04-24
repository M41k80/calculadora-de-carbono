package main

import (
	"bytes"
	"fmt"
	"mime/multipart"

	//"calculadora-service/internal/database"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) UploadCSV(c *gin.Context) {
	// Obtener el archivo
	fileHeader, err := c.FormFile("csv")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CSV file is required"})
		return
	}

	// Abrir el archivo
	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open CSV file"})
		return
	}
	defer file.Close()

	// Crear un buffer para el cuerpo multipart
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	// Crear el campo "csv" en el formulario
	part, err := writer.CreateFormFile("csv", fileHeader.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create form file"})
		return
	}

	// Copiar el contenido del archivo al campo "csv"
	_, err = io.Copy(part, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to copy file content"})
		return
	}
	writer.Close()

	// Crear la petición POST
	url := "https://calculadora-carbono-7ero.onrender.com/predict/from-csv-mensual/"
	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	// Establecer el Content-Type correcto (con boundary)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// Enviar la petición
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()


    // Leer y procesar respuesta
    responseBody, err := io.ReadAll(resp.Body)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response"})
        return
    }

    // Obtener userID del token
    userID := c.GetUint("userID")

    // Almacenar en base de datos
    if err := app.models.Emission.Create(int(userID), responseBody); err != nil {
        
		fmt.Println(err , " - ", userID)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save data"})
        return
    }

    c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), responseBody)

}



func (app *application) GetHistory(c *gin.Context) {
	userID := c.GetUint("userID")
	list, err := app.models.Emission.GetByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

