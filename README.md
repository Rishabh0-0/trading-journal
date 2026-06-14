<div align="center">
  <div style="background-color: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 1rem; display: inline-block; margin-bottom: 1rem;">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
  </div>
  <h1>TradeVault</h1>
  <p><strong>A modern, full-stack trading journal engineered for Indian equity traders.</strong></p>
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://trading-journal-lilac-beta.vercel.app/)
</div>

<br />

TradeVault is a premium, beautifully animated trading journal that automatically handles the complex math of Indian stock market statutory charges. Designed with a glassmorphic aesthetic and robust backend architecture, it provides a seamless experience for logging, managing, and analyzing equity delivery trades.

## ✨ Features

- **Automated Charge Calculations:** Built-in engine natively calculates Dhan/Zerodha Equity Delivery charges (STT, Exchange Transaction Charges, SEBI fees, 18% GST, Stamp Duty, and flat DP charges) in real-time as you type.
- **Position Averaging:** Dynamically scale into active trades. The backend automatically calculates weighted average entry prices.
- **Dashboard Analytics:** Track your Total P&L, Win Rate, and Total Trades at a glance.
- **Secure Authentication:** JWT-based user authentication and secure endpoints via Spring Security.
- **Modern UI/UX:** Built with React and Framer Motion for buttery-smooth page transitions, sliding modals, and a premium dark-mode tailored interface.

## 🛠 Technology Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Framework:** Spring Boot (Java 21)
- **Security:** Spring Security + JWT (JSON Web Tokens)
- **Database:** PostgreSQL + Spring Data JPA
- **Data Mapping:** MapStruct
- **Build Tool:** Maven

## 🚀 Live Demo
Experience the application live here: **[TradeVault on Vercel](https://trading-journal-lilac-beta.vercel.app/)**

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- Java 21 (Temurin/JDK)
- PostgreSQL (running locally or via Docker)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Update the `application.properties` with your local PostgreSQL credentials if necessary (it defaults to `jdbc:postgresql://localhost:5432/trading_db`).
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

## 🐳 Docker Deployment
The backend includes a `Dockerfile` for easy containerization.
```bash
cd backend
docker build -t tradevault-backend .
docker run -p 8080:8080 -e DB_URL="jdbc:postgresql://your-db-url:5432/postgres" -e DB_PASSWORD="yourpassword" tradevault-backend
```

