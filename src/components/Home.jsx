import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { ArrowRight, BookOpen, School, Sparkles } from 'lucide-react'
import { courseData, programData } from '../data/demo'
import { ProgramCard } from './ProgramCard'
import { CourseCard } from './CourseCard'

export function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Hero Section */}
      <header className="text-center mb-12 lg:mb-16">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Sparkles className="text-bow-indigo w-12 h-12 lg:w-16 lg:h-16" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bow-indigo max-w-4xl mx-auto leading-tight">
            Welcome to Bow Course Registration
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Register for SD department programs and courses. Explore available offerings, sign up, and manage your course selections.
          </p>
        </div>
        
      {/* Action Buttons - Slightly Larger */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl mx-auto">
  <Link to="/signup" className="group">
    <Card className="p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-bow-indigo/15 hover:border-bow-indigo/30 hover:scale-105 h-full">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-bow-indigo/10 rounded-lg group-hover:bg-bow-indigo/20 transition-colors flex-shrink-0 mt-1">
          <School className="text-bow-indigo w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-bow-indigo text-base lg:text-lg mb-1">Student Sign Up</h2>
          <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
            Register for programs and courses
          </p>
        </div>
        <ArrowRight className="text-bow-indigo w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  </Link>
  
  <Link to="/login" className="group">
    <Card className="p-5 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-bow-indigo/15 hover:border-bow-indigo/30 hover:scale-105 h-full">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-bow-indigo/10 rounded-lg group-hover:bg-bow-indigo/20 transition-colors flex-shrink-0 mt-1">
          <BookOpen className="text-bow-indigo w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-bow-indigo text-base lg:text-lg mb-1">Login</h2>
          <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
            Access dashboard and profile
          </p>
        </div>
        <ArrowRight className="text-bow-indigo w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  </Link>
</div>
      </header>

      {/* Programs Section */}
      <section className="mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 lg:mb-12 text-center">
          SD Department Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programData.map(program => (
            <ProgramCard key={program.code} program={program} />
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 lg:mb-12 text-center">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {courseData.slice(0, 4).map(course => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>
      </section>
    </section>
  );
}