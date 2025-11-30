# <div align="center">

<img src="https://raw.githubusercontent.com/Amitoshdeep/ArcLane/main/.github/banner-dark.png" width="100%" />
<!-- I can generate a banner for you if you want -->

<br/>

# 📘 **ArcLane | Everything You Need**

### *A clean, fast, curated link directory for Anime, Tech, Tools, Movies & more.*

<br/>

<p align="center">
  <a href="https://github.com/Amitoshdeep/ArcLane/stargazers"><img src="https://img.shields.io/github/stars/Amitoshdeep/ArcLane?color=10B981&style=for-the-badge"></a>
  <a href="https://github.com/Amitoshdeep/ArcLane/issues"><img src="https://img.shields.io/github/issues/Amitoshdeep/ArcLane?color=FBBF24&style=for-the-badge"></a>
  <a href="https://github.com/Amitoshdeep/ArcLane"><img src="https://img.shields.io/github/repo-size/Amitoshdeep/ArcLane?color=3B82F6&style=for-the-badge"></a>
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-43853D?style=for-the-badge&logo=node.js" />
</p>

<br/>

🚀 **Smart search.
🔥 Auto-tagging.
⚡ Fast navigation.
🛠 Submit → Approve workflow.
🎨 Minimal dark aesthetic.**

</div>

---

# 🎥 **Live Demo GIF**

> *(Add your GIF inside `/public/media/` and update the path below)*
> Want me to generate a custom animated GIF UI-preview for your project? Just say **yes**.

<p align="center">
  <img src="https://raw.githubusercontent.com/Amitoshdeep/ArcLane/main/.github/demo.gif" width="85%" />
</p>

---

# ⭐ **Highlights**

### 🔍 **Smart Search**

* Instant search across all content
* **F** → focus search
* **/** → GitHub-style search
* **ESC** → clear input
* Tags & descriptions included in search

---

### 📂 **Auto-Organized Sections**

* Auto-detected section names
* Sticky section headers
* Perfect 2-column masonry layout
* Looks clean on all screen sizes

---

### 🏷️ **Automatic Tagging**

* Extracted from:

  * URL patterns
  * Torrent hosts
  * Streaming links
  * GitHub / Docs
  * Raw / Dub / Sub keywords
* Cleaned & deduplicated automatically

---

### 🛠️ **Moderation Workflow**

Users can submit new content.
Admin can:

✔ Approve
✔ Reject
✔ Edit
✔ Moderate

Everything flows through a clean dashboard.

---

### 🔐 **Simple Admin Auth**

* No login system needed
* One admin password in `.env`
* Cookie-based protected routes
* Lightweight + secure

---

### 🎨 **UI / UX**

* Sticky headers
* Collapsible link rows
* Beautiful favicon thumbnails
* Smooth animations
* 80% desktop width layout
* Full mobile-responsive
* Clean typography + spacing
* Keyboard shortcuts modal (`?`)

---

# 🧭 **Keyboard Shortcuts**

| Shortcut           | Action               |
| ------------------ | -------------------- |
| `F`                | Focus search         |
| `/`                | GitHub-style focus   |
| `ESC`              | Clear search         |
| `Ctrl + Backspace` | Hard clear search    |
| `Alt + ↑ / ↓`      | Switch categories    |
| `Shift + /`        | Open shortcuts modal |
| `ESC`              | Close modal          |

---

# 🧱 **Tech Stack**

### **Frontend**

* React + Vite
* TailwindCSS
* Lucide Icons
* React Toastify
* Custom Hooks
* Masonry layout

### **Backend**

* Node.js
* Express
* MongoDB + Mongoose
* Hosted on Railway
* CORS + cookie sessions

---

# 🗂 **Project Structure**

```
project/
│
├── frontend/
│   ├── src/components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── db/
│   ├── src/pages/
│   ├── src/utils/
│   ├── src/api/
│   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# ⚙️ **Local Setup**

## 🗄️ 1️⃣ Backend

```bash
cd backend
npm install
```

### Create `.env`:

```
MONGO_URI=your_mongo_uri
ADMIN_PASSWORD=your_admin_password
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Run server:

```bash
npm run dev
```

---

## 🎨 2️⃣ Frontend

```bash
cd frontend
npm install
```

### Create `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run frontend:

```bash
npm run dev
```

---

# 🛡️ **Admin Access**

Visit:

```
/admin-login
```

Enter the password stored in your backend `.env`.

---

# 💡 **Upcoming Features**

* ⭐ Drag & drop link sorting
* ⭐ Link screenshot previews
* ⭐ Dead link checker (auto 404 scan)
* ⭐ Bookmarks & user-local favorites
* ⭐ Multi-admin support
* ⭐ Light mode

---

# 🤝 **Contributing**

PRs, suggestions, improvements — all welcome!
This project is designed to grow and become the “All-in-1 link lane” for everything.

---

# 📄 **License**

MIT License
Feel free to use, modify, contribute, and build on it.
