import React from 'react';
import { User, Shield, Bell, Palette, Globe, CreditCard } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Enter display name"
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/50"
              />
            </div>
            <button className="w-full px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-yellow-400/25">
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left p-3 glass-hover border border-white/10 rounded-lg hover:border-yellow-400/30 transition-all duration-200 group">
              <div className="font-medium text-white group-hover:text-yellow-300">Change Password</div>
              <div className="text-sm text-white/60">Update your account password</div>
            </button>
            <button className="w-full text-left p-3 glass-hover border border-white/10 rounded-lg hover:border-yellow-400/30 transition-all duration-200 group">
              <div className="font-medium text-white group-hover:text-yellow-300">Two-Factor Authentication</div>
              <div className="text-sm text-white/60">Enable 2FA for extra security</div>
            </button>
            <button className="w-full text-left p-3 glass-hover border border-white/10 rounded-lg hover:border-yellow-400/30 transition-all duration-200 group">
              <div className="font-medium text-white group-hover:text-yellow-300">Connected Wallets</div>
              <div className="text-sm text-white/60">Manage your connected wallets</div>
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/70">Price Alerts</span>
              <button className="w-12 h-6 bg-white/20 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/70">Transaction Notifications</span>
              <button className="w-12 h-6 bg-white/20 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/70">News & Updates</span>
              <button className="w-12 h-6 bg-white/20 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-orange-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Theme</label>
              <select className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Language</label>
              <select className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Advanced Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="text-left p-3 glass-hover border border-white/10 rounded-lg hover:border-yellow-400/30 transition-all duration-200 group">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-white/60 mr-3 group-hover:text-yellow-400" />
              <div>
                <div className="font-medium text-white group-hover:text-yellow-300">Network Settings</div>
                <div className="text-sm text-white/60">Configure blockchain networks</div>
              </div>
            </div>
          </button>
          <button className="text-left p-3 glass-hover border border-white/10 rounded-lg hover:border-yellow-400/30 transition-all duration-200 group">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-white/60 mr-3 group-hover:text-yellow-400" />
              <div>
                <div className="font-medium text-white group-hover:text-yellow-300">Payment Methods</div>
                <div className="text-sm text-white/60">Manage payment options</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 