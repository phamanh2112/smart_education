# Architecture Diagram

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
