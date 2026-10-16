<div align="center">

<img src="logo.svg" alt="Palawan Collective · MerQato Digital · Cayo Coco" width="280" />

# Palawan Collective · MerQato Digital · Cayo Coco

**A collaboration repo — resort website + digital platform.**

</div>

---

## About

Three entities building together:

| Entity | Role |
|---|---|
| **Palawan Collective** | Palawan-rooted business & digital ecosystem — local business, tourism, hospitality, digital visibility |
| **MerQato Digital** | Digital agency — website design & development, web apps, AI agents, automation |
| **Cayo Coco** | The resort — website, brand, direct bookings |

This repository holds the combined work: the Cayo Coco resort site and the platform components that power it.

---

## Projects

| Folder | Purpose | Stack |
|---|---|---|
| [`cayo-cocoisland`](./cayo-cocoisland) | Resort website (public-facing) + admin back office | Vite + React 19 + TypeScript + Tailwind CSS 4 |
| [`lodge-platform`](./lodge-platform) | PMS, direct booking engine & AI agents | NestJS + React + PostgreSQL + Redis |

> Both projects are included directly in this repository so the whole stack clones in one step.
> `lodge-platform` is derived from the upstream Apache-2.0 project (see its `NOTICE`).

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

### Clone

```bash
git clone https://github.com/sanvicpalawan/cloned-coyo-coco-combined.git
cd cloned-coyo-coco-combined
```

### Run the resort website

```bash
cd cayo-cocoisland
npm install
npm run dev
```

### Run the platform (PMS + booking)

```bash
cd lodge-platform
docker compose up
```

| Service | URL |
|---|---|
| Dashboard | http://localhost:3000 |
| Booking widget | http://localhost:3000/booking/ |
| Swagger API | http://localhost:3000/docs |

> Local ports can be remapped with a `docker-compose.override.yml` (not committed).

---

## Site Back Office

The resort site ships an admin back office with two separate sections:

| Section | What it does |
|---|---|
| **Dashboard** | Default tab — launches the PMS (a separate application; not embedded) |
| **Edit site** | Site content, rooms, contact details |

Site editing and PMS settings are deliberately kept apart. The PMS is the single source of
truth for rooms, room types and rates; the resort site handles the public-facing content.

---

## Direct Booking

The lodging platform ships a **commission-free direct booking engine** (search → quote → book) so the resort takes reservations straight from its own website — removing the need for a third-party booking widget.

- Public booking API (property-scoped publishable key)
- Embeddable widget + deep links for marketing
- Server-side re-quoting (never trusts a client price)
- Deposits tracked as a liability, `reservation.created` fires for channel sync

Currency: **PHP is the price of record**; USD and EUR are shown as display-only converted estimates.
Guests choose the display currency in the booking widget.

---

## Status

Work in progress — **build/staging, not live**. No payment gateway is enabled and the demo data
uses placeholder PHP rates.

---

## Deployment

| Target | What runs there |
|---|---|
| **Vercel** | Cayo Coco resort website (static frontend) |
| **Coolify / UpCloud VPS** | Booking platform, database, cache, agents |
| **Cloudflare** | DNS + edge |

---

## License

Each project retains its own license:

- `cayo-cocoisland` — see its `LICENSE` / `README`
- `lodge-platform` — Apache License 2.0 (upstream copyright preserved in `NOTICE`)

---

<div align="center">
<sub>Palawan Collective · MerQato Digital · Cayo Coco — built in Palawan, Philippines 🇵🇭</sub>
</div>
