import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartItemCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  cartItemCount = 0
}) => {
  // If on welcome or login, bottom nav is suppressed per design guidelines, but can be viewed
  if (currentScreen === 'welcome' || currentScreen === 'login') {
    return null;
  }

  const navItems: { screen: ScreenType; label: string; icon: string }[] = [
    { screen: 'home', label: 'Home', icon: 'home' },
    { screen: 'history', label: 'History', icon: 'menu_book' },
    { screen: 'cart', label: 'Cart', icon: 'shopping_cart' },
    { screen: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-3 py-2.5 bg-white dark:bg-[#141b27] border-t-4 border-[#feb71a] shadow-[0_-4px_16px_rgba(0,46,93,0.12)] transition-colors">
      <div className="w-full max-w-lg mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#feb71a] text-[#6b4b00] rounded-full px-4 py-1 font-bold shadow-sm scale-105'
                  : 'text-[#43474f] dark:text-[#a5acba] hover:text-[#001938] dark:hover:text-white px-3 py-1'
              } active:scale-95`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
                  }}
                >
                  {item.icon}
                </span>

                {item.screen === 'cart' && cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                    {cartItemCount}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-bold tracking-wider uppercase mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
