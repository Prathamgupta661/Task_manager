# Task Manager Backend

This is the backend for the **Task Manager** application, a full-stack project that allows users to manage projects and tasks efficiently. The backend is built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication with JWT
- Project CRUD (create, read, update, delete)
- Task CRUD within projects
- Middleware for protected routes
- MongoDB with Mongoose ODM
- CORS and environment variable support

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

### 1. Clone the Repository

```powershell
git clone <your-repo-url>
cd Task_manager/backend
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory. Example:

```
MONGO_URI="<your-mongodb-uri>"
JWT_SECRET="TaskOP"
PORT=3000
CLIENT_URL="https://taskop.vercel.app/"
```

- Replace `<your-mongodb-uri>` with your MongoDB connection string.
- Set `PORT` as needed (default is 3000).

### 4. Start the Server

```powershell
npm start
```

Or, for development with auto-reload:

```powershell
npx nodemon src/index.js
```

The server will run on [http://localhost:3000](http://localhost:3000) by default.

## 📦 Project Structure

- `src/index.js` — Main server entry point
- `src/routes/` — Express route handlers (User, Project, Task)
- `src/models/` — Mongoose models (User, Project, Task)
- `src/middleware/` — Authentication middleware
- `src/utils/ConnectDB.js` — MongoDB connection logic

## 🔐 API Overview

### Authentication
- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive JWT

### Projects
- `GET /projects` — Get all projects for the user
- `POST /projects/create` — Create a new project
- `DELETE /projects/delete/:id` — Delete a project

### Tasks
- `GET /tasks/:id` — Get all tasks for a project
- `POST /tasks/:id` — Create a new task in a project
- `PUT /tasks/` — Update a task
- `DELETE /tasks/:id` — Delete a task

> All `/projects` and `/tasks` routes are protected and require a valid JWT in the `Authorization` header.

## 🧑‍💻 Contributing

Feel free to fork this repo and submit pull requests!

## 📄 License

This project is for educational purposes.
