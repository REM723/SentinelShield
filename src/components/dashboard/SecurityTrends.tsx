import React, { useState, useEffect } from 'react';
import { generateTimeSeriesData } from '../../data/mock-data';

interface DataPoint {
  time: string;
  attacks: number;
  mitigated: number;
  aiDetected: number;
}

const SecurityTrends: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>('24h');
  
  useEffect(() => {
    setData(generateTimeSeriesData());
  }, []);

  const refreshData = () => {
    setData(generateTimeSeriesData());
  };
  
  const ranges = [
    { id: '6h', label: '6h' },
    { id: '12h', label: '12h' },
    { id: '24h', label: '24h' }
  ];

  // Calculate the highest value for scaling
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.attacks, d.mitigated, d.aiDetected))
  ) * 1.2; // Add 20% padding
  
  // Filter data based on selected range
  const filteredData = data.slice(-parseInt(selectedRange.replace('h', '')));
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-medium text-white">Security Events (24h)</h3>
        <div className="flex mt-2 sm:mt-0">
          <div className="flex border border-gray-600 rounded-md overflow-hidden">
            {ranges.map((range) => (
              <button
                key={range.id}
                onClick={() => setSelectedRange(range.id)}
                className={`py-1 px-3 text-xs font-medium ${
                  selectedRange === range.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button 
            onClick={refreshData}
            className="ml-2 px-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs"
          >
            Refresh
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-2">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
          <span className="text-xs text-gray-300">Attacks</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs text-gray-300">Mitigated</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-xs text-gray-300">AI Detected</span>
        </div>
      </div>
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute inset-y-0 left-0 w-8 flex flex-col justify-between text-xs text-gray-500 py-2">
          <div>{maxValue}</div>
          <div>{Math.round(maxValue * 0.75)}</div>
          <div>{Math.round(maxValue * 0.5)}</div>
          <div>{Math.round(maxValue * 0.25)}</div>
          <div>0</div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 left-8 flex flex-col justify-between py-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-gray-700 w-full h-0"></div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="absolute inset-0 left-8 pl-2">
          <div className="relative h-full">
            <svg className="w-full h-full" viewBox={`0 0 ${filteredData.length * 30} 100`} preserveAspectRatio="none">
              {/* Attack line */}
              <path
                d={`M ${filteredData.map((d, i) => `${i * 30} ${100 - (d.attacks / maxValue) * 100}`).join(' L ')}`}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Mitigated line */}
              <path
                d={`M ${filteredData.map((d, i) => `${i * 30} ${100 - (d.mitigated / maxValue) * 100}`).join(' L ')}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* AI Detected line */}
              <path
                d={`M ${filteredData.map((d, i) => `${i * 30} ${100 - (d.aiDetected / maxValue) * 100}`).join(' L ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {filteredData.map((d, i) => (
                <React.Fragment key={i}>
                  <circle
                    cx={i * 30}
                    cy={100 - (d.attacks / maxValue) * 100}
                    r="3"
                    fill="#EF4444"
                  />
                  <circle
                    cx={i * 30}
                    cy={100 - (d.mitigated / maxValue) * 100}
                    r="3"
                    fill="#10B981"
                  />
                  <circle
                    cx={i * 30}
                    cy={100 - (d.aiDetected / maxValue) * 100}
                    r="3"
                    fill="#3B82F6"
                  />
                </React.Fragment>
              ))}
            </svg>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 pt-2">
          {filteredData.map((d, i) => {
            // Only show every nth label to avoid crowding
            if (i % Math.ceil(filteredData.length / 6) === 0 || i === filteredData.length - 1) {
              const time = new Date(d.time);
              return (
                <div key={i} className="text-center" style={{ width: '60px' }}>
                  {time.getHours().toString().padStart(2, '0')}:
                  {time.getMinutes().toString().padStart(2, '0')}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityTrends;