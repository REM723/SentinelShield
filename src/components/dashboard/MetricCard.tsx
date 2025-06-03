import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { SecurityMetric } from '../../types';

interface MetricCardProps {
  metric: SecurityMetric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = '' }) => {
  const getChangeColor = (trend: string) => {
    if (trend === 'up') {
      // For metrics like "security posture" or "AI detection accuracy", up is good
      if (metric.name.includes('Security') || metric.name.includes('Accuracy') || metric.name.includes('Coverage')) {
        return 'text-green-400';
      }
      // For metrics like "vulnerabilities" or "time to detect", up is bad
      return 'text-red-400';
    } else if (trend === 'down') {
      // For metrics like "security posture" or "AI detection accuracy", down is bad
      if (metric.name.includes('Security') || metric.name.includes('Accuracy') || metric.name.includes('Coverage')) {
        return 'text-red-400';
      }
      // For metrics like "vulnerabilities" or "time to detect", down is good
      return 'text-green-400';
    }
    return 'text-gray-400';
  };

  const getChangeIcon = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUp size={16} />;
    } else if (trend === 'down') {
      return <ArrowDown size={16} />;
    }
    return <Minus size={16} />;
  };

  const formatValue = (value: number) => {
    if (metric.name.includes('Time')) {
      return `${value} hrs`;
    }
    if (value % 1 === 0) {
      return value.toString();
    }
    return value.toFixed(1);
  };

  const getProgressColor = () => {
    const ratio = metric.value / metric.target;
    
    // For metrics where higher is better (like accuracy)
    if (metric.name.includes('Security') || metric.name.includes('Accuracy') || metric.name.includes('Coverage')) {
      if (ratio >= 0.9) return 'from-green-500 to-green-400';
      if (ratio >= 0.7) return 'from-yellow-500 to-yellow-400';
      return 'from-red-500 to-red-400';
    }
    
    // For metrics where lower is better (like vulnerabilities)
    else {
      if (ratio <= 0.5) return 'from-green-500 to-green-400';
      if (ratio <= 0.8) return 'from-yellow-500 to-yellow-400';
      return 'from-red-500 to-red-400';
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    // For metrics where higher is better
    if (metric.name.includes('Security') || metric.name.includes('Accuracy') || metric.name.includes('Coverage')) {
      return Math.min((metric.value / metric.target) * 100, 100);
    } 
    // For metrics where lower is better
    else {
      // Invert the percentage for metrics where lower is better
      const invertedRatio = Math.max(1 - (metric.value / metric.target), 0);
      return invertedRatio * 100;
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-300">{metric.name}</h3>
        <div className={`flex items-center ${getChangeColor(metric.trend)}`}>
          {getChangeIcon(metric.trend)}
          <span className="text-xs ml-1">
            {metric.change > 0 ? '+' : ''}{metric.change}%
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <span className="text-2xl font-bold text-white">{formatValue(metric.value)}</span>
        {metric.name.includes('Time') ? null : (
          <span className="text-xs text-gray-400 ml-1">
            / {metric.target}
          </span>
        )}
      </div>
      
      <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MetricCard;