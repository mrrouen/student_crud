# Student Management System (Full-Stack CRUD)

A modern full-stack web application for student record management featuring a Spring Boot REST API and a Vite + React frontend styled with Tailwind CSS without modal popups.

---

## 🛠️ Tech Stack
- **Frontend**:
  - [Vite](https://vitejs.dev/) + [React](https://react.dev/) (JavaScript)
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Lucide React](https://lucide.dev/) (Icons)
  - Modal-free inline responsive architecture
- **Backend**:
  - [Spring Boot 3](https://spring.io/projects/spring-boot)
  - Spring Data JPA / Hibernate
  - PostgreSQL (`db_student`)
- **Deployment & Cloud**:
  - [Render.com](https://render.com/) Blueprint (`render.yaml`)
  - Multi-stage Docker container for Spring Boot backend

---

## 📁 Repository Structure
```
STUDENT-CRUD/
├── render.yaml                   # Render Blueprint (Backend + Frontend + PostgreSQL)
├── student/                      # Spring Boot 3 Backend
│   ├── Dockerfile                # Multi-stage Docker build for Render
│   ├── .dockerignore
│   ├── src/main/java/com/reyes/student/
│   │   ├── Student.java          # Entity model
│   │   ├── StudentRepository.java# Spring Data JPA Repository
│   │   ├── StudentController.java# REST Controller (/reyes/students) with @CrossOrigin
│   │   └── StudentApplication.java
│   ├── src/main/resources/
│   │   └── application.properties# Configured for Render env vars + local fallbacks
│   └── pom.xml
├── frontend/                     # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar & counters
│   │   │   ├── SearchFilter.jsx  # Live search & course filter
│   │   │   ├── StudentTable.jsx  # Table view & inline delete confirmation
│   │   │   ├── StudentForm.jsx   # Inline Add/Edit form card
│   │   │   ├── StudentView.jsx   # Inline profile detail card
│   │   │   └── AlertBanner.jsx   # Toast notifications
│   │   ├── services/
│   │   │   └── studentService.js # Centralized fetch API client (auto-resolves Render URL)
│   │   ├── App.jsx               # Application coordinator
│   │   └── index.css             # Tailwind v4 configuration
│   ├── vite.config.js            # Reverse proxy configuration (/reyes -> :8080)
│   └── package.json
├── CONTEXT.md                    # System architecture and endpoints
└── README.md
```

---

## ☁️ Deployment on Render.com

This repository is ready to deploy on **Render** with a single blueprint:

1. **Push your code to GitHub** (repository e.g. `STUDENT-CRUD`).
2. Log into **[dashboard.render.com](https://dashboard.render.com/)**.
3. Click **New +** &rarr; **Blueprint**.
4. Select your GitHub repository.
5. Render will automatically detect [`render.yaml`](file:///C:/Users/Student-00/Desktop/REYES/DA3A/FULLSTACK/STUDENT-CRUD/render.yaml) and create:
   - 🐘 **PostgreSQL Database** (`student-db`) with `db_student`
   - ☕ **Web Service** (`student-backend`) built via [`student/Dockerfile`](file:///C:/Users/Student-00/Desktop/REYES/DA3A/FULLSTACK/STUDENT-CRUD/student/Dockerfile)
   - 🌐 **Static Site** (`student-frontend`) built with `npm run build` and linked to the backend URL via `VITE_API_BASE_URL`
6. Click **Apply**. Render will automatically provision and connect all 3 services!

---

## 🚀 Running Locally

### 1. Start the PostgreSQL Database
Ensure your PostgreSQL server is active on port `5432` with database `db_student` (credentials configured in `student/src/main/resources/application.properties`).

### 2. Start the Spring Boot Backend
In a terminal:
```bash
cd student
./mvnw spring-boot:run
```
*(On Windows Command Prompt or PowerShell, use `.\mvnw.cmd spring-boot:run`)*
The API will start at: `http://localhost:8080/reyes/students`

### 3. Start the Vite React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`. Vite will automatically proxy API requests from `/reyes` to `http://localhost:8080`.

---

## 🔌 API Endpoints
- `GET /reyes/students`: Retrieve list of all enrolled students
- `GET /reyes/students/{id}`: Retrieve a single student by ID
- `POST /reyes/students`: Enroll a new student
- `PUT /reyes/students/{id}`: Update an existing student
- `DELETE /reyes/students/{id}`: Delete student by ID
