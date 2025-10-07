import { Link } from 'react-router-dom'
import { useState } from 'react'
import { GraduationCap, Home as HomeIcon, LogOut, Menu, Shield, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/Button'

export function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-bow-indigo text-xl lg:text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <GraduationCap className="w-7 h-7 lg:w-8 lg:h-8" />
            <span>Bow Registration</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="hover:text-bow-indigo flex items-center gap-1 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            {!user ? (
              <>
                <Link to="/signup" className="hover:text-bow-indigo font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                  Signup
                </Link>
                <Link to="/login" className="hover:text-bow-indigo font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                  Login
                </Link>
              </>
            ) : (
              <>
                {user.userType === "student" && (
                  <>
                    <Link to="/student-dashboard" className="hover:text-bow-indigo flex items-center gap-1 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                      <User className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link to="/profile" className="hover:text-bow-indigo font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link to="/contact" className="hover:text-bow-indigo font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                      Contact
                    </Link>
                  </>
                )}
                {user.userType === "admin" && (
                  <>
                    <Link to="/admin-dashboard" className="hover:text-bow-indigo flex items-center gap-1 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Shield className="w-5 h-5" />
                      <span>Admin</span>
                    </Link>
                    <Link to="/profile" className="hover:text-bow-indigo font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                      Profile
                    </Link>
                  </>
                )}
                <Button variant="ghost" onClick={logout} className="flex items-center gap-1">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-bow-indigo hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bow-indigo"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
              
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className="px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  {user.userType === "student" && (
                    <>
                      <Link
                        to="/student-dashboard"
                        className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/contact"
                        className="px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </>
                  )}
                  {user.userType === "admin" && (
                    <>
                      <Link
                        to="/admin-dashboard"
                        className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Shield className="w-5 h-5" />
                        Admin
                      </Link>
                      <Link
                        to="/profile"
                        className="px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-bow-indigo transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}