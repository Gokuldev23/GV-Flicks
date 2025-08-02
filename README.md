# 🎬 NextFlick

NextFlick is a modern movie search and wishlist web app built with **Next.js 15**, **React Server Components (RSC)**, **Tailwind CSS**, and **PostgreSQL**. It leverages a third-party movie API (like TMDB) to fetch and display the latest movie data with a clean and responsive UI.

---

## 🚀 Features

- 🔍 **Search Movies** by title with real-time results
- ❤️ **Add to Wishlist** (favorites) with session-based login
- 🔐 **Authentication** with protected routes
- 🧠 Built using **React Server Components (RSC)** for performance
- 🗂️ Movies listed in a **grid layout**, sorted by latest
- 📦 **PostgreSQL** for storing wishlist and user session data
- 🧪 Session persists on refresh (with a 1-minute expiration for demo)
- 🎞️ Click on a movie to view detailed info, including trailer & images
- ✅ Fallback: If not logged in, trying to favorite prompts a login redirect

---

## 🧱 Tech Stack

- **Frontend:** Next.js 15 (App Router + React Server Components)
- **Styling:** Tailwind CSS
- **Backend:** API Routes (Next.js)
- **Database:** PostgreSQL (raw SQL, no ORM like Prisma)
- **Authentication:** Session-based using cookies
- **API:** The Movie Database (TMDB) or any third-party movie API

---

## 🧑‍💻 Local Setup

```bash
git clone https://github.com/your-username/nextflick.git
cd nextflick
npm install
cp .env.example .env.local
# Add your TMDB API key and DB connection string in .env.local
npm run dev
