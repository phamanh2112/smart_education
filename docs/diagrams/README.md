# Diagrams — Education Online & Smart

## 1. Sequence Diagram (User Enrolls & Completes a Lesson)

```mermaid
sequenceDiagram
    participant Student
    participant Browser
    participant API as Backend API
    participant DB as Database
    participant AI as AI Service

    Student->>Browser: Browse courses
    Browser->>API: GET /api/courses
    API->>DB: Query courses
    DB-->>API: Return course list
    API-->>Browser: Render course catalog
    Browser-->>Student: Display courses

    Student->>Browser: Click "Enroll"
    Browser->>API: POST /api/enrollments { course_id }
    API->>DB: Insert enrollment
    DB-->>API: Enrollment created
    API-->>Browser: Confirm enrollment
    Browser-->>Student: Show "Enrolled" status

    Student->>Browser: Open lesson
    Browser->>API: GET /api/lessons/:id
    API->>DB: Fetch lesson content
    DB-->>API: Lesson data
    API-->>Browser: Serve lesson page
    Browser-->>Student: Display video/material

    Student->>Browser: Complete quiz
    Browser->>API: POST /api/quiz/submit { answers }
    API->>AI: Auto-grade answers
    AI-->>API: Score + feedback
    API->>DB: Update progress + grade
    API-->>Browser: Show results
    Browser-->>Student: Display score & feedback
```

---

## 2. Data Diagram (Entity Relationship Diagram)

```mermaid
erDiagram
    User ||--o{ Course : "teaches"
    User ||--o{ Enrollment : "enrolls"
    User ||--o{ Submission : "submits"
    User ||--o{ Discussion : "posts"
    Course ||--o{ Lesson : "contains"
    Course ||--o{ Assignment : "has"
    Course ||--o{ Enrollment : "has"
    Course ||--o{ LiveSession : "schedules"
    Lesson ||--o{ Quiz : "includes"
    Quiz ||--o{ Question : "contains"
    Assignment ||--o{ Submission : "receives"

    User {
        int id PK
        string name
        string email UK
        string password_hash
        enum role "teacher | student"
        datetime created_at
    }

    Course {
        int id PK
        int teacher_id FK
        string title
        text description
        string thumbnail
        float price
        datetime created_at
    }

    Lesson {
        int id PK
        int course_id FK
        string title
        enum content_type "video | pdf | text"
        string content_url
        int order
        int duration_minutes
    }

    Assignment {
        int id PK
        int course_id FK
        string title
        text description
        date due_date
        int max_score
    }

    Submission {
        int id PK
        int assignment_id FK
        int student_id FK
        string file_url
        float score
        text feedback
        datetime submitted_at
    }

    Quiz {
        int id PK
        int lesson_id FK
        string title
    }

    Question {
        int id PK
        int quiz_id FK
        text content
        enum type "mcq | true_false | short_answer"
        json options
        string correct_answer
    }

    Enrollment {
        int id PK
        int user_id FK
        int course_id FK
        float progress_pct
        datetime enrolled_at
    }

    LiveSession {
        int id PK
        int course_id FK
        string title
        datetime start_time
        datetime end_time
        string recording_url
    }

    Discussion {
        int id PK
        int course_id FK
        int user_id FK
        text message
        datetime created_at
    }
```

---

## 3. Architecture Diagram

```mermaid
graph TB
    subgraph Client
        WEB[Web App<br/>React / Next.js]
        MOBILE[Mobile App<br/>React Native]
    end

    subgraph CDN
        CDN[Cloudflare / AWS CloudFront]
    end

    subgraph "API Gateway / Load Balancer"
        LB[Nginx / AWS ALB]
    end

    subgraph "Backend Services"
        API[API Server<br/>Node.js / Express]
        WS[WebSocket Server<br/>Socket.io]
        AUTH[Auth Service<br/>JWT + OAuth]
        NOTIF[Notification Service]
    end

    subgraph "AI / ML Microservices"
        AI_TUTOR[AI Tutor<br/>LLM / GPT]
        GRADING[Auto Grader<br/>NLP + ML]
        ANALYTICS[Analytics Engine<br/>Python / TensorFlow]
        PLAG[Plagiarism Check]
    end

    subgraph "Data Layer"
        PSQL[(PostgreSQL<br/>Primary DB)]
        REDIS[(Redis<br/>Cache + Session)]
        S3[(S3 / Cloudinary<br/>Media Storage)]
        ES[(Elasticsearch<br/>Search)]
    end

    subgraph "External Services"
        OAUTH[Google / GitHub OAuth]
        EMAIL[SMTP / SendGrid]
        VIDEO[Zoom / Jitsi API]
    end

    WEB --> CDN
    MOBILE --> CDN
    CDN --> LB
    LB --> API
    LB --> WS
    API --> AUTH
    API --> NOTIF
    API --> AI_TUTOR
    API --> GRADING
    API --> ANALYTICS
    API --> PLAG
    API --> PSQL
    API --> REDIS
    API --> S3
    API --> ES
    API --> OAUTH
    API --> EMAIL
    API --> VIDEO
    WS --> REDIS
    NOTIF --> EMAIL
```

---

## 4. Context Diagram

```mermaid
graph TD
    SYSTEM[Education Online & Smart]

    TEACHER[Teacher]
    STUDENT[Student]
    ADMIN[Admin]

    OAUTH[OAuth Providers<br/>Google, GitHub]
    EMAIL[Email Service<br/>SendGrid]
    PAYMENT[Payment Gateway<br/>Stripe]
    STORAGE[Cloud Storage<br/>AWS S3]
    VIDEO[Video Conferencing<br/>Jitsi / Zoom]
    AI[AI Services<br/>OpenAI / Custom]

    TEACHER -->|Create courses, grade, host live| SYSTEM
    STUDENT -->|Enroll, learn, submit, ask AI| SYSTEM
    ADMIN -->|Manage users, content, reports| SYSTEM

    SYSTEM -->|Authenticate| OAUTH
    SYSTEM -->|Send notifications| EMAIL
    SYSTEM -->|Process payments| PAYMENT
    SYSTEM -->|Store media| STORAGE
    SYSTEM -->|Host live classes| VIDEO
    SYSTEM -->|AI tutor & grading| AI
```

---

## File Summary

| Diagram | File |
|---------|------|
| Sequence Diagram | `docs/diagrams/sequence.md` |
| ER Diagram | `docs/diagrams/data.md` |
| Architecture Diagram | `docs/diagrams/architecture.md` |
| Context Diagram | `docs/diagrams/context.md` |
