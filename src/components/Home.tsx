import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { ArrowRight, BookOpen, School, Sparkles } from 'lucide-react'
import { courseData, programData } from '../data/demo'
import { ProgramCard } from './ProgramCard'
import { CourseCard } from './CourseCard'

export function Home() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Sparkles size={40} className="text-bow-indigo" />
          <h1 className="text-3xl md:text-4xl font-bold text-bow-indigo">Welcome to Bow Course Registration</h1>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl text-center">
            Register for SD department programs and courses. Explore available offerings, sign up, and manage your course selections.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-4">
          <Link to="/signup" className="w-full md:w-auto">
            <Card className="flex flex-row items-center gap-3 px-6 py-4 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-bow-indigo/10 to-white border-bow-indigo border hover:bg-bow-indigo/10">
              <School size={32} className="text-bow-indigo" />
              <div>
                <h2 className="font-semibold text-bow-indigo">Sign Up as Student</h2>
                <p className="text-sm text-gray-600">Create your student account and register for SD programs.</p>
              </div>
              <ArrowRight size={22} className="ml-auto text-bow-indigo" />
            </Card>
          </Link>
          <Link to="/login" className="w-full md:w-auto">
            <Card className="flex flex-row items-center gap-3 px-6 py-4 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-bow-indigo/10 to-white border-bow-indigo border hover:bg-bow-indigo/10">
              <BookOpen size={32} className="text-bow-indigo" />
              <div>
                <h2 className="font-semibold text-bow-indigo">Login</h2>
                <p className="text-sm text-gray-600">Access your dashboard, profile, and course registration.</p>
              </div>
              <ArrowRight size={22} className="ml-auto text-bow-indigo" />
            </Card>
          </Link>
        </div>
      </header>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">SD Department Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programData.map(program => (
            <ProgramCard key={program.code} program={program} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseData.slice(0, 4).map(course => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>
      </section>
    </section>
  );
}