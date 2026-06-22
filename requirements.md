# Requirements — Education Online & Smart

## 1. Functional Requirements

### 1.1 Authentication & Authorization
| ID | Requirement |
|----|------------|
| FR-01 | Users shall register with email, password, and role (teacher/student) |
| FR-02 | Users shall log in using email/password or OAuth (Google, GitHub) |
| FR-03 | Passwords shall be hashed and stored securely |
| FR-04 | JWT tokens shall be used for session management |
| FR-05 | Role-based access control (RBAC) for teacher vs student routes |
| FR-06 | Users shall be able to reset forgotten passwords |

### 1.2 Teacher Features
| ID | Requirement |
|----|------------|
| FR-07 | Teachers shall create, edit, and delete courses |
| FR-08 | Teachers shall organize courses into lessons/modules |
| FR-09 | Teachers shall upload multimedia content (video, PDF, images) |
| FR-10 | Teachers shall create quizzes and assignments |
| FR-11 | Teachers shall grade submissions and provide feedback |
| FR-12 | Teachers shall view analytics on student performance |
| FR-13 | Teachers shall schedule and host live classes with video/chat |
| FR-14 | Teachers shall manage enrolled students (approve/remove) |

### 1.3 Student Features
| ID | Requirement |
|----|------------|
| FR-15 | Students shall browse and enroll in courses |
| FR-16 | Students shall access lesson materials and complete quizzes |
| FR-17 | Students shall submit assignments |
| FR-18 | Students shall view grades and feedback |
| FR-19 | Students shall track their learning progress |
| FR-20 | Students shall participate in live class sessions |
| FR-21 | Students shall ask questions via discussion forums |
| FR-22 | Students shall receive personalized course recommendations |

### 1.4 Smart / AI Features
| ID | Requirement |
|----|------------|
| FR-23 | AI Tutor shall answer student questions in real-time |
| FR-24 | System shall automatically grade MCQs and structured assignments |
| FR-25 | System shall generate learning analytics and knowledge gap reports |
| FR-26 | System shall detect plagiarism in submitted assignments |
| FR-27 | System shall recommend optimal study schedules |

---

## 2. Non-Functional Requirements

| ID | Requirement |
|----|------------|
| NFR-01 | Platform shall support at least 10,000 concurrent users |
| NFR-02 | Page load time shall be under 2 seconds |
| NFR-03 | System uptime shall be 99.9% (excluding planned maintenance) |
| NFR-04 | All data shall be encrypted in transit (TLS 1.2+) and at rest |
| NFR-05 | The system shall comply with data protection regulations |
| NFR-06 | API responses shall be returned within 500ms (95th percentile) |
| NFR-07 | The platform shall be responsive on desktop, tablet, and mobile |
| NFR-08 | Source code shall be modular and well-documented |
| NFR-09 | Automated tests shall cover at least 80% of critical paths |
| NFR-10 | All user inputs shall be validated and sanitized |

---

## 3. User Stories

### Teacher
> "As a teacher, I want to create a course with video lessons and quizzes so that I can deliver my curriculum online."

> "As a teacher, I want to see analytics on student performance so that I can identify who needs extra help."

> "As a teacher, I want to host live classes so that I can interact with students in real-time."

### Student
> "As a student, I want to browse courses and enroll easily so that I can start learning quickly."

> "As a student, I want to track my progress and see my grades so that I know how I'm doing."

> "As a student, I want an AI tutor to help me when I'm stuck on a topic."

---

## 4. Use Case Diagram

```
+----------------+          +-----------------+
|    Teacher     |          |    Student      |
+-------+--------+          +--------+--------+
        |                            |
        |  Create/Manage Courses     |  Enroll in Courses
        |  Host Live Classes         |  Access Lessons
        |  Grade Assignments         |  Submit Assignments
        |  View Analytics            |  Track Progress
        +-----------+                +--------+
                    |                |
                    v                v
             +------+----------------+------+
             |    Education Online & Smart   |
             |  (Web Platform)               |
             +---------+--------------------+
                       |
                       v
             +---------+---------+
             |  AI / Smart       |
             |  Services         |
             +-------------------+
```

---

## 5. Database Schema (Core Entities)

```
User (id, name, email, password_hash, role, created_at)
Course (id, teacher_id, title, description, thumbnail, price, created_at)
Lesson (id, course_id, title, content_type, content_url, order, duration)
Assignment (id, course_id, title, description, due_date, max_score)
Submission (id, assignment_id, student_id, file_url, score, feedback, submitted_at)
Quiz (id, lesson_id, title)
Question (id, quiz_id, content, type, options, correct_answer)
Enrollment (id, user_id, course_id, progress_pct, enrolled_at)
LiveSession (id, course_id, title, start_time, end_time, recording_url)
Discussion (id, course_id, user_id, message, created_at)
Grade (id, student_id, course_id, total_score, letter_grade)
```

---

## 6. API Endpoints (High-Level)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/courses | List courses |
| POST | /api/courses | Create course (teacher) |
| GET | /api/courses/:id | Get course details |
| PUT | /api/courses/:id | Update course (teacher) |
| DELETE | /api/courses/:id | Delete course (teacher) |
| GET | /api/courses/:id/lessons | List lessons |
| POST | /api/lessons | Create lesson (teacher) |
| GET | /api/enrollments | Get user enrollments |
| POST | /api/enrollments | Enroll in course |
| POST | /api/assignments | Create assignment (teacher) |
| POST | /api/submissions | Submit assignment (student) |
| GET | /api/analytics/:course_id | Get course analytics (teacher) |
| POST | /api/ai/ask | Ask AI Tutor |

---

## 7. Tech Stack Requirements

- **Frontend**: React / Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js + Express (or Django/Python)
- **Database**: PostgreSQL (primary), Redis (caching)
- **Real-time**: WebSocket / Socket.io for live classes
- **AI/ML**: Python microservice (FastAPI) for AI features
- **Storage**: AWS S3 / Cloudinary for media files
- **Auth**: JWT + OAuth 2.0
- **CI/CD**: GitHub Actions, Docker
- **Hosting**: AWS / Vercel / DigitalOcean

---

## 8. Constraints

- Must support Vietnamese and English languages
- Must handle low-bandwidth connections gracefully
- Video streaming must support adaptive bitrate
- All user data must be exportable (GDPR compliance)
- System must prevent XSS, CSRF, SQL injection attacks
