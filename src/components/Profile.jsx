import { useState } from 'react'
import { Card } from './ui/Card'
import { Shield, User, Edit, Save, X, ArrowLeft, Mail, Phone, Cake, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { storage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: user?.birthday || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      
      // Update in localStorage
      const users = storage.getUsers();
      const userIndex = users.findIndex(u => u.username === user.username);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...formData };
        localStorage.setItem('bow_users', JSON.stringify(users));
      }
      
      // Update current user in localStorage
      localStorage.setItem('bow_current_user', JSON.stringify(updatedUser));
      
      setLoading(false);
      setIsEditing(false);
      window.location.reload();
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthday: user?.birthday || ''
    });
    setIsEditing(false);
  };

  const handleBack = () => {
    if (user.userType === "student") {
      navigate('/student-dashboard');
    } else {
      navigate('/admin-dashboard');
    }
  };

  return (
    <section className="max-w-md mx-auto px-3 py-4">
      {/* Header Compacto */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={handleBack} size="sm" className="px-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          {user.userType === "student" ? 
            <User className="text-bow-indigo w-5 h-5" /> : 
            <Shield className="text-bow-indigo w-5 h-5" />
          }
          <h2 className="text-lg font-bold text-bow-indigo">Profile</h2>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)} size="sm" className="px-3">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button variant="outline" onClick={handleCancel} size="sm" className="px-2">
              <X className="w-4 h-4" />
            </Button>
            <Button onClick={handleSave} disabled={loading} size="sm" className="px-2">
              <Save className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <Card className="p-4 shadow-lg rounded-xl">
        {!isEditing ? (
          // View Mode - Super Compacto
          <div className="space-y-3">
            {/* Nome */}
            <div className="text-center mb-3">
              <div className="font-bold text-xl text-bow-indigo">
                {user?.firstName} {user?.lastName}
              </div>
              <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${
                user.userType === "student" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {user.userType === "student" ? "Student" : "Administrator"}
              </div>
            </div>

            {/* Informações Principais */}
            <div className="space-y-2">
              {/* Email */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Mail className="text-bow-indigo w-4 h-4 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium truncate">{user?.email}</div>
                </div>
              </div>

              {/* Student Info */}
              {user.userType === "student" && (
                <>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <BookOpen className="text-bow-indigo w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-500">Student ID</div>
                      <div className="text-sm font-mono font-medium">{user?.studentId}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <User className="text-bow-indigo w-4 h-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-gray-500">Program</div>
                      <div className="text-sm font-medium">{user?.programCode}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Phone */}
              {user.phone && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Phone className="text-bow-indigo w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-sm font-medium">{user.phone}</div>
                  </div>
                </div>
              )}

              {/* Birthday */}
              {user.birthday && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Cake className="text-bow-indigo w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-500">Birthday</div>
                    <div className="text-sm font-medium">{user.birthday}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit Mode - Compacto
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-bow-indigo focus:border-bow-indigo"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-bow-indigo focus:border-bow-indigo"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-bow-indigo focus:border-bow-indigo"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-bow-indigo focus:border-bow-indigo"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Birthday</label>
              <input
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-bow-indigo focus:border-bow-indigo"
              />
            </div>
          </div>
        )}
      </Card>

    </section>
  );
}