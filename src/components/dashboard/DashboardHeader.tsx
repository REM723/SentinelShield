import React from 'react';
import { Clock, Calendar, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  lastUpdated?: string;
  onRefresh?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  lastUpdated, 
  onRefresh 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {lastUpdated && (
          <div className="flex items-center mt-1 text-sm text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      {onRefresh && (
        <div className="flex items-center mt-3 md:mt-0 space-x-3">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={14} className="mr-1" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          
          <button 
            onClick={onRefresh}
            className="flex items-center py-1.5 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300 transition-colors"
          >
            <RefreshCw size={14} className="mr-1.5" />
            <span>Refresh</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;