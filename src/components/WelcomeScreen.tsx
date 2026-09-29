import React from 'react';
import { COMMON_ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-between pb-12 w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-6 pb-12 flex flex-col items-center justify-center px-5 overflow-hidden">
        {/* Marigold Decorative Divider */}
        <div className="absolute top-2 left-0 w-full marigold-divider opacity-50"></div>

        {/* Floating Milk Pail Hero Element */}
        <div className="z-10 text-center animate-float mt-4">
          <div className="relative w-60 h-60 sm:w-64 sm:h-64 mx-auto mb-6 bg-white dark:bg-[#141b27] rounded-full shadow-[0_12px_40px_rgba(0,46,93,0.16)] flex items-center justify-center border-8 border-[#feb71a] p-4 transition-transform">
            <img
              src={COMMON_ASSETS.milkPailHero}
              alt="Traditional Indian brass milk pail with fresh pure milk and marigold petals"
              className="w-full h-full object-contain rounded-full"
            />
            {/* Subtle Watermark */}
            <span
              className="material-symbols-outlined text-[#feb71a] opacity-20 absolute -bottom-3 right-4 text-[70px] pointer-events-none select-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              water_drop
            </span>
          </div>
        </div>
      </section>

      {/* Content Welcome Card */}
      <section className="w-full max-w-lg px-5 -mt-8 z-20">
        <div className="glass-card p-7 sm:p-8 rounded-[32px] shadow-xl text-center space-y-6 relative overflow-hidden border border-white/60 dark:border-white/10">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#001938] dark:text-white tracking-tight">
              Welcome
            </h2>
            <p className="text-[#43474f] dark:text-[#a5acba] text-base leading-relaxed">
              Fresh milk delivered to your doorstep.
            </p>
          </div>

          {/* Decorative Pattern Divider */}
          <div className="flex justify-center items-center gap-2">
            <div className="h-[2px] w-10 bg-[#feb71a]"></div>
            <span className="material-symbols-outlined text-[#7d5700] dark:text-[#feb71a] text-sm">
              eco
            </span>
            <div className="h-[2px] w-10 bg-[#feb71a]"></div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {/* Get Started Button */}
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] font-bold py-3.5 px-6 rounded-2xl shadow-lg active:scale-98 transition-all text-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>

            {/* Login Link */}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#001938] dark:text-[#feb71a] font-bold py-2 hover:underline active:opacity-70 transition-opacity text-base cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Clay Pot Watermark Element */}
          <span
            className="material-symbols-outlined text-[#001938] dark:text-white opacity-5 absolute -bottom-5 -right-5 text-[120px] pointer-events-none select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            soup_kitchen
          </span>
        </div>
      </section>

      {/* Value Propositions (Bento Style) */}
      <section className="w-full max-w-lg px-5 py-8">
        <div className="text-center pb-4">
          <h3 className="font-semibold text-[#001938] dark:text-[#feb71a] uppercase tracking-widest text-xs">
            Why Dudh Sagar?
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Bento Card 1: Purity First */}
          <div className="bg-[#f4f3f8] dark:bg-[#1a2332] p-4 rounded-3xl border border-[#c3c6d0]/30 dark:border-white/10 flex flex-col gap-2.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-[#002e5d] text-[#7697cc] rounded-xl flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <h4 className="font-semibold text-base text-[#001938] dark:text-white">
              Purity First
            </h4>
            <p className="text-xs sm:text-sm text-[#43474f] dark:text-[#a5acba] leading-snug">
              Untouched by hand, 100% natural.
            </p>
          </div>

          {/* Bento Card 2: On Time */}
          <div className="bg-[#ffdeaa] dark:bg-[#3d2c14] p-4 rounded-3xl border border-[#feb71a] flex flex-col gap-2.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-[#6b4b00] text-[#feb71a] rounded-xl flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <h4 className="font-semibold text-base text-[#271900] dark:text-[#ffdeaa]">
              On Time
            </h4>
            <p className="text-xs sm:text-sm text-[#5f4100] dark:text-[#ffdeaa]/80 leading-snug">
              Before 7 AM, every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-lg px-5 text-center mt-2">
        <div className="marigold-divider mb-4 opacity-40"></div>
        <p className="text-xs text-[#43474f] dark:text-[#a5acba] tracking-wider font-medium">
          © 2026 Dudh Sagar Dairy Pvt Ltd · Pure Heritage
        </p>
      </footer>
    </div>
  );
};
