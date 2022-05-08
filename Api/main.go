package main

import (
	"fmt"
	"net/http"
	"time"

	cliente "github.com/MiguelCiulog/actividad-13/daos"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	r := setupRouter()

	cliente.InitializeConnectionDB()
	r.Run(":8080")
	cliente.CloseDBConnection()
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "DELETE", "POST"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))

	// Get user by email
	r.GET("/clientes/:email", func(c *gin.Context) {
		email := c.Params.ByName("email")
		fmt.Println(email)
		clientes, err := cliente.GetClienteByEmail(email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error": err})
		}

		c.JSON(http.StatusOK, clientes)

	})

	// Get all
	r.GET("/clientes", func(c *gin.Context) {
		// user := c.Params.ByName("name")
		clientes, err := cliente.GetAllCliente()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error": err})
		}

		c.JSON(http.StatusOK, clientes)

	})

	// add
	r.POST("/clientes", func(c *gin.Context) {
		email := c.Params.ByName("email")
		var clienteRequest cliente.Cliente
		clienteRequest.Email = email

		c.ShouldBind(&clienteRequest)

		err := cliente.AddCliente(clienteRequest)
		// clientes, err := cliente.GetAllCliente()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error": err})
		}

		c.JSON(http.StatusOK, `Client was added succesfully.`)
	})

	// update
	r.PUT("/clientes/:email", func(c *gin.Context) {
		email := c.Params.ByName("email")

		var clienteRequest cliente.Cliente
		c.ShouldBind(&clienteRequest)

		err := cliente.UpdateCliente(clienteRequest, email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error": err})
		}

		c.JSON(http.StatusOK, `Client was updated succesfully.`)
	})

	// delete
	r.DELETE("/clientes/:email", func(c *gin.Context) {
		email := c.Params.ByName("email")

		err := cliente.DeleteClienteByEmail(email)
		// clientes, err := cliente.GetAllCliente()
		if err != nil {
			c.JSON(http.StatusMethodNotAllowed, gin.H{"Error": err})
		}

		c.JSON(http.StatusAccepted, `Client was deleted succesfully.`)
	})

	return r
}

// func _() {
// 	cliente.InitializeConnectionDB()
// 	// fmt.Println(cliente.GetAllCliente())
// 	// fmt.Println(cliente.GetClienteByEmail("Email1"))
// 	var cl cliente.Cliente
// 	cl.Nombre = "Nombre2"
// 	cl.Email = "Email2"
// 	cl.FechaNacimiento = time.Now()
// 	fmt.Println(cliente.AddCliente(cl))
// 	fmt.Println(cliente.DeleteClienteByEmail("Email2"))

// 	cl.Nombre = "Nombre1"
// 	cl.Email = "Email1"
// 	fmt.Println(cliente.AddCliente(cl))

// 	cl.Nombre = "nom"
// 	fmt.Println(cliente.UpdateCliente(cl))

// 	cliente.CloseDBConnection()
// }
