import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { BookOpen, Edit, Loader2, Plus, Shield, Trash2, Users, Mail, Reply, Clock, User, Send, X } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useAuth } from '../context/AuthContext'
import { storage } from '../utils/storage'

// Componente para as mensagens
function MessageItem({ message, onDelete, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(message, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleCancelReply = () => {
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <Card className="p-3 sm:p-4 border-l-4 border-bow-indigo">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <User className="text-gray-500 w-4 h-4 flex-shrink-0" />
            <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
              {message.studentName}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
              {message.studentId}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {new Date(message.timestamp).toLocaleDateString()}
            </div>
          </div>
          <h3 className="font-semibold text-bow-indigo text-base sm:text-lg leading-tight">
            {message.subject}
          </h3>
        </div>
        
        {/* Action Buttons - Mobile Friendly */}
        <div className="flex justify-end gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsReplying(!isReplying)}
            className="p-1.5 sm:p-2"
            aria-label="Reply"
          >
            <Reply className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(message.id)}
            className="p-1.5 sm:p-2 text-red-500 hover:text-red-700"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Message Content */}
      <div className="mb-3">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.message}
        </p>
      </div>

      {/* Reply Section - Mobile Optimized */}
      {isReplying && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-bow-indigo w-4 h-4" />
            <span className="font-semibold text-bow-indigo text-sm">
              Reply to {message.studentName}
            </span>
          </div>
          
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply message here..."
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-bow-indigo focus:border-bow-indigo resize-none"
          />
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Button 
              onClick={handleReply} 
              size="sm" 
              className="flex-1 justify-center sm:flex-none"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelReply} 
              size="sm"
              className="flex-1 justify-center sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    term: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadCourses();
    loadMessages();
    loadStudents();
  }, []);

  const loadCourses = () => {
    const allCourses = storage.getCourses();
    setCourses(allCourses);
  };

  const loadMessages = () => {
    const allMessages = storage.getMessagesWithReplies();
    setMessages(allMessages);
  };

  const loadStudents = () => {
    const allStudents = storage.getUsers().filter(u => u.userType === 'student');
    setStudents(allStudents);
  };

  const handleEdit = (course) => {
    setEditingCourse({ ...course });
  };

  const handleDelete = (course) => {
    storage.deleteCourse(course.code);
    loadCourses();
  };

  const handleEditChange = (e) => {
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      storage.saveCourse(editingCourse);
      loadCourses();
      setEditingCourse(null);
      setLoading(false);
    }, 800);
  };

  const handleNewChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const courseCode = "C" + Math.floor(1000 + Math.random() * 9000).toString();
      const courseToSave = {
        ...newCourse,
        code: courseCode
      };
      
      storage.saveCourse(courseToSave);
      loadCourses();
      setNewCourse({
        name: "",
        code: "",
        term: "",
        startDate: "",
        endDate: "",
        description: ""
      });
      setLoading(false);
    }, 800);
  };

  const handleDeleteMessage = (messageId) => {
    storage.deleteMessage(messageId);
    loadMessages();
  };

  const handleReplyMessage = (message, replyText) => {
    const replyData = {
      text: replyText,
      adminName: `${user.firstName} ${user.lastName}`
    };

    // Save the reply
    storage.saveMessageReply(message.id, replyData);
    
    // Reload messages to show the reply
    loadMessages();
    
    alert(`Reply sent to ${message.studentName}`);
  };

  const filteredCourses = courses.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || 
         c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-6 lg:p-8 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-bow-indigo w-8 h-8" />
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-bow-indigo">Admin Dashboard</h2>
            <p className="text-gray-600">Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>
        </div>
        
        {/* Admin Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-bow-indigo/5 rounded-lg">
            <div className="text-sm text-gray-600">Admin Name</div>
            <div className="text-lg font-semibold">{user?.firstName} {user?.lastName}</div>
          </div>
          <div className="p-4 bg-bow-indigo/5 rounded-lg">
            <div className="text-sm text-gray-600">Status</div>
            <div className="text-lg font-semibold text-bow-indigo">Administrator</div>
          </div>
        </div>
        
        <hr className="my-8" />
        
        {/* Manage Courses Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-bow-indigo w-6 h-6" />
              Manage Courses
            </h3>
            <Input
              label="Search Courses"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or code"
              className="w-full lg:w-64"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredCourses.length === 0 && (
              <div className="text-gray-400 col-span-3 text-center py-8">No courses found.</div>
            )}
            {filteredCourses.map((course) => (
              <Card key={course.code} className="p-4 flex flex-col gap-3 shadow-md border border-bow-indigo/10">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-bow-indigo w-5 h-5 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-bow-indigo text-lg leading-tight">{course.name}</h4>
                    <span className="inline-block mt-1 text-xs px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded-full">
                      {course.code}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                <div className="text-xs text-gray-500">
                  {course.term} • {course.startDate} to {course.endDate}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(course)} className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(course)} className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Create New Course Section */}
        <div className="mb-12">
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="text-bow-indigo w-6 h-6" />
            Create New Course
          </h3>
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleNewSubmit}>
            <Input 
              label="Course Name" 
              name="name" 
              value={newCourse.name} 
              onChange={handleNewChange} 
              required 
            />
            <Input 
              label="Term" 
              name="term" 
              value={newCourse.term} 
              onChange={handleNewChange} 
              required 
            />
            <Input 
              label="Start Date" 
              name="startDate" 
              type="date" 
              value={newCourse.startDate} 
              onChange={handleNewChange} 
              required 
            />
            <Input 
              label="End Date" 
              name="endDate" 
              type="date" 
              value={newCourse.endDate} 
              onChange={handleNewChange} 
              required 
            />
            <div className="lg:col-span-2">
              <Input 
                label="Description" 
                name="description" 
                value={newCourse.description} 
                onChange={handleNewChange} 
                required 
              />
            </div>
            <div className="lg:col-span-2">
              <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-3">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                ) : (
                  <Plus className="w-5 h-5 inline-block mr-2" />
                )}
                {loading ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Edit Course Modal */}
        {editingCourse && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <Card className="p-6 w-full max-w-2xl shadow-2xl bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-bow-indigo">Edit Course</h3>
                <Button variant="ghost" onClick={() => setEditingCourse(null)}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleEditSubmit}>
                <Input label="Course Name" name="name" value={editingCourse.name} onChange={handleEditChange} required />
                <Input label="Term" name="term" value={editingCourse.term} onChange={handleEditChange} required />
                <Input label="Start Date" name="startDate" type="date" value={editingCourse.startDate} onChange={handleEditChange} required />
                <Input label="End Date" name="endDate" type="date" value={editingCourse.endDate} onChange={handleEditChange} required />
                <div className="lg:col-span-2">
                  <Input label="Description" name="description" value={editingCourse.description} onChange={handleEditChange} required />
                </div>
                <div className="lg:col-span-2 flex gap-4 mt-4">
                  <Button type="submit" disabled={loading} className="bg-bow-indigo text-white font-semibold py-3 flex-1">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                    ) : (
                      <Edit className="w-5 h-5 inline-block mr-2" />
                    )}
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingCourse(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
        
        {/* Registered Students Section */}
        <div className="mb-12">
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="text-bow-indigo w-6 h-6" />
            Registered Students ({students.length})
          </h3>
          <div className="space-y-4">
            {students.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No students registered.</div>
            ) : (
              students.map(student => (
                <Link key={student.studentId} to={`/admin/student/${student.studentId}`}>
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-bow-indigo/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="text-bow-indigo w-5 h-5" />
                          <span className="font-semibold text-lg">{student.firstName} {student.lastName}</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>ID: {student.studentId}</div>
                          <div>Program: {student.programCode}</div>
                          {student.email && <div>Email: {student.email}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                          Active
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
        
        {/* Contact Messages Section */}
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Mail className="text-bow-indigo w-6 h-6" />
            Contact Messages ({messages.length})
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center py-8 text-sm sm:text-base">
                No messages received.
              </div>
            ) : (
              messages.map(message => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  onDelete={handleDeleteMessage}
                  onReply={handleReplyMessage}
                />
              ))
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}