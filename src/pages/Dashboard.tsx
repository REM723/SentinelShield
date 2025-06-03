import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import MetricCard from '../components/dashboard/MetricCard';
import ThreatsList from '../components/dashboard/ThreatsList';
import AIInsightCard from '../components/dashboard/AIInsightCard';
import VulnerabilitiesList from '../components/dashboard/VulnerabilitiesList';
import SecurityTrends from '../components/dashboard/SecurityTrends';
import WorldMapThreatIndicator from '../components/dashboard/WorldMapThreatIndicator';
import { mockThreats, mockMetrics, mockVulnerabilities, mockInsights } from '../data/mock-data';

const Dashboard: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  useEffect(() => {
    updateLastUpdated();
  }, []);
  
  const updateLastUpdated = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }));
  };
  
  const handleRefresh = () => {
    // In a real application, this would fetch new data
    updateLastUpdated();
  };
  
  return (
    <div className="pb-12">
      <DashboardHeader 
        title="Security Operations Dashboard" 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />
      
      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <SecurityTrends />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockInsights.slice(0, 2).map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <ThreatsList threats={mockThreats} />
          <WorldMapThreatIndicator />
        </div>
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VulnerabilitiesList vulnerabilities={mockVulnerabilities} />
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="text-lg font-medium text-white mb-4">AI & Ethical Hacking Integration</h3>
          
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-900/30">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-md bg-blue-900/50 flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-white">Penetration Testing Status</h4>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-blue-400">72%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Next scheduled test: March 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-900/30">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-md bg-purple-900/50 flex items-center justify-center">
                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c1.5 0 3 1.5 3 3v3c0 1.5-1.5 3-3 3S9 9.5 9 8V5c0-1.5 1.5-3 3-3Z"></path>
                      <path d="M19 9h-1.5c-1 0-1.75.5-2 1.5-.2 1 .5 2 1.5 2.5l1.5.8c1 .5 1.7 1.5 1.5 2.5-.3 1-1 1.5-2 1.5H16"></path>
                      <path d="M5 9h1.5c1 0 1.75.5 2 1.5.2 1-.5 2-1.5 2.5l-1.5.8c-1 .5-1.7 1.5-1.5 2.5.3 1 1 1.5 2 1.5H8"></path>
                      <path d="M12 22c-1.5 0-3-1.5-3-3v-3c0-1.5 1.5-3 3-3s3 1.5 3 3v3c0 1.5-1.5 3-3 3Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-white">AI Learning Progress</h4>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-purple-400">89%</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Latest model: SentinelShield v2.4 (94.2% accuracy)</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gray-750 border border-gray-700 hover:border-green-700 transition-colors">
                <h4 className="text-sm font-medium text-white mb-1">Threat Intel</h4>
                <p className="text-xs text-gray-400">Blockchain verified: 328 IoCs</p>
                <div className="mt-2">
                  <a 
                    href="#manage-intel"
                    className="text-xs text-green-400 hover:text-green-300 transition-colors"
                  >
                    Manage intel sources
                  </a>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-750 border border-gray-700 hover:border-yellow-700 transition-colors">
                <h4 className="text-sm font-medium text-white mb-1">Pen Testing</h4>
                <p className="text-xs text-gray-400">Tools: Metasploit, Burp Suite</p>
                <div className="mt-2">
                  <a 
                    href="#launch-test"
                    className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Launch new test
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;