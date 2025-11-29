# 📘 Arclane | Everything You Need

A fast, organized, category-driven directory for discovering curated links (Anime, Tech, Tools, Movies, etc.).
Built with a clean UI, smart search, automatic metadata extraction, and an approval-based moderation workflow.

---

## 🚀 Features

### 🔍 Smart Search

* Instant search across title, tags, description, and URL metadata
* Search focus shortcut (**Press F**)
* Category filtering with dropdown selector

### 📂 Auto-Organized Sections

* Links automatically grouped into dynamic “Sections”
* Each section has a **sticky header** while scrolling
* Masonry layout for clean 2-column browsing

### 🏷️ Auto Tagging & Classification

The system automatically:

* Extracts tags from URLs
* Detects section types (Streaming, Torrent, Tools, etc.)
* Normalizes URL formats
* Fetches favicons automatically for each website

### 🛠️ Submit-and-Approve Workflow

**Anyone** can submit:

* New Categories
* New Links

Admins can:

* Approve or Reject categories
* Approve or Reject links
* See all pending items in a unified dashboard

### 🔐 Simple Admin Auth

* No user accounts
* Only one admin password stored in `.env`
* Protects access to moderation dashboard

### 🎨 UI/UX Highlights

* Sticky section headers
* Clean collapsible rows (auto-collapse when too many links)
* Pretty favicon-based link cards
* Auto-colored borders per category
* Fully responsive (80% width desktop, 100% mobile)
* Smooth animations everywhere

---

## 🏗️ Tech Stack

### **Frontend**

* React + Vite
* TailwindCSS
* Lucide Icons

### **Backend**

* Node.js
* Express
* MongoDB
* Mongoose
* Hosted on - Railway

---

## 📁 Project Structure

```
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Section.jsx
│   │   │   │   ├── LinkRow.jsx
│   │   │   │   └── LinkCard.jsx
│   │   │   └── db/
│   │   │       ├── AddLink.jsx
│   │   │       ├── AddCategory.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   └── linkHelpers.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── AdminLogin.jsx
│   │   └── api/
│   │       ├── categoryApi.js
│   │       └── linkApi.js
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   └── linkRoutes.js
│   ├── models/
│   │   ├── Category.js
│   │   └── Link.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/links-directory.git
cd links-directory
```

---

## 🗄️ Backend Setup

### Install dependencies

```bash
cd backend
npm install
```

### Configure environment variables

Create `.env`:

```
MONGO_URI=your_mongo_connection_string
ADMIN_PASSWORD=your_admin_password
PORT=5000
```

### Run server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Run frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🛡️ Admin Access

To log in as admin:

```
/admin-login
```

Enter the password stored in `.env` as:

```
ADMIN_PASSWORD=xxxx
```

---

## 📥 Submissions

### Anyone can:

* Add a link
* Add a category

These go to **Pending State**.

### Admin can:

* Approve
* Reject
* Reorder by section / rank (coming soon)

---

## 🧠 Auto Intelligence (linkHelpers.js)

The system automatically:

### ✔️ Extracts tags from:

* torrent links
* streaming links
* direct download (DDL) links
* GitHub / API / Docs
* raw / sub / dub
* more rules can be added

### ✔️ Detects correct section using:

* Category name
* Extracted tags
* URL patterns

---

## 🖼️ Favicon Fetching

Each card automatically gets its favicon from:

```
https://www.google.com/s2/favicons?sz=128&domain_url=<url>
```

Fallback is provided if favicon fails.

---

## ✨ Upcoming Features

* ⭐ Dark/Light Mode
* ⭐ Bookmarking + User Local Storage
* ⭐ Section Sorting + Drag & Drop
* ⭐ Auto Screenshot Preview of Sites
* ⭐ Link Health Checker (404 detection)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to open a pull request.

---

## 📄 License

This project is released under the **MIT License**.
