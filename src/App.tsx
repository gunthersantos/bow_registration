import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './components/Home'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { StudentDashboard } from './components/StudentDashboard'
import { AdminDashboard } from './components/AdminDashboard'
import { ProgramDetails } from './components/ProgramDetails'
import { CourseDetails } from './components/CourseDetails'
import { Profile } from './components/Profile'
import { ContactForm } from './components/ContactForm'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'

export type UserType = "student" | "admin" | null;

function App() {
  // For demo, use local state to store logged-in user type and info
  const [userType, setUserType] = useState<UserType>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
        <Navbar userType={userType} setUserType={setUserType} setUserInfo={setUserInfo} />
        <main className="flex-1 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={
              <Signup onSignup={(info) => {
                setUserType("student");
                setUserInfo(info);
              }} />
            } />
            <Route path="/login" element={
              <Login onLogin={(type, info) => {
                setUserType(type);
                setUserInfo(info);
              }} />
            } />
            <Route path="/student-dashboard" element={
              userType === "student"
                ? <StudentDashboard userInfo={userInfo} />
                : <Navigate to="/login" />
            } />
            <Route path="/admin-dashboard" element={
              userType === "admin"
                ? <AdminDashboard userInfo={userInfo} />
                : <Navigate to="/login" />
            } />
            <Route path="/program/:code" element={<ProgramDetails />} />
            <Route path="/course/:code" element={<CourseDetails />} />
            <Route path="/profile" element={
              userType
                ? <Profile userType={userType} userInfo={userInfo} />
                : <Navigate to="/login" />
            } />
            <Route path="/contact" element={
              userType === "student"
                ? <ContactForm userInfo={userInfo} />
                : <Navigate to="/login" />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-white py-4 shadow-inner mt-auto">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Bow Course Registration &mdash; SD Department
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;