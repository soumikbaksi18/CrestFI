import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { GlobalLayout } from './components/layout';
import { 
  Dashboard, 
  Portfolio, 
  Trading, 
  LPDetails,
  Staking, 
  YieldFarming, 
  Analytics, 
  Settings,
  Faucet
} from './pages';

const AppRouter: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <GlobalLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading/sample-pool" element={<LPDetails />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/yield-farming" element={<YieldFarming />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </GlobalLayout>
      </Router>
    </WalletProvider>
  );
};

export default AppRouter; 