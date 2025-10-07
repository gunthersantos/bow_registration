import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { BookOpen } from 'lucide-react'

export function CourseCard({ course }) {
  return (
    <Link to={`/course/${course.code}`} className="block group">
      <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-bow-indigo/10 rounded-xl group-hover:border-bow-indigo/30 group-hover:bg-bow-indigo/3 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <BookOpen className="text-bow-indigo w-5 h-5 lg:w-6 lg:h-6 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-bow-indigo text-lg leading-tight line-clamp-2 group-hover:text-bow-indigo/80 transition-colors">
              {course.name}
            </h3>
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded-full font-medium">
              {course.term}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {course.description}
        </p>
        
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span className="font-medium">Code: {course.code}</span>
          <span className="mx-2">•</span>
          <span>Starts: {course.startDate}</span>
        </div>
      </Card>
    </Link>
  );
}