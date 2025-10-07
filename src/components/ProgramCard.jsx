import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { GraduationCap } from 'lucide-react'

export function ProgramCard({ program }) {
  return (
    <Link to={`/program/${program.code}`} className="block group">
      <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-bow-indigo/10 rounded-xl group-hover:border-bow-indigo/30 group-hover:bg-bow-indigo/3 h-full flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <GraduationCap size={24} className="text-bow-indigo mt-1 flex-shrink-0 lg:size-26" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-bow-indigo text-lg leading-tight line-clamp-2 group-hover:text-bow-indigo/80 transition-colors">
              {program.name}
            </h3>
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-bow-indigo/10 text-bow-indigo rounded-full font-medium">
              {program.type}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {program.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Term:</span>
            <span className="font-medium text-bow-indigo">{program.term}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium">{program.startDate} - {program.endDate}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-4 pt-4">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-gray-500 block">Domestic:</span>
              <span className="font-bold text-bow-indigo">{program.fees.domestic}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block">International:</span>
              <span className="font-bold text-bow-indigo">{program.fees.international}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}