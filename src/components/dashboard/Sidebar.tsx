import React from 'react';
import { 
  Home, 
  Shield, 
  AlertTriangle, 
  Zap, 
  BarChart2, 
  Settings, 
  Database, 
  Users, 
  Server, 
  Lock,
  Eye
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
          isActive 
            ? 'bg-blue-900/30 text-blue-400 font-medium' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {isActive && (
          <span className="ml-auto h-2 w-2 rounded-full bg-blue-400"></span>
        )}
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'threats', label: 'Threat Intel', icon: <AlertTriangle size={20} /> },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: <Shield size={20} /> },
    { id: 'ethical-hacking', label: 'Ethical Hacking', icon: <Zap size={20} /> },
    { id: 'monitoring', label: 'Monitoring', icon: <Eye size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> }
  ];

  const bottomNavItems = [
    { id: 'systems', label: 'Systems', icon: <Server size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'data', label: 'Data', icon: <Database size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 pt-16 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="px-2 py-2 rounded-lg bg-gray-800/50">
            <div className="flex items-center">
              <Lock size={16} className="text-green-400 mr-2" />
              <span className="text-sm text-green-400">System Secured</span>
            </div>
            <div className="mt-1">
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Security Score</span>
                <span className="text-xs font-medium text-gray-300">78/100</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="py-4 flex flex-col h-[calc(100%-13rem)]">
          <div className="px-3 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Security</h2>
          </div>
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </ul>
          
          <div className="mt-auto">
            <div className="px-3 mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</h2>
            </div>
            <ul className="space-y-1 px-2">
              {bottomNavItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                />
              ))}
            </ul>
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center px-2 py-2">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">SentinelShield</p>
              <p className="text-xs text-gray-500">v2.4.1 Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;