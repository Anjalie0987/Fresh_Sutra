# Fresh Sutra Project Guide

This guide details how to set up and run the **Fresh Sutra** application (Frontend + Backend).

## Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (Running locally on port 5432)

---

## 1. Backend Setup & Run

The backend is located in the `fresh-sutra-backend` folder.

1.  **Open a Terminal** and navigate to the backend directory:
    ```powershell
    cd fresh-sutra-backend
    ```

2.  **Install Dependencies** (First time only):
    ```powershell
    npm install
    ```

3.  **Database Setup**:
    Ensure your PostgreSQL database is running. Then, generate the Prisma client:
    ```powershell
    npx prisma generate
    ```
    *(Optional: To push schema changes to DB)*
    ```powershell
    npx prisma db push
    ```

4.  **Start the Server**:
    ```powershell
    npm run dev
    ```
    The backend will start at: **http://localhost:5000**

---

## 2. Frontend Setup & Run

The frontend is located in the root directory `fresh-sutra-frontend`.

1.  **Open a NEW Terminal** (keep the backend running) and navigate to the project root:
    ```powershell
    cd c:\Users\anjal\Fresh_Sutra\fresh-sutra-frontend
    ```

2.  **Install Dependencies** (First time only):
    ```powershell
    npm install
    ```

3.  **Start the Server**:
    ```powershell
    npm run dev
    ```

4.  **Access the App**:
    - **Local**: [http://localhost:5173](http://localhost:5173)
    - **Network (Mobile)**: [http://192.168.1.3:5173](http://192.168.1.3:5173)

---

## Troubleshooting

-   **"Internal Server Error" on Login**: Ensure the backend is running and `npx prisma generate` has been executed.
-   **Mobile Access Issues**: 
    -   Ensure your laptop and mobile are on the **same Wi-Fi**.
    -   Verify the IP address in `.env` matches your laptop's current IP (currently set to `192.168.1.3`).
