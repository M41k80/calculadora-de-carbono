

# 🌱 Calculadora de carbono


### ✅ Requisitos

- Go 1.20 o superior
- MySQL corriendo en tu máquina o en un servidor
- Git

---

### 🛠 Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
```
```bash
cd calculadora-de-carbono/backend/go-api
```

### 📦 Instala dependencias
```bash
go mod tidy
```

### 📦 Iniciar las migraciones  
```bash
 go run ./cmd/migrate/migration.go 
```

### 📦 Compilar 
```bash
go build -o carbono-service ./cmd/api/
```

### For run 

```go
./carbono-service -dsn="root:admin@tcp(localhost:3306)/db-name"

```

## For deploy  

### 📦 Iniciar las migraciones  
```bash
 go run ./cmd/migrate/migration.go -dsn="root:admin@tcp(localhost:3306)/db-name"
```

```go
./carbono-service -dsn="root:admin@tcp(localhost:3306)/carbono?charset=utf8mb4&parseTime=True" -addr="4000" -jwt="mi-super-secreto"
```



### This repo use go migrate

Example for a new migration.

```
migrate create -ext sql -dir cmd/migrate/migrations -seq migration_name
```


