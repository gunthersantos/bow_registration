import { Link, useParams } from 'react-router-dom'
import { programData } from '../data/demo'
import { Card } from './ui/Card'
import { ArrowLeft, GraduationCap } from 'lucide-react'

export function ProgramDetails() {
  const { code } = useParams();
  const program = programData.find(p => p.code === code);

  if (!program) {
    return (
      <section className="max-w-2xl mx-auto px-4 mt-12">
        <Card className="p-8 flex flex-col items-center text-center">
          <GraduationCap size={40} className="mb-4 text-bow-indigo" />
          <h2 className="text-xl font-bold text-bow-indigo mb-2">Program Not Found</h2>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find this program. Please check the code or browse available programs.</p>
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
          <GraduationCap size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">
            {program.name} <span className="text-base font-normal text-gray-600">({program.type})</span>
          </h2>
        </div>
        <p className="text-gray-700 mb-3">{program.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold text-bow-indigo">Term:</span> {program.term}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Program Code:</span> {program.code}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Start Date:</span> {program.startDate}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">End Date:</span> {program.endDate}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Fees (Domestic):</span> {program.fees.domestic}
          </div>
          <div>
            <span className="font-semibold text-bow-indigo">Fees (International):</span> {program.fees.international}
          </div>
        </div>
        <Link to="/" className="text-bow-indigo hover:underline flex items-center gap-1 mt-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </Card>
    </section>
  );
}