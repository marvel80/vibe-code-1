# Spring Boot Demo Application

This is a Spring Boot web application that demonstrates a complete REST API with JPA integration.

## Project Structure

```
src/main/java/com/example/demo/
├── DemoApplication.java
├── controller/
│   └── ItemController.java
├── model/
│   └── Item.java
├── repository/
│   └── ItemRepository.java
└── service/
    └── ItemService.java
```

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Technologies Used

- Spring Boot 3.2.3
- Spring Data JPA
- H2 Database
- Lombok
- Spring Boot DevTools

## How to Run

1. Clone this repository
2. Navigate to the project directory
3. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

## Available Endpoints

### Items API

- `GET /api/items`: Get all items
- `GET /api/items/{id}`: Get item by ID
- `POST /api/items`: Create a new item
- `PUT /api/items/{id}`: Update an existing item
- `DELETE /api/items/{id}`: Delete an item
- `GET /api/items/search?name={name}`: Search items by name

### Database Console

- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:demodb`
  - Username: `sa`
  - Password: `password`

## Sample API Usage

### Create an Item
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample Item","description":"A sample item description"}'
```

### Get All Items
```bash
curl http://localhost:8080/api/items
```

### Search Items
```bash
curl http://localhost:8080/api/items/search?name=sample
``` 