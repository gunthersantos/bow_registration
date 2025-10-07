import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { ArrowLeft, BookOpen, Calendar, Mail, Phone, User } from 'lucide-react'
import { storage } from '../utils/storage'
import { Button } from './ui/Button'

export function StudentDetails() {
  const { studentId } = useParams();
  const [students] = useState(storage.getUsers().filter(u => u.userType === 'student'));
  const [registrations] = useState(storage.getRegistrations());
  const [courses] = useState(storage.getCourses());

  const student = students.find(s => s.studentId === studentId);

  if (!student) {
    return (
      <section className="max-w-2xl mx-auto px-4 mt-12">
        <Card className="p-8 flex flex-col items-center text-center">
          <User className="w-12 h-12 mb-4 text-bow-indigo" />
          <h2 className="text-xl font-bold text-bow-indigo mb-2">Student Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find this student.</p>
          <Link to="/admin-dashboard" className="text-bow-indigo hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
          </Link>
        </Card>
      </section>
    );
  }

  // Get student's course registrations
  const studentRegistrations = registrations.filter(r => r.studentId === studentId);
  const registeredCourses = studentRegistrations.map(reg => {
    const course = courses.find(c => c.code === reg.courseCode);
    return course ? { ...course, registrationTerm: reg.term } : null;
  }).filter(Boolean);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6 lg:p-8 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="text-bow-indigo w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold text-bow-indigo">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-gray-600">Student Details</p>
            </div>
          </div>
          <Link to="/admin-dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="text-bow-indigo w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-600">Student ID</div>
                  <div className="font-mono font-semibold">{student.studentId}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="text-bow-indigo w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{student.email}</div>
                </div>
              </div>
              
              {student.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="text-bow-indigo w-5 h-5" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-semibold">{student.phone}</div>
                  </div>
                </div>
              )}
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Program</div>
                <div className="font-semibold">{student.programCode}</div>
              </div>
              
              {student.birthday && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Birthday</div>
                  <div className="font-semibold">{student.birthday}</div>
                </div>
              )}
            </div>
          </div>

          {/* Course Registrations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Course Registrations ({registeredCourses.length})
            </h3>
            
            {registeredCourses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No courses registered yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {registeredCourses.map((course) => (
                  <Card key={course.code} className="p-4 border border-bow-indigo/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-bow-indigo">{course.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{course.code}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{course.registrationTerm}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}