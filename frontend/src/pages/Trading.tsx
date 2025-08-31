import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Brain, ArrowRight, Target } from 'lucide-react';

// Design System Colors
const colors = {
  primary: '#F5F02C', // Yellow
  secondary: '#FF9450', // Orange
  dark: '#000000', // Black
  light: '#FFFFFF', // White
};

// Token Images from CoinGecko
const tokenImages = {
  AVAX: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  stAVAX: 'https://assets.coingecko.com/coins/images/24185/small/stAVAX.png',
  USDC: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  PT: 'https://via.placeholder.com/32/10B981/FFFFFF?text=PT',
  YT: 'https://via.placeholder.com/32/F59E0B/FFFFFF?text=YT',
  USDCE: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
};

const Trading: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live-markets');

  const liveMarkets = [
    { 
      symbol: 'AVAX/USDC', 
      baseToken: 'AVAX',
      quoteToken: 'USDC',
      price: 25.67, 
      change: 2.34, 
      volume: '12.5M', 
      trend: 'up',
      tvl: '$45.2M'
    },
    { 
      symbol: 'stAVAX/AVAX', 
      baseToken: 'stAVAX',
      quoteToken: 'AVAX',
      price: 1.023, 
      change: -0.45, 
      volume: '8.2M', 
      trend: 'down',
      tvl: '$32.1M'
    },
    { 
      symbol: 'PT/AVAX', 
      baseToken: 'PT',
      quoteToken: 'AVAX',
      price: 0.89, 
      change: 1.67, 
      volume: '3.1M', 
      trend: 'up',
      tvl: '$18.7M'
    },
    { 
      symbol: 'YT/AVAX', 
      baseToken: 'YT',
      quoteToken: 'AVAX',
      price: 0.156, 
      change: -2.12, 
      volume: '1.8M', 
      trend: 'down',
      tvl: '$9.3M'
    },
    { 
      symbol: 'USDCE/AVAX', 
      baseToken: 'USDCE',
      quoteToken: 'AVAX',
      price: 0.039, 
      change: 0.12, 
      volume: '15.7M', 
      trend: 'up',
      tvl: '$67.8M'
    },
  ];

  const aiRecommendations = [
    {
      id: 1,
      protocol: 'Benqi',
      token: 'SAVAX',
      apy: '5.16%',
      profit: '$313.13',
      tvl: '$412.5M',
      score: 70,
      change: '+5.28%',
      risk: 'Low',
      trend: 'up'
    },
    {
      id: 2,
      protocol: 'Aave V3',
      token: 'WAVAX',
      apy: '1.34%',
      profit: '$80.16',
      tvl: '$197.5M',
      score: 45,
      change: '+1.35%',
      risk: 'Medium',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="p-3 rounded-2xl border"
            style={{
              backgroundColor: `${colors.primary}20`,
              borderColor: `${colors.primary}50`
            }}
          >
            <TrendingUp className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.light }}>Trading Hub</h1>
            <p className="text-sm text-white/70">
              Discover AI-powered investment opportunities and trade on live markets
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm" style={{ color: colors.primary }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
          <span className="font-medium">Live Markets Active</span>
        </div>
      </div>

      {/* Main Trading Interface - Equal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations - Left Side */}
        <div className="space-y-6">
          {/* AI Recommendations Panel */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg border"
                style={{
                  backgroundColor: `${colors.secondary}20`,
                  borderColor: `${colors.secondary}50`
                }}
              >
                <Brain className="w-5 h-5" style={{ color: colors.secondary }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
                <p className="text-sm text-white/60">Personalized investment insights</p>
              </div>
            </div>

            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200" style={{
                  backgroundColor: rec.trend === 'up' ? '#10B98110' : '#ffffff05'
                }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={tokenImages[rec.token as keyof typeof tokenImages] || tokenImages.USDC} 
                          alt={rec.token}
                          className="w-6 h-6 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = tokenImages.USDC;
                          }}
                        />
                        <div>
                          <div className="font-semibold text-white text-sm">{rec.token}</div>
                          <div className="text-xs text-white/60">{rec.protocol}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-400">{rec.change}</div>
                      <div className="text-xs text-white/60">12mo</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">APY:</span>
                      <span className="text-white font-medium">{rec.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Profit:</span>
                      <span className="text-green-400 font-medium">{rec.profit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">TVL:</span>
                      <span className="text-white font-medium">{rec.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Score:</span>
                      <span className="text-white font-medium">{rec.score}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      rec.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                      rec.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {rec.risk} Risk
                    </div>
                    <button 
                      onClick={() => window.location.href = '/trading/sample-pool'}
                      className="text-xs font-medium px-3 py-1 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                        border: `1px solid ${colors.primary}50`
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Get More Recommendations */}
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full py-3 mt-4 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.dark
              }}
            >
              <Brain className="w-5 h-5" />
              <span>Get AI Analysis</span>
            </button>
          </div>
        </div>

        {/* Live Markets - Right Side */}
        <div>
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    borderColor: `${colors.primary}50`
                  }}
                >
                  <BarChart3 className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Live Markets</h2>
                  <p className="text-sm text-white/60">Real-time trading pairs</p>
                </div>
              </div>
              <div className="flex space-x-0.5">
                {['live-markets', 'order-book', 'trade-history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab ? colors.primary : 'transparent',
                      color: activeTab === tab ? colors.dark : undefined
                    }}
                  >
                    {tab === 'live-markets' && 'Live Markets'}
             
                    {tab === 'trade-history' && 'Trade History'}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'live-markets' && (
              <div className="space-y-3">
                {liveMarkets.map((market) => (
                  <div key={market.symbol} className="p-4 rounded-xl border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200" style={{
                    backgroundColor: market.trend === 'up' ? '#10B98108' : '#EF444408'
                  }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Token Images */}
                        <div className="flex items-center -space-x-2">
                          <img 
                            src={tokenImages[market.baseToken as keyof typeof tokenImages] || tokenImages.USDC} 
                            alt={market.baseToken}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            onError={(e) => {
                              e.currentTarget.src = tokenImages.USDC;
                            }}
                          />
                          <img 
                            src={tokenImages[market.quoteToken as keyof typeof tokenImages] || tokenImages.USDC} 
                            alt={market.quoteToken}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            onError={(e) => {
                              e.currentTarget.src = tokenImages.USDC;
                            }}
                          />
                        </div>
                        
                        {/* Market Info */}
                        <div>
                          <div className="font-semibold text-white">{market.symbol}</div>
                          <div className="text-sm text-white/60">TVL: {market.tvl}</div>
                        </div>
                      </div>

                      {/* Price and Stats */}
                      <div className="text-right space-y-1">
                        <div className="font-semibold text-white text-lg">${market.price}</div>
                        <div className={`text-sm flex items-center justify-end space-x-1 ${
                          market.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {market.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{market.change > 0 ? '+' : ''}{market.change}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Market Data */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-white/60">Volume 24h</div>
                          <div className="text-white font-medium">{market.volume}</div>
                        </div>
                        <div>
                          <div className="text-white/60">TVL</div>
                          <div className="text-white font-medium">{market.tvl}</div>
                        </div>
                        <div className="text-right">
                          <button 
                            className="text-xs font-medium px-3 py-1 rounded-lg transition-all duration-200"
                            style={{
                              backgroundColor: `${colors.primary}20`,
                              color: colors.primary,
                              border: `1px solid ${colors.primary}50`
                            }}
                          >
                            Trade
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'order-book' && (
              <div className="space-y-4">
                <div className="text-center py-12 text-white/60">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `${colors.primary}10`,
                      borderColor: `${colors.primary}30`
                    }}
                  >
                    <BarChart3 className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                
                  <p className="text-sm">Real-time order book data will be displayed here</p>
                </div>
              </div>
            )}

            {activeTab === 'trade-history' && (
              <div className="space-y-4">
                <div className="text-center py-12 text-white/60">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `${colors.secondary}10`,
                      borderColor: `${colors.secondary}30`
                    }}
                  >
                    <TrendingUp className="w-8 h-8" style={{ color: colors.secondary }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Trade History</h3>
                  <p className="text-sm">Recent trading activity will be displayed here</p>
                </div>
              </div>
            )}

            {/* View All Markets Button */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <button 
                className="w-full py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.secondary,
                  border: `1px solid ${colors.secondary}50`
                }}
              >
                <Target className="w-5 h-5" />
                <span>Explore All Markets</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading; 