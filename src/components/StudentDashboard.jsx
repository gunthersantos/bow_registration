import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { ArrowRight, BookOpen, Calendar, Loader2, Minus, Plus, Search, User, Mail, MessageCircle } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { useAuth } from '../context/AuthContext'
import { storage } from '../utils/storage'
import { terms } from '../data/demo'

export function StudentDashboard() {
  const { user } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (selectedTerm) {
      const courses = storage.getCourses();
      const registrations = storage.getStudentRegistrations(user.studentId, selectedTerm);
      
      const filteredCourses = courses.filter(
        (c) =>
          c.term === selectedTerm &&
          (c.name.toLowerCase().includes(search.toLowerCase()) || 
           c.code.toLowerCase().includes(search.toLowerCase()))
      );
      
      setAvailableCourses(filteredCourses);
      setSelectedCourses(registrations.map(r => 
        courses.find(c => c.code === r.courseCode)
      ).filter(Boolean));
    }

    // Load message count
    const messages = storage.getStudentMessages(user.studentId);
    setMessageCount(messages.length);
  }, [selectedTerm, search, user.studentId]);

  function handleAddCourse(course) {
    if (selectedCourses.find((c) => c.code === course.code)) {
      setError("You already registered for this course in the selected term.");
      return;
    }
    if (selectedCourses.length >= 5) {
      setError("You can register for a maximum of 5 courses per term.");
      return;
    }
    
    const newSelectedCourses = [...selectedCourses, course];
    setSelectedCourses(newSelectedCourses);
    setError(null);
  }

  function handleRemoveCourse(course) {
    const newSelectedCourses = selectedCourses.filter((c) => c.code !== course.code);
    setSelectedCourses(newSelectedCourses);
    setError(null);
  }

  function handleSubmitRegistration() {
    setLoading(true);
    setError(null);
    
    // Remove all current registrations for this term
    const currentRegistrations = storage.getStudentRegistrations(user.studentId, selectedTerm);
    currentRegistrations.forEach(reg => {
      storage.deleteRegistration(user.studentId, reg.courseCode, selectedTerm);
    });
    
    // Add new registrations
    selectedCourses.forEach(course => {
      storage.saveRegistration({
        studentId: user.studentId,
        courseCode: course.code,
        term: selectedTerm,
        timestamp: new Date().toISOString()
      });
    });
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6 lg:p-8 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <User className="text-bow-indigo w-8 h-8" />
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-bow-indigo">Student Dashboard</h2>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
        </div>
        
        {/* Student Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <div className="p-3 bg-bow-indigo/5 rounded-lg">
              <div className="text-sm text-gray-600">Student ID</div>
              <div className="text-lg font-bold text-bow-indigo font-mono">{user?.studentId}</div>
            </div>
            <div className="p-3 bg-bow-indigo/5 rounded-lg">
              <div className="text-sm text-gray-600">Name</div>
              <div className="text-lg font-semibold">{user?.firstName} {user?.lastName}</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-bow-indigo/5 rounded-lg">
              <div className="text-sm text-gray-600">Program</div>
              <div className="text-lg font-semibold">{user?.programCode}</div>
            </div>
            <div className="p-3 bg-bow-indigo/5 rounded-lg">
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-lg font-bold text-bow-indigo">Student</div>
            </div>
          </div>
        </div>
        
        <hr className="my-8" />
        
        {/* Messages Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Mail className="text-bow-indigo w-6 h-6" />
            My Messages
          </h3>
          <Card className="p-4 border border-bow-indigo/10 hover:border-bow-indigo/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-bow-indigo/10 rounded-lg">
                  <MessageCircle className="text-bow-indigo w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-bow-indigo">Contact History</h4>
                  <p className="text-sm text-gray-600">
                    {messageCount === 0 
                      ? "No messages yet" 
                      : `${messageCount} message${messageCount !== 1 ? 's' : ''} sent to admin`
                    }
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/student-messages" className="flex-1 sm:flex-none">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </Link>
                <Link to="/contact" className="flex-1 sm:flex-none">
                  <Button size="sm" className="w-full sm:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Admin
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Term Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-bow-indigo w-6 h-6" />
            Select a Term
          </h3>
          <Select
            label="Term"
            name="term"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            options={terms.map((term) => ({ value: term.name, label: `${term.name} (${term.dates})` }))}
            required
          />
        </div>
        
        {selectedTerm && (
          <>
            {/* Course Registration */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="text-bow-indigo w-6 h-6" />
                Register for Courses
              </h3>
              <Input
                label="Search Courses"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or code"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {availableCourses.length === 0 && (
                  <div className="text-gray-400 col-span-2 text-center py-4">
                    No courses found for this term.
                  </div>
                )}
                {availableCourses.map((course) => (
                  <Card key={course.code} className="p-4 flex flex-col gap-3 shadow-md border border-bow-indigo/10">
                    <div className="flex items-start gap-3">
                      <BookOpen className="text-bow-indigo w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-bow-indigo text-sm leading-tight">{course.name}</h4>
                        <span className="inline-block mt-1 text-xs px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded-full">
                          {course.code}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{course.description}</p>
                    <div className="text-xs text-gray-500">
                      {course.startDate} to {course.endDate}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddCourse(course)}
                        disabled={selectedCourses.length >= 5 || !!selectedCourses.find(c => c.code === course.code)}
                        className="flex-1"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Selected Courses */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ArrowRight className="text-bow-indigo w-6 h-6" />
                Selected Courses ({selectedCourses.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCourses.length === 0 && (
                  <div className="text-gray-400 col-span-2 text-center py-4">
                    No courses selected. Add courses from the list above.
                  </div>
                )}
                {selectedCourses.map((course) => (
                  <Card key={course.code} className="p-4 flex flex-col gap-3 shadow-md border border-bow-indigo/10">
                    <div className="flex items-start gap-3">
                      <BookOpen className="text-bow-indigo w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-bow-indigo text-sm leading-tight">{course.name}</h4>
                        <span className="inline-block mt-1 text-xs px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded-full">
                          {course.code}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {course.term} • {course.startDate} to {course.endDate}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveCourse(course)}
                        className="flex-1"
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-700 text-sm">{error}</div>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-700 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Registration successful! You are now enrolled in {selectedCourses.length} courses for {selectedTerm}.
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-3"
              disabled={selectedCourses.length < 2 || loading}
              onClick={handleSubmitRegistration}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
              ) : (
                <ArrowRight className="w-5 h-5 inline-block mr-2" />
              )}
              {loading ? "Registering..." : `Submit Registration (${selectedCourses.length}/5)`}
            </Button>
            
            {/* Validation Message */}
            {selectedCourses.length > 0 && selectedCourses.length < 2 && (
              <div className="mt-2 text-sm text-amber-600 text-center">
                You must register for at least 2 courses per term.
              </div>
            )}
            
            {/* Course Limits Info */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Minimum: 2 courses • Maximum: 5 courses • Current: {selectedCourses.length} courses
            </div>
          </>
        )}
      </Card>
    </section>
  );
}