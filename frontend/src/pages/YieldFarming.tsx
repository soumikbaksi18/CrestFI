import React from 'react';
import { Sprout, TrendingUp, Clock, Zap, Coins } from 'lucide-react';

const YieldFarming: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Yield Farming</h1>
        <button className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-all duration-200 shadow-lg hover:shadow-yellow-400/25">
          Start Farming
        </button>
      </div>

      {/* Yield Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-400/20 rounded-xl border border-green-400/30">
              <Sprout className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Total Value Locked</p>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-400/20 rounded-xl border border-blue-400/30">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Total Rewards</p>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-400/20 rounded-xl border border-yellow-400/30">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">APY</p>
              <p className="text-2xl font-bold text-white">0.00%</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-400/20 rounded-xl border border-orange-400/30">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Harvest Time</p>
              <p className="text-2xl font-bold text-white">0h 0m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Farms */}
      <div className="glass rounded-xl border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Available Farms</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-white/50">
            <Sprout className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p>No yield farming pools available</p>
            <p className="text-sm mt-2 text-white/40">Connect your wallet to view available farms</p>
          </div>
        </div>
      </div>

      {/* Active Positions */}
      <div className="glass rounded-xl border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Active Positions</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-white/50">
            <Coins className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p>No active farming positions</p>
            <p className="text-sm mt-2 text-white/40">Start farming to earn rewards</p>
          </div>
        </div>
      </div>

      {/* Rewards History */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Rewards History</h3>
        <div className="text-center py-8 text-white/50">
          <p>Rewards history will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default YieldFarming; 