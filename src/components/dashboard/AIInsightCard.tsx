import React from 'react';
import { Brain, ChevronRight, AlertTriangle } from 'lucide-react';
import { AIInsight } from '../../types';

interface AIInsightCardProps {
  insight: AIInsight;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-700 transition-colors overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-8 w-8 rounded-md bg-blue-900/50 flex items-center justify-center">
              <Brain className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-white">{insight.title}</h3>
              <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                {insight.confidence}% confidence
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-400">{insight.description}</p>
            
            {insight.relatedThreats.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Related Threats:</h4>
                <div className="flex flex-wrap gap-2">
                  {insight.relatedThreats.map((threatId) => (
                    <div 
                      key={threatId}
                      className="flex items-center px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>Threat #{threatId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">{formatTimestamp(insight.timestamp)}</span>
              <a 
                href="#view-insight"
                className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>View details</span>
                <ChevronRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {insight.actionable && (
        <div className="px-4 py-2 bg-blue-900/20 border-t border-blue-900/50 flex items-center justify-between">
          <span className="text-xs font-medium text-blue-400">Actionable Intelligence</span>
          <a 
            href="#take-action"
            className="text-xs text-white bg-blue-600 hover:bg-blue-500 py-1 px-2 rounded transition-colors"
          >
            Take Action
          </a>
        </div>
      )}
    </div>
  );
};

export default AIInsightCard;