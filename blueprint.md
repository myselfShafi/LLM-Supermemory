# AI System Design Collaboration App — Blueprint

> A realtime collaborative whiteboard for system-design interviews with AI-driven evaluation, cost estimation, and session replay. Built to be modular and highly scalable so you can add features (billing, teams, marketplaces) later.

---

## 1. Project overview

**Goal:** Build a web app where multiple participants can co-author system design diagrams and notes in realtime, get AI feedback on architecture quality (scalability, availability, cost), record sessions, and export artifacts (PDF, PNG). The app demonstrates deep engineering: realtime sync, CRDT/OT for collaborative editing, AI prompt pipelines, vector memory for saved sessions, analytics, and multi-tenant SaaS readiness.

**Primary users:** Interviewer + candidate, engineering teams, mentors.

**MVP constraints:** Start with a focused feature set (Realtime whiteboard + AI evaluation + session save/export). Defer billing, advanced permissions, and enterprise SSO to later phases.

---

## 2. MVP Features (must-have)

1. Authentication (Email + OAuth: GitHub/Google)
2. Create / join a room (room id / invite link)
3. Realtime collaborative whiteboard

   * Shapes (boxes, arrows), text boxes, sticky notes
   * Drag/resize, layering
   * CRDT-based sync (Yjs or Automerge) or OT
4. Voice channel (optional MVP) — start with text chat + presence
5. AI evaluation panel

   * One-click `Evaluate` runs AI over diagram + prompts and returns:

     * Scalability assessment
     * Single points of failure
     * Suggestions (caching, partitioning, replication)
     * Rough cost estimate (monthly) for AWS-like footprint
6. Save session (diagram + transcript + evaluation) and export (PNG / PDF)
7. Session replay (playback edits over time)
8. Basic analytics: number of sessions, avg evaluation score

---

## 3. High-level system architecture

**Components**

* Frontend (React + TypeScript)
* Realtime sync layer (Yjs + WebSocket provider / WebRTC)
* Backend API (Node.js + Express / NestJS or Spring Boot later)
* Persistence: PostgreSQL (users, rooms, metadata) + Object store (S3) + Vector DB (Qdrant/Pinecone) for embeddings
* AI Service: OpenAI / Anthropic / self-hosted LLMs via adapters
* Worker layer: Celery / BullMQ (Node) for async tasks (AI evaluation, PDF export)
* Auth: Auth0 / Clerk / NextAuth
* CDN & File hosting: S3 + CloudFront

**Data flow (MVP)**

1. User opens room; client connects to realtime server via secure WebSocket and joins Yjs doc.
2. Edits propagate peer-to-peer or via a centralized WebSocket provider. Backend persists snapshots periodically.
3. When user triggers AI evaluation, frontend sends canonical diagram + notes to backend `POST /evaluate`.
4. Backend queues task -> worker runs embedding & LLM prompts -> stores evaluation and returns result.
5. Session save triggers snapshot write to DB + upload canvas PNG to object store.

---

## 4. Tech stack (recommended)

* Frontend: React + TypeScript, Vite, Tailwind CSS, Framer Motion
* Realtime & Collab: Yjs (CRDT) + y-websocket / y-webrtc; Monaco Editor optional for text sketching
* Drawing UI: React-Flow / Excalidraw (or custom canvas using Konva.js)
* Backend: Node.js + NestJS (for modularity) or Express with TypeScript
* DB: PostgreSQL (primary relational); Redis (presence, pub/sub); S3-compatible object store
* Async Workers: BullMQ (Redis-backed) or RabbitMQ with worker nodes
* AI: OpenAI API + optional LLM hosting adapter + vector DB (Qdrant/Pinecone) for saved sessions embeddings
* Auth: Clerk or NextAuth; JWT strategy for services
* Deployment: Docker + Kubernetes or Cloud Run; use Terraform for infra as code
* Observability: Prometheus + Grafana; Sentry for errors

---

## 5. Database schemas (simplified)

### `users` (Postgres)

* id (uuid)
* email
* name
* provider (github/google/local)
* created_at, updated_at

### `rooms`

* id (uuid)
* owner_id (fk users)
* title
* is_public (bool)
* created_at

### `sessions`

* id (uuid)
* room_id
* snapshot_url (S3 path)
* transcript (text)
* evaluation_id (fk evaluations)
* created_at

### `evaluations`

* id (uuid)
* session_id
* ai_score (float)
* ai_output (json)
* created_at

### `replay_events` (optional, for full replay)

* id
* session_id
* event_type
* payload (json)
* timestamp

**Note:** Use vector DB to store embeddings of session transcripts/evaluations to enable semantic search across saved sessions.

---

## 6. API design (selected endpoints)

* `POST /api/auth/login` (OAuth handled by provider)
* `POST /api/rooms` -> create room
* `GET /api/rooms/:id` -> get metadata
* `POST /api/rooms/:id/sessions` -> save session snapshot
* `POST /api/evaluate` -> start AI evaluation (returns job id)
* `GET /api/evaluate/:jobId` -> poll for result
* `GET /api/sessions/:id/replay` -> fetch events for replay

---

## 7. Frontend wireframe & UX notes

* Top nav: App logo, user menu, New Room
* Lobby: Create room, Recent sessions, Search saved sessions (semantic search)
* Room layout (3 columns): Left = components toolbox; Center = canvas (whiteboard); Right = chat + AI evaluation panel
* Floating Controls: Save, Export, Replay, Invite link, Evaluate (large CTA)

*(Sketch idea: use React-Flow for node-and-edge-based diagrams; otherwise Excalidraw for freehand collaborative drawing.)*

---

## 8. Feature roadmap (12–24 weeks)

**Phase 0 (Week 0)**: repo + infra skeleton
**Phase 1 (Weeks 1–3) — MVP**

* Auth, rooms, basic whiteboard, realtime sync, save/export
* Basic chat & presence
  **Phase 2 (Weeks 4–6)**
* AI evaluation integration + worker queue
* Session replay, snapshot persistence
* Basic analytics
  **Phase 3 (Weeks 7–10)**
* Cost estimator, improved AI feedback, embeddings & search
* Export templates, PDF generation
  **Phase 4 (Weeks 11–16)**
* Video/audio calls (WebRTC), advanced UX, multi-tenant billing
* Team/org features + roles & permissions
  **Phase 5 (Post‑MVP)**
* Marketplace (templates), mentor booking, public shareable diagrams, SSO for enterprises

---

## 9. Security & privacy considerations

* End-to-end encryption for sensitive sessions (optional advanced)
* Data retention controls & deletion API
* User consent before sending designs to third‑party LLMs
* Rate limiting + abuse detection on eval endpoints

---

## 10. Deployment & scalability notes

* Use Redis for presence and pub/sub scaling across realtime server instances.
* Yjs with awareness + centralized websocket provider scales horizontally behind sticky sessions or with a websocket load balancer.
* Offload heavy LLM calls to worker pool; autoscale based on queue length.
* Store large artifacts in S3; keep relational DB for metadata and auditing.

---

## 11. Testing & metrics (what to measure)

* Uptime and websocket connection success rate
* Event latency (round-trip for edits)
* Time to AI evaluation response
* User engagement: sessions created / avg session length
* Error rates and queue backlogs

---

## 12. 8-week execution plan (detailed week-by-week)

**Week 1**: Project skeleton, auth, user model, create/join room, basic UI
**Week 2**: Integrate Yjs + WebSocket provider; implement collaborative canvas (shapes + text)
**Week 3**: Persist sessions, implement save/export (PNG), basic chat & presence
**Week 4**: Create evaluation API, worker queue, hook to LLM (mock first)
**Week 5**: Build evaluation prompt templates, store results, show AI panel UI
**Week 6**: Add session replay and snapshot replay UI
**Week 7**: Add embeddings for sessions (vector DB) + semantic search
**Week 8**: Polish, testing, deploy staging, record demo video for portfolio

---

## 13. Dev folder structure (suggested)

```
/apps
  /frontend (react + vite)
  /backend (nestjs/express)
  /worker
/shared
  /libs (types, utils)

infra
  /k8s
  /terraform

scripts
```

---

## 14. How to showcase this on portfolio / resume

* Live demo link + short 60s demo clip
* GitHub with clear README, architecture diagram, and deployment script
* Write a blog post: "Building a collaborative system design whiteboard — realtime CRDTs + AI evaluation"
* Show metrics: users, sessions, avg evaluation improvements

---

## 15. Next immediate actions I can do for you right now

1. Generate a **detailed ERD** and Postgres schema migration SQL.
2. Create **API route specs** + sample request/response bodies.
3. Produce a **frontend component tree + React code scaffold** (ex: canvas component file layout).
4. Build a minimal **starter repo** scaffold (files + docker-compose).

Tell me which one of (1)-(4) you want next and I’ll produce it.
