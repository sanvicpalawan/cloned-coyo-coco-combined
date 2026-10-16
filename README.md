<div align="center">

<img src="logo.svg" alt="Palawan Collective · MerQato Digital · Coyo Coco" width="280" />

# Palawan Collective · MerQato Digital · Coyo Coco

**A collaboration repo — resort website + digital platform.**

</div>

---

## About

Three entities building together:

| Entity | Role |
|---|---|
| **Palawan Collective** | Palawan-rooted business & digital ecosystem — local business, tourism, hospitality, digital visibility |
| **MerQato Digital** | Digital agency — website design & development, web apps, AI agents, automation |
| **Coyo Coco** | The resort — website, brand, direct bookings |

This repository holds the combined work: the Coyo Coco resort site and the platform components that power it.

---

## Projects

| Repo | Purpose | Stack |
|---|---|---|
| [`cayo-cocoisland`](./cayo-cocoisland) | Resort website (public-facing) | Vite + React 19 + TypeScript + Tailwind CSS 4 |
| [`baia-lodge-pms`](./baia-lodge-pms) | Hotel PMS, booking engine & AI agents | NestJS + React + PostgreSQL + Redis |

> Both are tracked as **git submodules** so each keeps its own history and can be worked on independently.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vite 8 · React 19 · TypeScript 5.9 · Tailwind CSS 4 |
| **UI** | shadcn/ui · Lucide React · clsx · tailwind-merge |
| **Backend** | NestJS · PostgreSQL 16 · Redis 7 · Drizzle ORM |
| **AI / LLM** | OpenRouter (free models) · 12 built-in agents |
| **Auth** | Keycloak OAuth 2.0 / OIDC |
| **Deployment** | Vercel (frontend) · Coolify + UpCloud VPS (backend) |
| **DNS / Proxy** | Cloudflare (free tier) |
| **Source** | GitHub — `sanvicpalawan` + `digitalnativepalawan` |

---

## Getting Started

### Clone everything at once

```bash
git clone --recurse-submodules https://github.com/sanvicpalawan/cloned-coyo-coco-combined.git
cd cloned-coyo-coco-combined
```

### Or pull the submodules after a normal clone

```bash
git submodule update --init --recursive
```

### Run the resort website

```bash
cd cayo-cocoisland
npm install
npm run dev
```

### Run the platform (PMS + booking)

```bash
cd baia-lodge-pms
docker compose up
```

| Service | URL |
|---|---|
| Dashboard | http://localhost:3000 |
| Booking widget | http://localhost:3000/booking/ |
| Swagger API | http://localhost:3000/docs |

---

## Direct Booking

The lodging platform ships a **commission-free direct booking engine** (search → quote → book) so the resort takes reservations straight from its own website — removing the need for a third-party booking widget.

- Public booking API (property-scoped publishable key)
- Embeddable widget + deep links for marketing
- Server-side re-quoting (never trusts a client price)
- Deposits tracked as a liability, `reservation.created` fires for channel sync

---

## Deployment

| Target | What runs there |
|---|---|
| **Vercel** | Coyo Coco resort website (static frontend) |
| **Coolify / UpCloud VPS** | Booking platform, database, cache, agents |
| **Cloudflare** | DNS + edge |

---

## License

Each submodule retains its own license:

- `cayo-cocoisland` — see its `LICENSE` / `README`
- `baia-lodge-pms` — Apache License 2.0 (upstream copyright preserved in `NOTICE`)

---

<div align="center">
<sub>Palawan Collective · MerQato Digital · Coyo Coco — built in Palawan, Philippines 🇵🇭</sub>
</div>
