import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { BookOpen } from 'lucide-react'
import { Course } from '../data/types'

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/course/${course.code}`} className="block">
      <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all border border-bow-indigo/10 rounded-2xl flex flex-col gap-2 hover:bg-bow-indigo/5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={28} className="text-bow-indigo" />
          <span className="font-semibold text-bow-indigo">{course.name}</span>
          <span className="text-xs ml-auto px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded">{course.term}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <span>Code: <b>{course.code}</b></span>
          <span>Start: <b>{course.startDate}</b></span>
          <span>End: <b>{course.endDate}</b></span>
        </div>
      </Card>
    </Link>
  );
}