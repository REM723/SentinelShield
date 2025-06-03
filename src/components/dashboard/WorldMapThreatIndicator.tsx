import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { generateRandomAttacks } from '../../data/mock-data';

interface RegionAttack {
  region: string;
  attacks: number;
  type: string;
}

const WorldMapThreatIndicator: React.FC = () => {
  const [attackData, setAttackData] = useState<RegionAttack[]>([]);
  
  useEffect(() => {
    setAttackData(generateRandomAttacks());
  }, []);
  
  const refreshData = () => {
    setAttackData(generateRandomAttacks());
  };
  
  // Find max attacks for scaling
  const maxAttacks = Math.max(...attackData.map(d => d.attacks));
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Global Threat Activity</h3>
        <button 
          onClick={refreshData}
          className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs"
        >
          Refresh
        </button>
      </div>
      
      <div className="flex items-center justify-center mb-4 h-48 relative">
        <Globe className="w-full h-full text-blue-500/20" />
        
        {/* Attack indicators */}
        <div className="absolute inset-0">
          {/* North America */}
          <div className="absolute left-[20%] top-[30%]">
            <ThreatIndicator
              data={attackData.find(d => d.region === 'North America')}
              maxAttacks={maxAttacks}
            />
          </div>
          
          {/* Europe */}
          <div className="absolute left-[45%] top-[25%]">
            <ThreatIndicator
              data={attackData.find(d => d.region === 'Europe')}
              maxAttacks={maxAttacks}
            />
          </div>
          
          {/* Asia Pacific */}
          <div className="absolute left-[70%] top-[35%]">
            <ThreatIndicator
              data={attackData.find(d => d.region === 'Asia Pacific')}
              maxAttacks={maxAttacks}
            />
          </div>
          
          {/* Latin America */}
          <div className="absolute left-[30%] top-[60%]">
            <ThreatIndicator
              data={attackData.find(d => d.region === 'Latin America')}
              maxAttacks={maxAttacks}
            />
          </div>
          
          {/* Middle East */}
          <div className="absolute left-[55%] top-[45%]">
            <ThreatIndicator
              data={attackData.find(d => d.region === 'Middle East')}
              maxAttacks={maxAttacks}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mt-6">
        {attackData.map((region) => (
          <div key={region.region} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="h-3 w-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: getAttackColor(region.type),
                  boxShadow: `0 0 8px ${getAttackColor(region.type)}` 
                }}
              ></div>
              <span className="text-sm text-gray-300">{region.region}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-white mr-2">{region.attacks}</span>
              <span className="text-xs text-gray-400">{region.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ThreatIndicatorProps {
  data?: RegionAttack;
  maxAttacks: number;
}

const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({ data, maxAttacks }) => {
  if (!data) return null;
  
  // Calculate size based on attack volume
  const size = Math.max(20, Math.min(50, (data.attacks / maxAttacks) * 50));
  
  return (
    <div 
      className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: `${getAttackColor(data.type)}30`,
        boxShadow: `0 0 ${size}px ${getAttackColor(data.type)}`,
        animation: 'pulse 2s infinite'
      }}
    >
      <div 
        className="absolute inset-0 rounded-full m-auto"
        style={{ 
          width: `${size * 0.5}px`, 
          height: `${size * 0.5}px`,
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundColor: getAttackColor(data.type),
          opacity: 0.8
        }}
      ></div>
    </div>
  );
};

const getAttackColor = (type: string) => {
  switch (type) {
    case 'Ransomware':
      return '#EF4444'; // red
    case 'DDoS':
      return '#F59E0B'; // amber
    case 'Phishing':
      return '#3B82F6'; // blue
    case 'SQL Injection':
      return '#8B5CF6'; // purple
    case 'XSS':
      return '#EC4899'; // pink
    case 'Zero-day':
      return '#F43F5E'; // rose
    case 'Insider Threat':
      return '#10B981'; // emerald
    default:
      return '#6B7280'; // gray
  }
};

export default WorldMapThreatIndicator;