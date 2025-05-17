import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import ProjectDashboard from './components/ProjectDashboard';
import TaskDashboard from './components/TaskDashboard';

function App() {

  const [loggedIn, setloggedIn] = useState(localStorage.getItem('token') ? true : false);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}/>
      <Route path='/login' element={<Login setloggedIn={setloggedIn} />}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/user' element={<User loggedIn={loggedIn}/>}>
        <Route path='dashboard' element={<ProjectDashboard/>}/>
        <Route path='project/:id' element={<TaskDashboard/>}/>
      </Route>
      <Route path='*' element={<h1 className='text-2xl font-bold text-center'>404 Not Found</h1>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
