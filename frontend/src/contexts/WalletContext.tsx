"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { WalletClient, Address } from 'viem';
import { createWalletClient, custom } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { switchToAvalancheFuji, isSupportedChain } from '@/lib/viem/client';
import { AVALANCHE_FUJI_CHAIN_ID } from '@/lib/contracts/config';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: Address | '';
  walletClient: WalletClient | null;
  isLoading: boolean;
  error: string;
  currentChain: string;
  networkName: string;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addAvalancheFujiNetwork: () => Promise<void>;
  addAvalancheMainnet: () => Promise<void>;
  switchToAvalancheNetwork: () => Promise<void>;
  refreshWalletClient: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

// Helper: pick wallet provider and poly-fill missing addListener/removeListener
function getPatchedWalletProvider() {
  const eth: any = (typeof window !== 'undefined') ? (window as any).ethereum : undefined;
  if (!eth) return null;
  
  let provider: any = null;
  
  // If multiple providers injected, try to find Core wallet first, then MetaMask, then use default
  if (eth.providers && Array.isArray(eth.providers)) {
    provider = eth.providers.find((p: any) => p.isAvalanche) || // Core wallet
               eth.providers.find((p: any) => p.isMetaMask) ||    // MetaMask
               eth.providers[0]; // Fallback to first provider
  } else {
    provider = eth;
  }
  
  if (!provider) return null;
  
  // Enhanced Core wallet compatibility
  if (provider.isAvalanche) {
    console.log('Detected Core wallet, applying compatibility patches');
    
    // Core wallet specific patches
    if (!provider.request) {
      provider.request = provider.send?.bind(provider);
    }
    
    // Ensure proper chain handling
    if (!provider.chainId && provider.networkVersion) {
      provider.chainId = `0x${parseInt(provider.networkVersion).toString(16)}`;
    }
  }
  
  // Polyfill missing methods for Viem compatibility
  if (!provider.addListener && provider.on) provider.addListener = provider.on.bind(provider);
  if (!provider.removeListener && (provider.off || provider.removeListener)) {
    provider.removeListener = (provider.off ?? provider.removeListener).bind(provider);
  }
  
  return provider;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<Address | ''>('');
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentChain, setCurrentChain] = useState<string>('');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Refresh walletClient whenever account / chain changes
  const refreshWalletClient = async (address?: string) => {
    const currentAddress = address || walletAddress;
    if (!currentAddress) {
      setWalletClient(null);
      return;
    }
    
    try {
      const provider = getPatchedWalletProvider();
      if (!provider) {
        console.error('No wallet provider found');
        setWalletClient(null);
        return;
      }
      
      // Check if provider is still connected
      if (provider.isConnected === false) {
        console.warn('Provider is disconnected, attempting to reconnect...');
        setWalletClient(null);
        return;
      }
      
      console.log('Creating wallet client with provider:', provider.constructor?.name || 'Unknown');
      
      // Enhanced wallet client creation with Core wallet specific options
      const clientOptions: any = {
        account: currentAddress as any,
        chain: avalancheFuji,
        transport: custom(provider as any),
      };
      
      // Core wallet specific optimizations
      if (provider.isAvalanche) {
        console.log('Applying Core wallet specific optimizations');
        // Add any Core wallet specific transport options here
        clientOptions.transport = custom(provider as any, {
          retryCount: 3,
          retryDelay: 1000,
        });
      }
      
      const wc = createWalletClient(clientOptions);
      setWalletClient(wc as any);
      console.log('Wallet client created successfully');
      
      // Test the wallet client with a simple call
      try {
        await wc.getChainId();
        console.log('Wallet client test successful');
      } catch (testError) {
        console.warn('Wallet client test failed, but proceeding:', testError);
      }
      
    } catch (error) {
      console.error('Error creating wallet client:', error);
      setWalletClient(null);
    }
  };

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkConnection();
    checkCurrentChain();
  }, []);

  // Refresh wallet client when address changes
  useEffect(() => {
    if (walletAddress && isConnected) {
      refreshWalletClient();
    }
  }, [walletAddress, isConnected]);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0] as Address);
          refreshWalletClient(accounts[0] as Address);
        }
      } catch (err) {
        console.error('Error checking connection:', err);
      }
    }
  };

  const checkCurrentChain = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const numericChainId = parseInt(chainId, 16);
        setCurrentChain(chainId);
        setIsCorrectNetwork(isSupportedChain(numericChainId));
        return chainId;
      } catch (err) {
        console.error('Error checking chain:', err);
      }
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install it to continue.');
      setIsLoading(false);
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0] as Address);
        
        // Small delay to ensure provider is ready
        setTimeout(() => {
          refreshWalletClient(accounts[0] as Address);
        }, 100);
        
        // Switch to Avalanche Fuji network
        await switchToAvalancheNetwork();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Error connecting wallet:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToAvalancheNetwork = async () => {
    try {
      const success = await switchToAvalancheFuji();
      if (success) {
        setCurrentChain(`0x${AVALANCHE_FUJI_CHAIN_ID.toString(16)}`);
        setIsCorrectNetwork(true);
        refreshWalletClient();
      } else {
        setError('Failed to switch to Avalanche Fuji Testnet. Please switch manually in MetaMask.');
      }
    } catch (error: any) {
      console.error('Error switching to Avalanche network:', error);
      setError('Failed to switch to Avalanche network. Please add it manually in MetaMask.');
    }
  };

  const addAvalancheFujiNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xa869', // Fuji Testnet
            chainName: 'Avalanche Fuji Testnet',
            rpcUrls: [
              'https://api.avax-test.network/ext/bc/C/rpc',
              'https://avalanche-fuji-c-chain-rpc.publicnode.com',
              'https://rpc.ankr.com/avalanche_fuji'
            ],
            nativeCurrency: {
              name: 'Avalanche',
              symbol: 'AVAX',
              decimals: 18
            },
            blockExplorerUrls: ['https://testnet.snowtrace.io/']
          }
        ]
      });
    } catch (addError) {
      console.error('Error adding Avalanche Fuji network:', addError);
      throw addError;
    }
  };

  const addAvalancheMainnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xa86a', // Avalanche Mainnet
            chainName: 'Avalanche Network C-Chain',
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            nativeCurrency: {
              name: 'Avalanche',
              symbol: 'AVAX',
              decimals: 18
            },
            blockExplorerUrls: ['https://snowtrace.io/']
          }
        ]
      });
      setCurrentChain('0xa86a');
    } catch (addError) {
      console.error('Error adding Avalanche Mainnet:', addError);
      throw addError;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setWalletClient(null);
    setError('');
    setCurrentChain('');
    setIsCorrectNetwork(false);
  };

  // Get network name from chain ID
  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case '0xa86a': return 'Avalanche Mainnet';
      case '0xa869': return 'Avalanche Fuji Testnet';
      case '0x1': return 'Ethereum Mainnet';
      case '0x5': return 'Goerli Testnet';
      default: return `Unknown Network (${chainId})`;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else {
          setWalletAddress(accounts[0] as Address);
          refreshWalletClient(accounts[0] as Address);
        }
      };

      const handleChainChanged = (chainId: string) => {
        const numericChainId = parseInt(chainId, 16);
        setCurrentChain(chainId);
        setIsCorrectNetwork(isSupportedChain(numericChainId));
        refreshWalletClient();
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Wallet Context State:', {
      isConnected,
      walletAddress,
      hasWalletClient: !!walletClient,
      isCorrectNetwork,
      currentChain
    });
  }, [isConnected, walletAddress, walletClient, isCorrectNetwork, currentChain]);

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    walletClient,
    isLoading,
    error,
    currentChain,
    networkName: getNetworkName(currentChain),
    isCorrectNetwork,
    connectWallet,
    disconnectWallet,
    addAvalancheFujiNetwork,
    addAvalancheMainnet,
    switchToAvalancheNetwork,
    refreshWalletClient,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 