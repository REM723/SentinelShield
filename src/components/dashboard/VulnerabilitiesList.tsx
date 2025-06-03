import React from 'react';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Brain,
  Zap,
  Search
} from 'lucide-react';
import { VulnerabilityData } from '../../types';

interface VulnerabilitiesListProps {
  vulnerabilities: VulnerabilityData[];
}

const VulnerabilitiesList: React.FC<VulnerabilitiesListProps> = ({ vulnerabilities }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fixed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'open':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDiscoveryMethodIcon = (method: string) => {
    switch (method) {
      case 'ai':
        return <Brain className="h-4 w-4 text-purple-400" />;
      case 'ethical-hacking':
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'scan':
        return <Search className="h-4 w-4 text-blue-400" />;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDiscoveryMethodLabel = (method: string) => {
    switch (method) {
      case 'ai':
        return 'AI Detection';
      case 'ethical-hacking':
        return 'Ethical Hacking';
      case 'scan':
        return 'Security Scan';
      default:
        return method;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Recent Vulnerabilities</h3>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
            {vulnerabilities.filter(v => v.status === 'open').length} Open
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
            {vulnerabilities.filter(v => v.status === 'in-progress').length} In Progress
          </span>
        </div>
      </div>
      <ul className="divide-y divide-gray-700">
        {vulnerabilities.map((vuln) => (
          <li key={vuln.id} className="p-4 hover:bg-gray-750 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(vuln.severity)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-white">{vuln.name}</h4>
                    {vuln.cveId && (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs font-mono bg-gray-700 text-gray-300">
                        {vuln.cveId}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(vuln.status)}
                    <span className="ml-1 text-xs font-medium text-gray-300">
                      {vuln.status.charAt(0).toUpperCase() + vuln.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {vuln.affectedSystems.map((system) => (
                    <span 
                      key={system} 
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-gray-700 text-gray-300"
                    >
                      {system}
                    </span>
                  ))}
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    {getDiscoveryMethodIcon(vuln.discoveryMethod)}
                    <span className="ml-1">{getDiscoveryMethodLabel(vuln.discoveryMethod)}</span>
                  </div>
                  <span className="mx-2">•</span>
                  <span>{formatDate(vuln.discoveredAt)}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="p-3 border-t border-gray-700">
        <a 
          href="#view-all-vulnerabilities" 
          className="block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all vulnerabilities
        </a>
      </div>
    </div>
  );
};

export default VulnerabilitiesList;