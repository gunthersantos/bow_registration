import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Home as HomeIcon, LogIn, LogOut, Shield, User } from 'lucide-react'
import { UserType } from '../App'
import { Button } from './ui/Button'

interface NavbarProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
  setUserInfo: (info: any) => void;
}

export function Navbar({ userType, setUserType, setUserInfo }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserType(null);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-bow-indigo text-xl">
          <GraduationCap size={28} aria-label="Bow Course Logo" />
          Bow Registration
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-bow-indigo flex items-center gap-1 font-medium">
            <HomeIcon size={20} />
            Home
          </Link>
          <Link to="/signup" className="hover:text-bow-indigo font-medium">
            Signup
          </Link>
          <Link to="/login" className="hover:text-bow-indigo font-medium">
            Login
          </Link>
          {userType === "student" && (
            <>
              <Link to="/student-dashboard" className="hover:text-bow-indigo font-medium flex items-center gap-1">
                <User size={20} />
                Dashboard
              </Link>
              <Link to="/profile" className="hover:text-bow-indigo font-medium">
                Profile
              </Link>
              <Link to="/contact" className="hover:text-bow-indigo font-medium">
                Contact
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut size={18} className="mr-1" />
                Logout
              </Button>
            </>
          )}
          {userType === "admin" && (
            <>
              <Link to="/admin-dashboard" className="hover:text-bow-indigo font-medium flex items-center gap-1">
                <Shield size={20} />
                Admin
              </Link>
              <Link to="/profile" className="hover:text-bow-indigo font-medium">
                Profile
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut size={18} className="mr-1" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}