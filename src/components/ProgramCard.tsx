import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { GraduationCap } from 'lucide-react'
import { Program } from '../data/types'

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link to={`/program/${program.code}`} className="block">
      <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all border border-bow-indigo/10 rounded-2xl flex flex-col gap-2 hover:bg-bow-indigo/5">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap size={28} className="text-bow-indigo" />
          <span className="font-semibold text-bow-indigo">{program.name}</span>
          <span className="text-xs ml-auto px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded">{program.type}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{program.description}</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <span>Term: <b>{program.term}</b></span>
          <span>Start: <b>{program.startDate}</b></span>
          <span>End: <b>{program.endDate}</b></span>
        </div>
        <div className="flex flex-row gap-6 mt-2 text-sm">
          <span className="text-bow-indigo font-bold">Domestic: {program.fees.domestic}</span>
          <span className="text-bow-indigo font-bold">International: {program.fees.international}</span>
        </div>
      </Card>
    </Link>
  );
}