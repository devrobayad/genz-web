import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  ShoppingBag, 
  HelpCircle, 
  User, 
  Settings, 
  Menu, 
  X, 
  Share2, 
  FileText, 
  UserCheck, 
  Sparkles,
  Swords,
  Award,
  Shield
} from 'lucide-react';
import { HeaderConfig } from '../types';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUserUid: string | null;
  onLogout: () => void;
  headerConfig: HeaderConfig;
}

export default function Navigation({ 
  currentTab, 
  setCurrentTab, 
  currentUserUid, 
  onLogout,
  headerConfig
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLogoIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="h-5 w-5 text-white" />;
      case 'Swords':
        return <Swords className="h-5 w-5 text-white" />;
      case 'Award':
        return <Award className="h-5 w-5 text-white" />;
      case 'Shield':
        return <Shield className="h-5 w-5 text-white" />;
      case 'Users':
        return <Users className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  const dynamicItems = headerConfig?.navItems || [];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/80 border-b border-orange-500/30 backdrop-blur-md shadow-xl" id="b64dc-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="flex items-center gap-3">
              {headerConfig?.logoImg ? (
                <img 
                  src={headerConfig.logoImg} 
                  alt={headerConfig?.logoText || "Logo"} 
                  className="h-10 w-auto object-contain max-w-[180px] rounded" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  {headerConfig?.logoIcon !== 'None' && (
                    <div className="bg-orange-600 p-2 rounded-lg shadow-lg shadow-orange-500/20 flex items-center justify-center">
                      {getLogoIcon(headerConfig?.logoIcon || 'Trophy')}
                    </div>
                  )}
                  <div>
                    <span className="font-extrabold text-lg tracking-tight text-orange-500 font-sans block leading-tight">
                      {headerConfig?.logoText || 'BD 64 DISTRICT'}
                    </span>
                    {headerConfig?.logoSubtitle && (
                      <span className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 font-semibold font-mono block">
                        {headerConfig.logoSubtitle}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation Menu Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {dynamicItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20 shadow-inner' 
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">

            {currentUserUid ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="nav-dashboard-btn"
                  onClick={() => setCurrentTab('user-panel')}
                  className={`flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold rounded-lg hover:brightness-110 shadow-lg shadow-orange-500/10 transition-all ${
                    currentTab === 'user-panel' ? 'ring-2 ring-orange-400' : ''
                  }`}
                >
                  <span>Profile</span>
                </button>
                <button 
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-red-900/40 hover:text-red-400 rounded-lg text-xs font-bold text-zinc-400 border border-zinc-700 transition"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              headerConfig?.showActionButton && (
                <button
                  id="nav-register-btn"
                  onClick={() => setCurrentTab(headerConfig.actionButtonLink || 'registration')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black rounded-lg shadow-lg shadow-orange-600/20 transition-all transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  {headerConfig.actionButtonText || 'Register'}
                </button>
              )
            )}

            {/* Admin Control Switcher */}
            <button
              id="nav-admin-btn"
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                currentTab === 'admin'
                  ? 'bg-orange-950/50 border-orange-500 text-orange-400 ring-2 ring-orange-500/25'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-orange-500 hover:border-orange-500'
              }`}
            >
              <span>Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Admin Quick Entry */}
            <button
              id="nav-mobile-admin-btn"
              onClick={() => setCurrentTab('admin')}
              className={`px-2 py-1 rounded-lg border text-xs font-bold ${
                currentTab === 'admin' ? 'bg-orange-950/50 border-orange-500 text-orange-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              Admin
            </button>

            <button
              id="nav-mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-805 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-2 pt-2 pb-4 space-y-1 shadow-2xl transition-all duration-300">
          {dynamicItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive 
                    ? 'bg-orange-600/10 text-orange-500 border-l-4 border-orange-500' 
                    : 'text-zinc-300 hover:bg-zinc-800/60'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-4 pb-2 border-t border-zinc-800 mt-4 px-4 space-y-3">

            {currentUserUid ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCurrentTab('user-panel');
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-sm rounded-xl"
                >
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 bg-zinc-800 text-red-400 border border-zinc-700/55 font-bold text-sm rounded-xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              headerConfig?.showActionButton && (
                <button
                  onClick={() => {
                    setCurrentTab(headerConfig.actionButtonLink || 'registration');
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-orange-600 text-white font-extrabold text-center rounded-xl shadow-lg border-b-2 border-orange-800"
                >
                  {headerConfig.actionButtonText || 'Register'}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Inline fallback for missing icon to keep code compact and robust
function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
