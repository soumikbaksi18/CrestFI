import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useAllTokenBalances, useStAVAXInfo, useUSDCEInfo } from '@/hooks/contracts/useTokens';
import { useSYBalance } from '@/hooks/contracts/useStaking';
import { formatTokenAmount, formatBasisPoints } from '@/lib/viem/utils';

// Design System Colors
const colors = {
  primary: '#F5F02C', // Yellow
  secondary: '#FF9450', // Orange
  dark: '#000000', // Black
  light: '#FFFFFF', // White
};

// CoinGecko token images
const tokenImages = {
  AVAX: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  stAVAX: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', // Using AVAX image for stAVAX
  USDC: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  USDCe: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png', // Using USDC image for USDC.e
  PT: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', // Using AVAX for PT
  YT: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', // Using AVAX for YT
  SY: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', // Using AVAX for SY
};

const BalanceCards: React.FC = () => {
  const { walletAddress } = useWallet();
  
  // Real contract data hooks
  const { data: balances, isLoading, error } = useAllTokenBalances();
  const { data: stAVAXInfo } = useStAVAXInfo();
  const { data: usdceInfo } = useUSDCEInfo();
  const { data: syBalance, isLoading: syLoading } = useSYBalance();

  // Get APY data from contracts or use fallback values
  const getAPYData = () => {
    return {
      stAVAX: (stAVAXInfo?.yieldRateBps && typeof stAVAXInfo.yieldRateBps === 'bigint') 
        ? parseFloat(formatBasisPoints(stAVAXInfo.yieldRateBps).replace('%', '')) / 100
        : 0.08, // 8.00% fallback
      USDCe: (usdceInfo?.yieldRateBps && typeof usdceInfo.yieldRateBps === 'bigint')
        ? parseFloat(formatBasisPoints(usdceInfo.yieldRateBps).replace('%', '')) / 100
        : 0.05, // 5.00% fallback
      PT: 0,        // No APY
      YT: 0         // No APY
    };
  };

  const apyData = getAPYData();

  const formatBalance = (balance: any) => {
    if (!balance || !walletAddress) return '0.0000';
    if (typeof balance === 'bigint') {
      return formatTokenAmount(balance, 18, 4);
    }
    return '0.0000';
  };

  const formatAPY = (apy: number) => {
    return (apy * 100).toFixed(2);
  };

  const cards = [
    {
      id: 'staked-tokens',
      title: 'Staked Tokens',
      subtitle: 'stAVAX + USDC.e Portfolio',
      balances: {
        stAVAX: typeof balances?.stAVAX === 'bigint' ? balances.stAVAX : BigInt(0),
        USDCe: typeof balances?.usdce === 'bigint' ? balances.usdce : BigInt(0)
      },
      apy: {
        stAVAX: apyData.stAVAX,
        USDCe: apyData.USDCe
      },
      color: 'primary',
      testId: 'card-staked-tokens',
      isMultiToken: true,
      type: 'staked'
    },
    {
      id: 'yield-tokenization',
      title: 'Yield Tokenization',
      subtitle: 'PT + YT + SY Portfolio',
      balances: {
        SY: typeof syBalance === 'bigint' ? syBalance : BigInt(0),
        PT: typeof balances?.ptToken === 'bigint' ? balances.ptToken : BigInt(0),
        YT: typeof balances?.ytToken === 'bigint' ? balances.ytToken : BigInt(0)
      },
      color: 'secondary',
      testId: 'card-yield-tokenization',
      isMultiToken: true,
      type: 'yield'
    },
    {
      id: 'portfolio-value',
      title: 'Portfolio Value',
      subtitle: 'Total Portfolio Overview',
      totalValue: 'Coming Soon',
      color: 'light',
      testId: 'card-portfolio-value',
      isPortfolio: true,
      type: 'portfolio'
    }
  ];

  const getColorStyles = (color: string) => {
    const colorMap = {
      primary: {
        backgroundColor: `${colors.primary}20`,
        borderColor: `${colors.primary}50`,
        color: colors.primary
      },
      secondary: {
        backgroundColor: `${colors.secondary}20`,
        borderColor: `${colors.secondary}50`,
        color: colors.secondary
      },
      light: {
        backgroundColor: `${colors.light}20`,
        borderColor: `${colors.light}50`,
        color: colors.light
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  if (isLoading || syLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl animate-pulse">
            <div className="h-20 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
        <div className="text-center text-white/60">
          <p>Error loading balances: {typeof error === 'string' ? error : error?.message || 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div 
          key={card.id}
          data-testid={card.testId}
          className="glass p-6 rounded-2xl bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-200"
        >
          {/* Header with title */}
          <div className="flex items-center space-x-2 mb-4">
            <div 
              className="p-2 rounded-lg border"
              style={getColorStyles(card.color)}
            >
              <svg className="w-4 h-4" style={{ color: 'currentColor' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold" style={{ color: colors.light }}>{card.title}</h3>
          </div>

          {/* Token Balances */}
          {card.type === 'staked' && card.balances ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-medium" style={{ color: colors.light }}>
                    {formatBalance(card.balances.stAVAX)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <img 
                    src={tokenImages.stAVAX} 
                    alt="stAVAX" 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGNUYwMkMiLz4KPHN2Zz4K';
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: colors.light }}>stAVAX</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-medium" style={{ color: colors.light }}>
                    {formatBalance(card.balances.USDCe)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <img 
                    src={tokenImages.USDCe} 
                    alt="USDC.e" 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMyNzYzRkYiLz4KPHN2Zz4K';
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: colors.light }}>USDC.e</span>
                </div>
              </div>

              {/* APY Badge */}
              {card.apy && formatAPY(card.apy.stAVAX) !== '0.00' && (
                <div 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                >
                  +{formatAPY(card.apy.stAVAX)}% APY
                </div>
              )}
            </div>
          ) : card.type === 'yield' && card.balances ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-medium" style={{ color: colors.light }}>
                    {formatBalance(card.balances.PT)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <img 
                    src={tokenImages.PT} 
                    alt="PT" 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRjk0NTAiLz4KPHN2Zz4K';
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: colors.light }}>PT</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-medium" style={{ color: colors.light }}>
                    {formatBalance(card.balances.YT)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <img 
                    src={tokenImages.YT} 
                    alt="YT" 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRjk0NTAiLz4KPHN2Zz4K';
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: colors.light }}>YT</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg font-medium" style={{ color: colors.light }}>
                    {formatBalance(card.balances.SY)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <img 
                    src={tokenImages.SY} 
                    alt="SY" 
                    className="w-5 h-5 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRjk0NTAiLz4KPHN2Zz4K';
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: colors.light }}>SY</span>
                </div>
              </div>
            </div>
          ) : card.type === 'portfolio' ? (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xl font-medium" style={{ color: colors.light }}>
                    {card.totalValue}
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-2 py-1 rounded-full bg-white/10">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: colors.light }}></div>
                  <span className="text-xs font-medium" style={{ color: colors.light }}>USD</span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Action Button - Only show for staked and yield cards */}
          {card.type !== 'portfolio' && (
            <button 
              className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-opacity-90"
              style={{
                backgroundColor: colors.primary,
                color: colors.dark
              }}
            >
              {card.type === 'staked' ? 'Manage Staking' : 'Manage Yield'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BalanceCards; 