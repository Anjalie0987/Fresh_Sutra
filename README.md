# Fresh Sutra

This repository contains the source code for the **Fresh Sutra** project, featuring a React frontend and a Node.js/Express backend.

## Local Setup Guide

Follow these steps to get the project running on your local machine.

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (running locally)
- **Git**

---

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Fresh_Sutra
```

---

### 2. Backend Setup
The backend handles the database and API logic.

#### a. Navigate to the backend directory
```bash
cd fresh-sutra-frontend/fresh-sutra-backend
```

#### b. Install Dependencies
```bash
npm install
```

#### c. Create Environment Variables
Create a new file named `.env` in the `fresh-sutra-backend` directory. This file is git-ignored and must be created manually.
**Copy and paste the following content:**

```env
PORT=5000
# Update the username (postgres), password (postgres123), and DB name (fresh_sutra) as per your local PostgreSQL setup
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fresh_sutra"

JWT_SECRET=supersecretkeyshouldbechangedindev
EMAIL_USER=freshsutra88@gmail.com
EMAIL_PASS=YOUR_GMAIL_APP_PASSWORD
```
> **Note:** Replace `YOUR_GMAIL_APP_PASSWORD` with a valid App Password if you need email functionality. For local dev, you can ignore it or use a placeholder.

#### d. Setup Database
Run the following commands to create the database tables and seed initial data:
```bash
# Push schema to database (this handles migrations)
npx prisma db push

# (Optional) Seed the database if a seed script exists
npx prisma db seed
```

#### e. Start the Backend Server
```bash
npm run dev
```
You should see output indicating the server is running on `http://localhost:5000`.

---

### 3. Frontend Setup
The frontend is the user interface built with React/Vite.

#### a. Navigate to the frontend directory
Open a **new terminal** window (keep the backend running) and navigate to the frontend folder:
```bash
cd fresh-sutra-frontend
```
*(Note: If you are in the root `Fresh_Sutra` folder, the path is `fresh-sutra-frontend`)*

#### b. Install Dependencies
```bash
npm install
```

#### c. Create Environment Variables
Create a file named `.env` in the `fresh-sutra-frontend` directory.
**Copy and paste the following content:**

```env
# Optional: needed for features using Google Maps
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

#### d. Start the Frontend
```bash
npm run dev
```

---

### Access the App
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).
