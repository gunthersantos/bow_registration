import { Link, useParams } from 'react-router-dom'
import { courseData } from '../data/demo'
import { Card } from './ui/Card'
import { ArrowLeft, BookOpen } from 'lucide-react'

export function CourseDetails() {
  const { code } = useParams();
  const course = courseData.find(c => c.code === code);

  if (!course) {
    return (
      <section className="max-w-2xl mx-auto px-4 mt-12">
        <Card className="p-8 flex flex-col items-center text-center">
          <BookOpen size={40} className="mb-4 text-bow-indigo" />
          <h2 className="text-xl font-bold text-bow-indigo mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find this course. Please check the code or browse available courses.</p>
          <Link to="/" className="text-bow-indigo hover:underline flex items-center gap-1">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </Card>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 mt-12">
      <Card className="p-8 bg-white shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">{course.name}</h2>
        </div>
        <p className="text-gray-700 mb-3">{course.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold text-bow-indigo">Term:</span> {course.term}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Course Code:</span> {course.code}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Start Date:</span> {course.startDate}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">End Date:</span> {course.endDate}
          </div>
        </div>
        <Link to="/" className="text-bow-indigo hover:underline flex items-center gap-1 mt-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </Card>
    </section>
  );
}