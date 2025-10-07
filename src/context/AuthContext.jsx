import { createContext, useContext, useState, useEffect } from 'react';
import { storage, initializeDemoData } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize demo data and check for stored user session
    initializeDemoData();
    
    const storedUser = localStorage.getItem('bow_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const user = storage.getUserByUsername(username);
    
    if (user && user.password === password) {
      const userInfo = { ...user };
      delete userInfo.password; // Don't store password in state
      
      setUser(userInfo);
      localStorage.setItem('bow_current_user', JSON.stringify(userInfo));
      return { success: true, user: userInfo };
    }
    
    return { success: false, error: 'Invalid username or password' };
  };

  const signup = (userData) => {
    const existingUser = storage.getUserByUsername(userData.username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    const newUser = {
      ...userData,
      userType: 'student',
      studentId: 'SD' + Math.floor(100000 + Math.random() * 900000).toString()
    };

    storage.saveUser(newUser);
    
    const userInfo = { ...newUser };
    delete userInfo.password;
    
    setUser(userInfo);
    localStorage.setItem('bow_current_user', JSON.stringify(userInfo));
    
    return { success: true, user: userInfo };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bow_current_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};