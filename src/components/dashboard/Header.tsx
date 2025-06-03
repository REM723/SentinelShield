import React, { useState, useEffect } from 'react';
import { Bell, Shield, Menu, X, User, LogOut } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [time, setTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between border-b border-gray-700 z-20">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden mr-4 p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        
        <div className="flex items-center">
          <Shield className="h-7 w-7 text-blue-400 mr-2" />
          <h1 className="text-xl font-bold tracking-wider">SentinelShield</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-mono text-blue-300">{formatTime(time)}</span>
          <span className="text-xs text-gray-400">{formatDate(time)}</span>
        </div>
        
        <div className="relative">
          <button 
            className="relative p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center rounded-full hover:bg-gray-700 transition-colors p-1"
            aria-label="User menu"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
              AS
            </div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <a 
                  href="#profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <User size={16} className="mr-2" />
                  <span>Profile</span>
                </a>
                <a 
                  href="#logout" 
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Sign out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;