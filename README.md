# StayLockedIn v1.0.0 — Backend MVP

**StayLockedIn** is a Productivity Operating System built for students, GATE aspirants, and working professionals. This release marks the first stable MVP of the backend — fully functional, security-audited, and ready for frontend integration.

---

## What's in this release

A complete Spring Boot REST API covering every core feature of the MVP:

**Authentication & Users**
- JWT-based stateless authentication with BCrypt password hashing
- User registration and login with ownership-enforced data isolation

**Goal Hierarchy**
- Hierarchical productivity model: **User → Goal → Milestone → Task**
- Full CRUD for Goals, Milestones, and Tasks
- Goal categories, priorities, statuses, and completion tracking
- Milestone and task status progression
- Patch endpoint for task status-only updates

**Habits & Streaks**
- Recurring habit management with `DAILY / WEEKLY / MONTHLY` frequency
- Habit completion logging
- Study-day streak tracking with history

**Insights**
- Dashboard API — aggregated summary across goals, tasks, habits, and streaks
- Analytics API — productivity metrics per user
- Internal progress computation engine

**Engineering**
- DTO-based API design throughout — no entity leakage
- Global exception handler with structured error responses
- Springdoc OpenAPI / Swagger UI at `/swagger-ui/index.html`
- Ownership-based authorization on all protected resources

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.5 |
| Security | Spring Security + JJWT 0.12 |
| Persistence | Spring Data JPA + PostgreSQL |
| API Docs | Springdoc OpenAPI (Swagger UI) |
| Build | Maven |

---

## Status

| Area | Status |
|---|---|
| Backend development | ✅ Complete |
| Backend testing | ✅ Complete |
| Production audit | ✅ Complete |
| Backend | 🔒 Frozen — ready for frontend integration |

---

## Roadmap

The frontend is next. Planned stack: **Next.js**, **Tailwind CSS**, and **shadcn/ui** — delivering a responsive dashboard and full-stack production release.

---

## Getting Started

See the [README](./README.md) for setup instructions, database configuration, and the full API reference.
