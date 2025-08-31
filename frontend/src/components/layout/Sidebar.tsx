import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  Lock, 
  Sprout, 
  BarChart3, 
  Coins,
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    // { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'Trading', href: '/trading', icon: TrendingUp },
    // { name: 'Staking', href: '/staking', icon: Lock },
    { name: 'Yield Farming', href: '/yield-farming', icon: Sprout },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Faucet', href: '/faucet', icon: Coins },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 glass-strong backdrop-blur-sm make">
      <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">DeFi Dashboard</h1>
      </div>
      
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-500/20 text-yellow-300 border-r-2 border-yellow-400 '
                      : 'text-white/70 hover:bg-white/10 hover:text-white '
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 