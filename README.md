# Toll Plaza Management System

A full-stack web application for managing toll plaza operations, including vehicle entry logging, toll fee calculations, and real-time toll log tracking.

## 📸 Project Screenshots

### Dashboard Overview
![Toll Plaza Dashboard](./screenshot/s1.png)
*Main dashboard showing the New Entry Form and Recent Toll Logs with real-time vehicle tracking and toll fee calculations.*

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Project Overview

The **Toll Plaza Management System** is designed to streamline toll collection and vehicle tracking operations at toll plazas. The application provides a user-friendly interface for:

- Recording vehicle entries with vehicle details
- Automatic toll fee calculation based on vehicle type
- Real-time tracking of toll logs
- Dashboard visualization of recent toll transactions

This system helps toll plaza operators efficiently manage vehicle traffic flow and maintain accurate records of toll collections.

---

## ✨ Features

- ✅ **Vehicle Entry Management** - Add and track vehicle entries in real-time
- ✅ **Automatic Fee Calculation** - Dynamic toll fee calculation based on vehicle type
- ✅ **Toll Log Tracking** - View and manage recent toll transactions
- ✅ **Responsive UI** - Modern, responsive web interface built with Angular
- ✅ **Database Integration** - Persistent data storage with MongoDB/SQL
- ✅ **RESTful API** - Clean API endpoints for toll management operations

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular
- **Language**: TypeScript
- **Styling**: CSS3
- **Build Tool**: Angular CLI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB / SQL (configure in `db.js`)
- **Language**: JavaScript (ES6+)

---

## 📁 Project Structure

```
Toll Plaza/
│
├── frontend/                          # Angular Frontend Application
│   ├── src/
│   │   ├── index.html                # Main HTML file
│   │   ├── main.ts                   # Application entry point
│   │   ├── styles.css                # Global styles
│   │   └── app/                      # Application modules
│   │       ├── app.ts                # Root component
│   │       ├── app.html              # Root template
│   │       ├── app.css               # Root styles
│   │       ├── app.config.ts         # Angular configuration
│   │       ├── app.routes.ts         # Route definitions
│   │       │
│   │       ├── components/           # Reusable UI components
│   │       │   ├── navbar/           # Navigation bar component
│   │       │   │   ├── navbar.component.ts
│   │       │   │   ├── navbar.component.html
│   │       │   │   └── navbar.component.css
│   │       │   │
│   │       │   ├── new-entry/        # Add new toll entry component
│   │       │   │   ├── new-entry.component.ts
│   │       │   │   ├── new-entry.component.html
│   │       │   │   └── new-entry.component.css
│   │       │   │
│   │       │   └── recent-toll-logs/ # Display recent toll logs component
│   │       │       ├── recent-toll-logs.component.ts
│   │       │       ├── recent-toll-logs.component.html
│   │       │       └── recent-toll-logs.component.css
│   │       │
│   │       ├── models/               # TypeScript interfaces and models
│   │       │   └── toll-log.model.ts # Toll log data model
│   │       │
│   │       └── services/             # Angular services for API calls
│   │           └── toll-log.service.ts # Service for toll log operations
│   │
│   ├── angular.json                  # Angular CLI configuration
│   ├── package.json                  # Frontend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   └── README.md                     # Frontend-specific documentation
│
├── backend/                           # Node.js Backend Application
│   ├── src/
│   │   ├── server.js                 # Express server entry point
│   │   │
│   │   ├── config/
│   │   │   └── db.js                 # Database connection configuration
│   │   │
│   │   ├── models/
│   │   │   └── TollLog.js            # Toll log database model/schema
│   │   │
│   │   ├── routes/
│   │   │   └── logs.js               # API routes for toll log operations
│   │   │
│   │   └── utils/
│   │       └── feeCalculator.js      # Toll fee calculation utility
│   │
│   ├── package.json                  # Backend dependencies
│   └── README.md                     # Backend-specific documentation
│
└── README.md                          # Project root documentation (this file)
```

---

## 🗂️ Folder Structure Explained

### **Frontend** (`/frontend`)
The Angular-based user interface that users interact with:
- **Components**: Modular UI building blocks (navbar, form inputs, log displays)
- **Services**: Handle communication with the backend API
- **Models**: Define data structures and interfaces
- **Routes**: Define navigation paths and page structure

### **Backend** (`/backend`)
The Node.js server that handles business logic and data management:
- **Server**: Express application setup and middleware configuration
- **Config**: Database connection and environment variables
- **Models**: Database schemas for storing toll log data
- **Routes**: API endpoints for CRUD operations on toll logs
- **Utils**: Helper functions like toll fee calculation logic

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB or SQL database (configured in backend)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database connection in `src/config/db.js`

4. Configure MongoDB Atlas and put your .env file
   
  PORT=5000

  MONGO_URI=mongodb+srv://User:cbZERiZpHpkZjKhspQ@booth.3khfcip.mongodb.net/?appName=Booth

   The backend will run on `http://localhost:5000` (or your configured port)

5. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000` (or your configured port)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```
   The frontend will be available at `http://localhost:4200`

---

## 💻 Usage

1. **Open the Application**: Navigate to `http://localhost:4200` in your browser
2. **Add New Entry**: Click on the "New Entry" section to log a vehicle
3. **Enter Vehicle Details**: Fill in vehicle information (type, registration, etc.)
4. **Automatic Calculation**: The toll fee is automatically calculated based on vehicle type
5. **View Recent Logs**: Check the "Recent Toll Logs" section to see all transactions

---

## 🔌 API Endpoints

### Get All Toll Logs
```
GET /api/logs
```
Returns a list of all toll log entries.

### Get Single Toll Log
```
GET /api/logs/:id
```
Returns a specific toll log entry by ID.

### Create New Toll Log
```
POST /api/logs
Body: {
  vehicleType: "string",
  registrationNumber: "string",
  entryTime: "timestamp",
  fee: "number"
}
```
Creates a new toll log entry.

### Update Toll Log
```
PUT /api/logs/:id
Body: { ...updated fields }
```
Updates an existing toll log entry.

### Delete Toll Log
```
DELETE /api/logs/:id
```
Deletes a toll log entry.

---

## 📚 Additional Documentation

- See [Backend README](./backend/README.md) for backend-specific details
- See [Frontend README](./frontend/README.md) for frontend-specific details

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch for your feature
2. Make your changes with clear commit messages
3. Test your changes thoroughly
4. Submit a pull request with a detailed description

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues or questions, please open an issue on the project repository or contact the development team.

---

**Last Updated**: May 5, 2026
