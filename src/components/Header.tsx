import React from 'react';
import { ScreenType, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenMenu: () => void;
  userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenMenu,
  userProfile
}) => {
  // Title text depending on screen
  const getTitle = () => {
    switch (currentScreen) {
      case 'history':
        return 'History';
      case 'cart':
        return 'Daily Entry';
      case 'settings':
        return 'Settings';
      default:
        return 'Dudh Sagar';
    }
  };

  const isDashboard = currentScreen === 'home';

  return (
    <header className="bg-[#001938] text-white shadow-md fixed top-0 w-full z-40 h-16 flex justify-between items-center px-4 md:px-6 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="p-1.5 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-transform flex items-center justify-center"
          title="Open Menu"
          aria-label="Open Navigation Menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <button
          onClick={() => onNavigate(isDashboard ? 'welcome' : 'home')}
          className="text-left group"
        >
          <h1 className="font-serif text-2xl md:text-2xl font-bold text-[#feb71a] tracking-tight group-hover:opacity-90 transition-opacity">
            {getTitle()}
          </h1>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* On Dashboard, display the partner title */}
        {isDashboard && (
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm text-white leading-tight">
              {userProfile.name}
            </p>
            <p className="text-[11px] font-bold tracking-wider uppercase text-[#feb71a]">
              {userProfile.role}
            </p>
          </div>
        )}

        <button
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 rounded-full border-2 border-[#feb71a] overflow-hidden active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-[#feb71a]"
          title="Profile & Settings"
        >
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if network error
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </button>
      </div>
    </header>
  );
};
