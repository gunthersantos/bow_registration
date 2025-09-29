import { useState } from 'react'
import { Card } from './ui/Card'
import { ArrowRight, BookOpen, Calendar, Loader2, Minus, Plus, Search, User } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { courseData, terms } from '../data/demo'
import { Course } from '../data/types'

interface StudentDashboardProps {
  userInfo: any;
}

export function StudentDashboard({ userInfo }: StudentDashboardProps) {
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtered courses for selected term and search
  const availableCourses =
    courseData.filter(
      (c) =>
        (!selectedTerm || c.term === selectedTerm) &&
        (c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()))
    );

  function handleAddCourse(course: Course) {
    if (selectedCourses.find((c) => c.code === course.code && c.term === selectedTerm)) {
      setError("You already registered for this course in the selected term.");
      return;
    }
    if (selectedCourses.length >= 5) {
      setError("You can register for a maximum of 5 courses per term.");
      return;
    }
    setSelectedCourses([...selectedCourses, { ...course, term: selectedTerm }]);
    setError(null);
  }

  function handleRemoveCourse(course: Course) {
    setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code));
    setError(null);
  }

  function handleSubmitRegistration() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <User size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Student Dashboard</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="mb-2 text-sm text-gray-600">Student ID:</div>
            <div className="text-lg font-bold text-bow-indigo">{userInfo?.studentId || "SDxxxxxx"}</div>
            <div className="mt-2 text-sm text-gray-600">Name:</div>
            <div className="text-lg">{userInfo?.firstName} {userInfo?.lastName}</div>
            <div className="mt-2 text-sm text-gray-600">Program:</div>
            <div className="text-lg">{userInfo?.program?.name} ({userInfo?.program?.type})</div>
            <div className="mt-2 text-sm text-gray-600">Department:</div>
            <div className="text-lg">Software Development (SD)</div>
          </div>
          <div>
            <div className="mb-2 text-sm text-gray-600">Status:</div>
            <div className="text-lg font-bold text-bow-indigo">Student</div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Calendar size={22} className="text-bow-indigo" />
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
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <BookOpen size={22} className="text-bow-indigo" />
              Register for Courses
            </h3>
            <Input
              label="Search Courses"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or code"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {availableCourses.length === 0 && (
                <div className="text-gray-400 col-span-2">No courses found for this term.</div>
              )}
              {availableCourses.map((course) => (
                <Card key={course.code} className="p-4 flex flex-col gap-2 shadow-md border border-bow-indigo/10">
                  <div className="flex items-center gap-2">
                    <BookOpen size={20} className="text-bow-indigo" />
                    <span className="font-semibold text-bow-indigo">{course.name}</span>
                    <span className="text-xs ml-auto px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded">{course.code}</span>
                  </div>
                  <p className="text-xs text-gray-600">{course.description}</p>
                  <div className="flex flex-row gap-4 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddCourse(course)}
                      disabled={selectedCourses.length >= 5 || !!selectedCourses.find(c => c.code === course.code)}
                      aria-label={`Add ${course.name}`}
                    >
                      <Plus size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <ArrowRight size={22} className="text-bow-indigo" />
            Selected Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCourses.length === 0 && <div className="text-gray-400 col-span-2">No courses selected.</div>}
            {selectedCourses.map((course) => (
              <Card key={course.code} className="p-4 flex flex-col gap-2 shadow-md border border-bow-indigo/10">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-bow-indigo" />
                  <span className="font-semibold text-bow-indigo">{course.name}</span>
                  <span className="text-xs ml-auto px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded">{course.code}</span>
                </div>
                <div className="flex flex-row gap-4 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveCourse(course)}
                    aria-label={`Remove ${course.name}`}
                  >
                    <Minus size={16} className="mr-1" />
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button
          className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2"
          disabled={selectedCourses.length < 2 || loading}
          onClick={handleSubmitRegistration}
        >
          {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <ArrowRight size={20} className="inline-block mr-2" />}
          {loading ? "Registering..." : "Submit Registration"}
        </Button>
        {selectedCourses.length > 0 && selectedCourses.length < 2 && (
          <div className="text-gray-500 text-sm mt-2">You must register for at least 2 courses per term.</div>
        )}
      </Card>
    </section>
  );
}