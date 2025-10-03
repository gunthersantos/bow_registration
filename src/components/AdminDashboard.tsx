import { useState } from 'react'
import { Card } from './ui/Card'
import { BookOpen, Edit, Loader2, Plus, Search, Shield, Trash2, Users } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { courseData } from '../data/demo'
import { Course } from '../data/types'

interface AdminDashboardProps {
  userInfo: any;
}

export function AdminDashboard({ userInfo }: AdminDashboardProps) {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>(courseData);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    term: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  function handleEdit(course: Course) {
    setEditingCourse(course);
  }

  function handleDelete(course: Course) {
    setCourses(courses.filter(c => c.code !== course.code));
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, [e.target.name]: e.target.value });
    }
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCourses(courses.map(c => c.code === editingCourse?.code ? editingCourse! : c));
      setEditingCourse(null);
      setLoading(false);
    }, 800);
  }

  function handleNewChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  }

  function handleNewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCourses([
        ...courses,
        { ...newCourse, code: "C" + Math.floor(1000 + Math.random() * 9000).toString() }
      ]);
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
  }

  const filteredCourses = courses.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Shield size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Admin Dashboard</h2>
        </div>
        <div className="mb-6">
          <span className="text-sm text-gray-600">Name:</span> <span className="font-bold">{userInfo?.firstName} {userInfo?.lastName}</span>
          <div className="mt-2 text-sm text-gray-600">Status:</div>
          <div className="text-lg font-bold text-bow-indigo">Admin</div>
        </div>
        <hr className="my-6" />
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen size={22} className="text-bow-indigo" />
            Manage Courses
          </h3>
          <Input
            label="Search Courses"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {filteredCourses.length === 0 && (
              <div className="text-gray-400 col-span-2">No courses found.</div>
            )}
            {filteredCourses.map((course) => (
              <Card key={course.code} className="p-4 flex flex-col gap-2 shadow-md border border-bow-indigo/10">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-bow-indigo" />
                  <span className="font-semibold text-bow-indigo">{course.name}</span>
                  <span className="text-xs ml-auto px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded">{course.code}</span>
                </div>
                <p className="text-xs text-gray-600">{course.description}</p>
                <div className="flex flex-row gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(course)} aria-label={`Edit ${course.name}`}>
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(course)} aria-label={`Delete ${course.name}`}>
                    <Trash2 size={16} className="mr-1 text-red-500" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Plus size={22} className="text-bow-indigo" />
            Create New Course
          </h3>
          <form className="space-y-4" onSubmit={handleNewSubmit}>
            <Input label="Course Name" name="name" value={newCourse.name} onChange={handleNewChange} required />
            <Input label="Term" name="term" value={newCourse.term} onChange={handleNewChange} required />
            <Input label="Start Date" name="startDate" type="date" value={newCourse.startDate} onChange={handleNewChange} required />
            <Input label="End Date" name="endDate" type="date" value={newCourse.endDate} onChange={handleNewChange} required />
            <Input label="Description" name="description" value={newCourse.description} onChange={handleNewChange} required />
            <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2">
              {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <Plus size={20} className="inline-block mr-2" />}
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </form>
        </div>
        {editingCourse && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Card className="p-8 w-full max-w-md shadow-2xl bg-white rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-bow-indigo">Edit Course</h3>
              <form className="space-y-4" onSubmit={handleEditSubmit}>
                <Input label="Course Name" name="name" value={editingCourse.name} onChange={handleEditChange} required />
                <Input label="Term" name="term" value={editingCourse.term} onChange={handleEditChange} required />
                <Input label="Start Date" name="startDate" type="date" value={editingCourse.startDate} onChange={handleEditChange} required />
                <Input label="End Date" name="endDate" type="date" value={editingCourse.endDate} onChange={handleEditChange} required />
                <Input label="Description" name="description" value={editingCourse.description} onChange={handleEditChange} required />
                <div className="flex gap-4 mt-2">
                  <Button type="submit" disabled={loading} className="bg-bow-indigo text-white font-semibold py-2">
                    {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <Edit size={20} className="inline-block mr-2" />}
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingCourse(null)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Users size={22} className="text-bow-indigo" />
            Registered Students
          </h3>
          <div className="text-gray-400">No data available</div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen size={22} className="text-bow-indigo" />
            Submitted Contact Forms
          </h3>
          <div className="text-gray-400">No data available</div>
        </div>
      </Card>
    </section>
  );
}