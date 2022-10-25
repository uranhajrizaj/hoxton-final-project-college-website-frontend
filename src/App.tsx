import { Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { AboutUs } from './pages/components/AboutUs'
import { ContactUs } from './pages/components/Contactus'
import { Home } from './pages/HomePage'
import { Parent } from './pages/ParentPage'
import { SignIn } from './pages/Sign-in'
import { Student } from './pages/StudentPage'
import { Teacher } from './pages/TeacherPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  )
}

export default App
