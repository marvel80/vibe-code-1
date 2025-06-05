# Vibe Code Project

A naive full-stack web application built with Spring Boot backend and React frontend, purely utilizing vibe coding. Objective is to ring in some background music & vibe code. 

## Project Structure

```
vibe-code-1/
├── backend-api/     # Spring Boot backend
└── frontend/        # React frontend
```

## Backend (Spring Boot)

### Tech Stack
- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- H2 Database
- Maven
- Lombok

### Features
- RESTful API endpoints
- JPA Entity management
- H2 in-memory database
- Development tools enabled

### Running the Backend
```bash
cd backend-api
mvn spring-boot:run
```
The backend server will start on http://localhost:8080

### API Endpoints
- H2 Console: http://localhost:8080/h2-console
  - Database URL: jdbc:h2:mem:demodb
  - Username: sa
  - Password: password

## Frontend (React)

### Tech Stack
- React 18
- TypeScript
- Material-UI (MUI)
- Axios for API calls

### Features
- Modern React with TypeScript
- Material-UI components
- Development server with hot reload

### Running the Frontend
```bash
cd frontend
npm install
npm start
```
The frontend development server will start on http://localhost:3000

## Development Setup

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- npm 9 or higher
- Maven 3.6 or higher

### First Time Setup
1. Clone the repository
```bash
git clone [repository-url]
cd vibe-code-1
```

2. Setup Backend
```bash
cd backend-api
mvn clean install
```

3. Setup Frontend
```bash
cd frontend
npm install
```

### Running the Application
1. Start the backend server:
```bash
cd backend-api
mvn spring-boot:run
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

## Building for Production

### Backend
```bash
cd backend-api
mvn clean package
```
This will create a runnable JAR file in the `target` directory.

### Frontend
```bash
cd frontend
npm run build
```
This will create an optimized production build in the `build` directory.

## Project Structure Details

### Backend Structure
```
backend-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── target/
└── pom.xml
```

### Frontend Structure
```
frontend/
├── public/
├── src/
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 
