import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Target } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white/80 glass hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/20">
            7D
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white/80 glass hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/20">
            30D
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white/80 glass hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/20">
            1Y
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-400/20 rounded-xl border border-blue-400/30">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Total Return</p>
              <p className="text-2xl font-bold text-white">0.00%</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-400/20 rounded-xl border border-green-400/30">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Sharpe Ratio</p>
              <p className="text-2xl font-bold text-white">0.00</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-400/20 rounded-xl border border-purple-400/30">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Volatility</p>
              <p className="text-2xl font-bold text-white">0.00%</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-400/20 rounded-xl border border-orange-400/30">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white/70">Max Drawdown</p>
              <p className="text-2xl font-bold text-white">0.00%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Over Time</h3>
        <div className="text-center py-16 text-white/50">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p>Performance chart will be displayed here</p>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
          <div className="text-center py-8 text-white/50">
            <PieChart className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p>Asset allocation chart will be displayed here</p>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Analysis</h3>
          <div className="text-center py-8 text-white/50">
            <Target className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p>Risk analysis will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass rounded-xl border border-white/10">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Transaction History</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-white/50">
            <Activity className="w-16 h-16 mx-auto mb-4 text-white/30" />
            <p>No transactions found</p>
            <p className="text-sm mt-2 text-white/40">Connect your wallet to view transaction history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 