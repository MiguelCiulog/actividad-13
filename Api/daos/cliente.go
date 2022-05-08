package clientes

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// TODO: Make migrations work
const (
	DBName    = "clientes_actividad131"
	Migration = "CREATE DATABASE IF NOT EXISTS `clientes_actividad13`;\n" +
		"CREATE TABLE if not exists `clientes_actividad13.clientes`\n" +
		"(`idclientes` INT NOT NULL AUTO_INCREMENT, " +
		"`nombre` VARCHAR(45) NOT NULL, " +
		"`email` VARCHAR(100) NULL, " +
		"`fecha_nacimiento` DATE NOT NULL, " +
		"PRIMARY KEY (`idclientes`));"
)

var db *sql.DB

type Cliente struct {
	IdClientes      int       `json:"idclientes"`
	Nombre          string    `json:"nombre"`
	Email           string    `json:"email"`
	FechaNacimiento time.Time `json:"fechaNacimiento"`
}

func HelloWorld() {
	fmt.Println("Hello world")
}

func InitializeConnectionDB() {
	var err error
	db, err = sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/clientes_actividad13?parseTime=true")

	if err != nil {
		panic(err)
	}
	// fmt.Println(Migration)
	// fmt.Println()
	// _, err = db.Exec(Migration)

	// if err != nil {
	// 	fmt.Print(err.Error())
	// }
}

func CloseDBConnection() {
	defer db.Close()
}

func GetAllCliente() ([]Cliente, error) {
	sql := "SELECT * FROM clientes"

	results, err := db.Query(sql)

	if err != nil {
		panic(err.Error())
	}

	var clientes []Cliente
	for results.Next() {
		var cliente Cliente
		err = results.Scan(&cliente.IdClientes, &cliente.Nombre, &cliente.Email, &cliente.FechaNacimiento)
		if err != nil {
			panic(err.Error())
		}

		clientes = append(clientes, cliente)
	}

	return clientes, nil
}

func GetClienteByEmail(email string) (Cliente, error) {
	sql := fmt.Sprintf(string(`SELECT * FROM clientes where email = "%s"`), email)

	results, err := db.Query(sql)

	if err != nil {
		panic(err.Error())
	}

	var cliente Cliente
	for results.Next() {
		err = results.Scan(&cliente.IdClientes, &cliente.Nombre, &cliente.Email, &cliente.FechaNacimiento)
		if err != nil {
			panic(err.Error())
		}

	}

	return cliente, nil
}

func AddCliente(cliente Cliente) error {
	const sql = `INSERT INTO clientes(nombre, email, fecha_nacimiento) VALUES(?, ?, ?)`
	_, err := db.Exec(sql, cliente.Nombre, cliente.Email, cliente.FechaNacimiento)
	return err
}

func DeleteClienteByEmail(email string) error {
	const sql = `DELETE FROM clientes WHERE email = (?);`
	_, err := db.Exec(sql, email)
	return err
}

func UpdateCliente(cliente Cliente, email string) error {
	sql := `UPDATE clientes SET
		nombre = (?),
		email = (?),
		fecha_nacimiento = (?)
		WHERE email = (?);`

	_, err := db.Exec(sql, cliente.Nombre, email, cliente.FechaNacimiento, cliente.Email)

	return err
}
