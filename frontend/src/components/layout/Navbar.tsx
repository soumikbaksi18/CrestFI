import React from 'react';
import { Bell, Search, User, Wallet } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

const Navbar: React.FC = () => {
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="glass border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tokens, protocols..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 w-80 text-white placeholder-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-white/60 hover:text-white transition-colors glass-hover rounded-lg">
            <Bell className="w-5 h-5" />
          </button>

          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 glass px-3 py-2 rounded-lg border border-white/20">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">
                  {formatAddress(walletAddress || '')}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 text-sm font-medium text-white/80 glass hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/20"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          )}

          <button className="p-2 text-white/60 hover:text-white transition-colors glass-hover rounded-lg">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 