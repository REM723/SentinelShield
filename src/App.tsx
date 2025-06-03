import React, { useState } from 'react';
import Header from './components/dashboard/Header';
import Sidebar from './components/dashboard/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="lg:ml-64 p-4 md:p-6 pt-20">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab !== 'dashboard' && (
          <div className="flex items-center justify-center h-64 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p className="text-gray-400">This section is under development</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;