import { Card } from './ui/Card'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 mt-12">
      <Card className="p-8 flex flex-col items-center text-center">
        <AlertTriangle size={40} className="mb-4 text-yellow-600" />
        <h2 className="text-xl font-bold text-bow-indigo mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-4">Sorry, the page you requested does not exist.</p>
        <Link to="/" className="text-bow-indigo hover:underline font-semibold">Back to Home</Link>
      </Card>
    </section>
  );
}