

# 🌱 Calculadora de carbono


### ✅ Requisitos

- Go 1.20 o superior
- MySQL corriendo en tu máquina o en un servidor
- Git

---

### 🛠 Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd calculadora-de-carbono/backend/go-api

```
### 📦 Instala dependencias
```bash
go mod tidy
```

### 📦 Compilar 
```bash
go build ./cmd/api
```

### For run 

```go
./api dsn="root:admin@tcp(localhost:3306)/db-name"

```

### For deploy  

```go
go run main.go -dsn="root:admin@tcp(localhost:3306)/carbono?charset=utf8mb4&parseTime=True" -addr="4000" -jwt="mi-super-secreto"
```



### This repo use go migrate

Example for a new migration.

```
migrate create -ext sql -dir cmd/migrate/migrations -seq migration_name
```


