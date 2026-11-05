# Project Context: Student CRUD Application

## 1. Project Overview
This repository contains a full-stack student management application. 
- **Backend**: Spring Boot 3 Java application (`student/`) with PostgreSQL persistence (`db_student`).
- **Frontend**: Vite + React (JavaScript) application located in `frontend/`.
- **Design Specifications**: Styled with **Tailwind CSS**, and **no modals** (using inline panels / side-by-side responsive split views for Create, Edit, View, and Delete confirmations).
- **Deployment**: Production deployment via **Render Blueprint** (`render.yaml`).

---

## 2. Backend API Specification

### Entity Model: `Student`
| Field | Type | Description |
|---|---|---|
| `id` | `Integer` | Auto-generated Primary Key |
| `firstname` | `String` | Student's first name |
| `lastname` | `String` | Student's last name |
| `course` | `String` | Degree / Program (e.g., BSCS, BSIT) |
| `section` | `String` | Academic Section (e.g., 3A, 3B) |

### Endpoints (`/reyes/students`)
Base URL: `/reyes/students` (Local: `http://localhost:8080/reyes/students` / Render: `https://student-backend.onrender.com/reyes/students`)

| Method | Endpoint | Description | Request Body | Response (Success) | Response (Error) |
|---|---|---|---|---|---|
| `GET` | `/reyes/students` | Get all students | None | `200 OK` JSON Array of students | `200 OK` `[]` |
| `GET` | `/reyes/students/:id` | Get student by ID | None | `200 OK` Student JSON | `404 Not Found` string |
| `POST` | `/reyes/students` | Create new student | `{ firstname, lastname, course, section }` | `201 Created` Student JSON | `500 Internal Error` |
| `PUT` | `/reyes/students/:id` | Update existing student | `{ firstname, lastname, course, section }` | `200 OK` Student JSON | `404 Not Found` string |
| `DELETE` | `/reyes/students/:id` | Delete student by ID | None | `200 OK` string message | `404 Not Found` string |

### API Connectivity & CORS
- Added `@CrossOrigin(origins = "*")` to `StudentController.java` for cloud cross-origin calls.
- In local development, Vite reverse proxy in `vite.config.js` routes `/reyes` requests to `http://localhost:8080`.
- In production on Render, `studentService.js` automatically detects `VITE_API_BASE_URL` provided by Render service discovery.

---

## 3. Frontend Architecture (Vite + React JavaScript + Tailwind CSS)

### Tech Stack
- **Build Tool**: Vite
- **UI Library**: React (JavaScript / JSX)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Layout Paradigm**: **Strictly Modal-free**:
  - Two-column / split dashboard layout for the Student Form (Add / Edit) and Student Details viewer.
  - Inline row confirmation for Delete actions (`Delete? [Yes] [No]`).

### Directory Structure
```
STUDENT-CRUD/
├── render.yaml                   # Render Blueprint Specification
├── student/                      # Spring Boot Backend
│   ├── Dockerfile                # Multi-stage JDK/JRE build
│   ├── .dockerignore
│   ├── src/main/java/com/reyes/student/
│   │   ├── Student.java
│   │   ├── StudentController.java# Configured with @CrossOrigin
│   │   ├── StudentRepository.java
│   │   └── StudentApplication.java
│   ├── src/main/resources/
│   │   └── application.properties# Render env vars + local fallbacks
│   └── pom.xml
├── frontend/                     # Vite + React + Tailwind Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with system title & student counters
│   │   │   ├── StudentForm.jsx     # Inline Form Card for adding or editing
│   │   │   ├── StudentList.jsx     # Table view with search, filter, and row actions
│   │   │   ├── StudentDetails.jsx  # Inline profile card when viewing student details
│   │   │   ├── Notification.jsx    # Status alerts / toasts
│   │   │   └── SearchFilter.jsx    # Live search and course/section filter
│   │   ├── services/
│   │   │   └── studentService.js   # Dynamic URL resolver (Render & local proxy)
│   │   ├── App.jsx                 # Main state coordinator & 2-column layout
│   │   ├── index.css               # Tailwind CSS directives
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Proxy to http://localhost:8080
├── CONTEXT.md
└── README.md
```

---

## 4. Render.com Deployment Configuration (`render.yaml`)
1. **Backend Service (`student-backend`)**:
   - Environment: Docker
   - Context: `./student`, Dockerfile: `./student/Dockerfile`
   - Injected database credentials from `student-db` (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DB_SSL_MODE=require`)
   - Configured port `8080`
2. **Frontend Service (`student-frontend`)**:
   - Environment: Static site
   - Build command: `cd frontend && npm install && npm run build`
   - Static publish path: `frontend/dist`
   - Rewrites: `/*` -> `/index.html` (SPA routing)
   - Environment variable `VITE_API_BASE_URL` mapped to `student-backend` host
3. **Database (`student-db`)**:
   - Managed PostgreSQL instance with database name `db_student`
