# 🦎 Salamander Tracker

Salamander Tracker is a web application that allows users to analyze the movement patterns of salamander videos by selecting a color to track in a video thumbnail, adjusting threshold sensitivity, and generating a CSV file of the tracking results. It's designed to support biological or environmental research workflows.

---

## 📸 Project Overview

Users can:
- View a list of available `.mp4` videos.
- Preview a video thumbnail.
- Click to select a target color to track.
- Adjust the threshold for binarization sensitivity.
- Generate a CSV file with tracked coordinates.

This project is built with:
- **Next.js** (frontend)
- **Material UI (MUI)** for design
- **Node.js + Express** (backend)
- **Cypress** for end-to-end testing

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
# For frontend (Next.js)
git clone https://github.com/TiaMarieG/salamander-tracker
cd salamander-tracker
npm install
npm run dev

# For backend (Express server)
git clone https://github.com/TiaMarieG/centroid-finder
cd centroid-finder
Switch to 'image' branch
cd server
npm install
npm run dev
```

You can create a .env.local file if needed for custom configs, but this project uses hardcoded development ports for simplicity:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080