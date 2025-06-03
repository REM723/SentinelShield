import React from 'react';
import { Shield, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ThreatData } from '../../types';

interface ThreatsListProps {
  threats: ThreatData[];
}

const ThreatsList: React.FC<ThreatsListProps> = ({ threats }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
            Active
          </span>
        );
      case 'investigating':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
            Investigating
          </span>
        );
      case 'mitigated':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
            Mitigated
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400">
            {status}
          </span>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Active Threats</h3>
      </div>
      <ul className="divide-y divide-gray-700">
        {threats.map((threat) => (
          <li key={threat.id} className="p-4 hover:bg-gray-750 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(threat.severity)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{threat.type}</h4>
                  {getStatusBadge(threat.status)}
                </div>
                <p className="mt-1 text-sm text-gray-400">{threat.description}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>Source: {threat.source}</span>
                  <span className="mx-2">•</span>
                  <span>{formatTimestamp(threat.timestamp)}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="p-3 border-t border-gray-700">
        <a 
          href="#view-all-threats" 
          className="block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all threats
        </a>
      </div>
    </div>
  );
};

export default ThreatsList;