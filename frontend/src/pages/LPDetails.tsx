import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Zap, 
  Target, 
  Clock,
  DollarSign,
  Percent,
  Activity,
  ExternalLink
} from 'lucide-react';

// Design System Colors
const colors = {
  primary: '#F5F02C', // Yellow
  secondary: '#FF9450', // Orange
  dark: '#000000', // Black
  light: '#FFFFFF', // White
};

// Token Images from CoinGecko
const tokenImages = {
  SAVAX: 'https://assets.coingecko.com/coins/images/24185/small/stAVAX.png',
  AVAX: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  WAVAX: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  USDC: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
};

const LPDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isInvesting, setIsInvesting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock data - simple and clean
  const pool = {
    pool: "3790c3e5-8644-4f6b-8feb-12434d8b99f9",
    project: "benqi-staked-avax",
    chain: "Avalanche",
    symbol: "SAVAX",
    url: null,
    category: null,
    tvlUsd: 412518496.0,
    apy_now: 5.15809,
    apy_net_estimate: 5.161,
    periodReturnPct: 5.2849,
    downsidePeriod: 0.07,
    RAR: 0.755,
    Score: 69.67,
    throughput: 0,
    conf: 0.7125,
    amountStartAVAX: 250.0,
    amountEndAVAX: 263.212222,
    profitAvax: 13.212222,
    horizonMonths: 12,
    why: {
      tvlScore: 0.862,
      ilPenaltyPctPts: 0.0,
      exposureBias: 0.0,
      style: "volatile"
    },
    exposure: "single",
    ilRisk: "no",
    underlyingTokens: [
      "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
    ],
    topsisScore: 0.977311,
    avaxPriceUsd: 23.7,
    profitUsd: 313.13,
    tvlFloorApplied: 100000.0
  };

  const explanation = "The benqi-staked-avax pool, offering SAVAX, aligns well with your aggressive risk tolerance and 12-month investment horizon. With a current net APY of 5.161%, your expected return over this period is approximately 5.28%, translating to a profit of around 13.21 AVAX (about $313.13). This return is primarily driven by staking rewards rather than transaction fees, and since this is a single-asset exposure, you avoid the impermanent loss risks associated with dual pools.";

  // Mock transaction simulation
  const handleInvest = async () => {
    setIsInvesting(true);
    
    // Simulate transaction processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock transaction hash
    const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
    setTxHash(mockTxHash);
    setShowSuccess(true);
    setIsInvesting(false);
  };

  const resetTransaction = () => {
    setTxHash(null);
    setShowSuccess(false);
  };



  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-400';
    if (conf >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/trading')}
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Trading</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <img 
            src={tokenImages[pool.symbol as keyof typeof tokenImages] || tokenImages.USDC} 
            alt={pool.symbol}
            className="w-12 h-12 rounded-full border-2 border-white/20"
            onError={(e) => {
              e.currentTarget.src = tokenImages.USDC;
            }}
          />
          <div className="text-right">
            <h1 className="text-3xl font-bold" style={{ color: colors.light }}>{pool.symbol}</h1>
            <p className="text-white/60">{pool.project} • {pool.chain}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Pool Overview */}
        <div className="xl:col-span-2 space-y-6">
          {/* AI Explanation */}
          {explanation && (
            <div className="glass p-6 rounded-xl border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    borderColor: `${colors.secondary}50`
                  }}
                >
                  <TrendingUp className="w-5 h-5" style={{ color: colors.secondary }} />
                </div>
                <h2 className="text-xl font-semibold text-white">AI Analysis</h2>
              </div>
              <p className="text-white/80 leading-relaxed">{explanation}</p>
            </div>
          )}

          {/* Pool Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: '#10B98120',
                    borderColor: '#10B98150'
                  }}
                >
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Expected Return</p>
                  <p className="text-xl font-bold text-green-400">+{pool.periodReturnPct.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    borderColor: `${colors.primary}50`
                  }}
                >
                  <Percent className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Net APY</p>
                  <p className="text-xl font-bold" style={{ color: colors.primary }}>{pool.apy_net_estimate.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    borderColor: `${colors.secondary}50`
                  }}
                >
                  <DollarSign className="w-5 h-5" style={{ color: colors.secondary }} />
                </div>
                <div>
                  <p className="text-sm text-white/60">Expected Profit</p>
                  <p className="text-xl font-bold" style={{ color: colors.secondary }}>{formatCurrency(pool.profitUsd)}</p>
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: '#3B82F620',
                    borderColor: '#3B82F650'
                  }}
                >
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Pool Score</p>
                  <p className={`text-xl font-bold ${getRiskColor(pool.Score)}`}>{pool.Score.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Pool Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Value Locked</span>
                  <span className="text-white font-medium">{formatCurrency(pool.tvlUsd)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Current APY</span>
                  <span className="text-white font-medium">{pool.apy_now.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Risk-Adjusted Return</span>
                  <span className="text-white font-medium">{pool.RAR.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">TOPSIS Score</span>
                  <span className="text-white font-medium">{(pool.topsisScore * 100).toFixed(2)}%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Investment Amount</span>
                  <span className="text-white font-medium">{pool.amountStartAVAX.toFixed(2)} AVAX</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Expected Value</span>
                  <span className="text-white font-medium">{pool.amountEndAVAX.toFixed(2)} AVAX</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Downside Risk</span>
                  <span className="text-white font-medium">{(pool.downsidePeriod * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Confidence</span>
                  <span className={`font-medium ${getConfidenceColor(pool.conf)}`}>
                    {(pool.conf * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Risk Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Exposure Type</p>
                    <p className="text-white/60 capitalize">{pool.exposure}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Impermanent Loss Risk</p>
                    <p className="text-white/60 capitalize">{pool.ilRisk}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Style</p>
                    <p className="text-white/60 capitalize">{pool.why.style}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">TVL Score</p>
                    <p className="text-white/60">{(pool.why.tvlScore * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">IL Penalty</p>
                    <p className="text-white/60">{pool.why.ilPenaltyPctPts.toFixed(2)}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Time Horizon</p>
                    <p className="text-white/60">{pool.horizonMonths} months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Investment Status */}
            {isInvesting && (
              <div 
                className="glass p-6 rounded-xl border"
                style={{
                  borderColor: `${colors.primary}30`,
                  backgroundColor: `${colors.primary}10`
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-6 h-6 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: `${colors.primary}20`,
                      borderTopColor: colors.primary
                    }}
                  ></div>
                  <h2 className="text-xl font-semibold" style={{ color: colors.primary }}>Processing Investment</h2>
                </div>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span style={{ color: colors.primary }}>Confirming on Avalanche</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pool:</span>
                    <span>{pool.symbol} ({pool.project})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected APY:</span>
                    <span className="text-green-400">{pool.apy_net_estimate.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full animate-pulse" 
                      style={{ 
                        width: '60%',
                        backgroundColor: colors.primary
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-white/60 text-center">
                    This is a demo transaction. In production, this would interact with real smart contracts.
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Right Column - Actions & Info */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            
            {!showSuccess ? (
              <div className="space-y-3">
                <button 
                  onClick={handleInvest}
                  disabled={isInvesting}
                  className="w-full py-3 font-semibold rounded-xl disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: isInvesting ? '#4B5563' : colors.primary,
                    color: isInvesting ? '#9CA3AF' : colors.dark
                  }}
                >
                  {isInvesting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Invest in Pool</span>
                    </>
                  )}
                </button>
                <button 
                  className="w-full py-3 border font-medium rounded-xl transition-all duration-200"
                  style={{
                    borderColor: `${colors.secondary}50`,
                    color: colors.secondary,
                    backgroundColor: `${colors.secondary}10`
                  }}
                >
                  Add to Watchlist
                </button>
                <button className="w-full py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200">
                  Share Pool
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 border rounded-xl" style={{
                  backgroundColor: '#10B98120',
                  borderColor: '#10B98150'
                }}>
                  <div className="text-green-400 text-2xl mb-2">✅</div>
                  <div className="text-green-400 font-medium mb-2">Investment Successful!</div>
                  <div className="text-white/60 text-sm mb-3">
                    You've successfully invested in the {pool.symbol} pool
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-xs font-mono text-white/60 break-all border border-white/10">
                    {txHash}
                  </div>
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <p className="text-xs text-white/40">
                      Demo transaction hash
                    </p>
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </div>
                </div>
                <button 
                  onClick={resetTransaction}
                  className="w-full py-3 font-semibold rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.dark
                  }}
                >
                  Make Another Investment
                </button>
              </div>
            )}
          </div>

          {/* Pool Information */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Pool Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Chain</span>
                <span className="text-white">{pool.chain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Protocol</span>
                <span className="text-white">{pool.project}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Token Symbol</span>
                <span className="text-white">{pool.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Pool ID</span>
                <span className="text-white font-mono text-xs">{pool.pool.slice(0, 8)}...</span>
              </div>
            </div>
          </div>

          {/* Underlying Tokens */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Underlying Tokens</h3>
            <div className="space-y-2">
              {pool.underlyingTokens.map((token: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 glass-hover rounded-lg">
                  <span className="text-white/60 text-sm">Token {index + 1}</span>
                  <span className="text-white font-mono text-xs">{token.slice(0, 10)}...</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Data */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Market Data</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">AVAX Price</span>
                <span className="text-white">${pool.avaxPriceUsd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Throughput</span>
                <span className="text-white">{pool.throughput.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">TVL Floor</span>
                <span className="text-white">{formatCurrency(pool.tvlFloorApplied)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPDetails; 