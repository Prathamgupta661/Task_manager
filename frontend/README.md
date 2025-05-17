# Task Manager Frontend

This is the frontend for the **Task Manager** application, a full-stack project that allows users to manage projects and tasks efficiently. The frontend is built with React and communicates with a Node.js/Express backend.

## 🚀 Features

- User authentication (signup & login)
- Create, view, update, and delete projects (up to 4 per user)
- Create, view, update, and delete tasks within projects
- Task status management (Pending, In Progress, Completed)
- Responsive and modern UI

## 🖥️ How It Works

1. **User Authentication:**  
   Users can sign up and log in. Authentication tokens are stored in local storage.

2. **Project Management:**  
   Users can create up to 4 projects. Each project can be viewed, and deleted.

3. **Task Management:**  
   Within each project, users can add, edit, and delete tasks. Tasks have statuses and completion timestamps.

4. **Real-Time Updates:**  
   The UI updates automatically after creating, updating, or deleting projects and tasks.

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- The backend server running (see backend README for setup)

### 1. Clone the Repository

```powershell
git clone https://github.com/Prathamgupta661/Task_manager/tree/master/frontend
cd Task_manager/frontend
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory if needed.  
Set the backend URL in `vite.config.js` or use `import.meta.env.VITE_BACKEND_URL` in your code.

Example:
```
VITE_BACKEND_URL=http://localhost:3000
```

### 4. Start the Development Server

```powershell
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## 📦 Build for Production

```powershell
npm run build
```

## 🧑‍💻 Project Structure

- `src/components/` — React components (Login, Signup, ProjectDashboard, TaskDashboard, etc.)
- `src/schemas/` — Form validation schemas
- `public/` — Static assets

## 🤝 Contributing

Feel free to fork this repo and submit pull requests!

## 📄 License

This project is for educational purposes.
