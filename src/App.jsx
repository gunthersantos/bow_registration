import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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
import { StudentDetails } from './components/StudentDetails'
import { StudentMessages } from './components/StudentMessages'

const ProtectedRoute = ({ children, allowedUserTypes = ['student', 'admin'] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedUserTypes.includes(user.userType)) {
    return <Navigate to="/" />;
  }
  
  return children;
}

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedUserTypes={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedUserTypes={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/program/:code" element={<ProgramDetails />} />
          <Route path="/course/:code" element={<CourseDetails />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <ProtectedRoute allowedUserTypes={['student']}>
                <ContactForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student-messages" 
            element={
              <ProtectedRoute allowedUserTypes={['student']}>
                <StudentMessages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/student/:studentId" 
            element={
              <ProtectedRoute allowedUserTypes={['admin']}>
                <StudentDetails />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-white py-4 shadow-inner mt-auto">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bow Course Registration &mdash; SD Department
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;