import React from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleMobileFrame,
  isDarkMode,
  onToggleDarkMode
}) => {
  const screens: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'welcome', label: 'Welcome', icon: 'waving_hand' },
    { id: 'login', label: 'Login', icon: 'lock' },
    { id: 'home', label: 'Dashboard', icon: 'dashboard' },
    { id: 'cart', label: 'Daily Entry', icon: 'shopping_basket' },
    { id: 'history', label: 'History', icon: 'receipt_long' },
    { id: 'settings', label: 'Settings', icon: 'tune' }
  ];

  return (
    <div className="bg-[#002e5d] text-white border-b border-[#feb71a]/30 px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0 shadow-sm print:hidden">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="font-bold text-[#feb71a] flex items-center gap-1 pr-1 mr-1 border-r border-white/20 whitespace-nowrap">
          <span className="material-symbols-outlined text-[16px]">water_drop</span>
          Dudh Sagar Views:
        </span>

        {screens.map((s) => {
          const active = currentScreen === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScreen(s.id)}
              className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                active
                  ? 'bg-[#feb71a] text-[#001938] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onToggleDarkMode}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Toggle Dark / Light Theme"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
          <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={onToggleMobileFrame}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded font-semibold transition-colors ${
            isMobileFrame
              ? 'bg-[#feb71a]/20 text-[#feb71a] border border-[#feb71a]/40'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Mobile Shell Frame vs Full Responsive View"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isMobileFrame ? 'stay_current_portrait' : 'desktop_windows'}
          </span>
          <span className="hidden sm:inline">{isMobileFrame ? 'Mobile Frame' : 'Full Width'}</span>
        </button>
      </div>
    </div>
  );
};
