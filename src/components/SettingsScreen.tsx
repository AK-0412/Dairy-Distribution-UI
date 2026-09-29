import React from 'react';
import { ScreenType, UserProfile } from '../types';

interface SettingsScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onLogout: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenInviteModal: () => void;
  onOpenProfileModal: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  onOpenInviteModal,
  onOpenProfileModal
}) => {
  const toggleTheme = () => {
    const nextTheme = userProfile.theme === 'light' ? 'dark' : 'light';
    onUpdateProfile({ theme: nextTheme });
  };

  const toggleLanguage = () => {
    const langs: ('en' | 'hi' | 'mr')[] = ['en', 'hi', 'mr'];
    const nextIndex = (langs.indexOf(userProfile.language) + 1) % langs.length;
    onUpdateProfile({ language: langs[nextIndex] });
  };

  const getLanguageLabel = () => {
    switch (userProfile.language) {
      case 'hi':
        return 'हिन्दी (Hindi)';
      case 'mr':
        return 'मराठी (Marathi)';
      default:
        return 'English (EN)';
    }
  };

  return (
    <div className="flex-grow flex flex-col pb-32 pt-4 px-4 sm:px-6 max-w-2xl mx-auto w-full">
      {/* Header Section */}
      <section className="mb-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#001938] dark:text-white tracking-tight">
          Settings
        </h2>
        <p className="text-xs sm:text-sm text-[#43474f] dark:text-[#a5acba] mt-0.5">
          Manage your milk deliveries and account preferences
        </p>
      </section>

      {/* Decorative Divider */}
      <div className="marigold-divider mb-5 opacity-40"></div>

      {/* Settings Bento Grid */}
      <div className="grid grid-cols-1 gap-3">
        {/* User Profile Card */}
        <div
          onClick={onOpenProfileModal}
          className="glass-card p-4 sm:p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.06)] relative overflow-hidden active:scale-98 transition-all cursor-pointer hover:shadow-md border border-[#e3e2e7] dark:border-white/10"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#feb71a] rounded-2xl flex items-center justify-center text-[#6b4b00] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">person</span>
            </div>
            <div className="flex-grow">
              <p className="font-bold text-base text-[#001938] dark:text-white">
                User Profile
              </p>
              <p className="text-xs text-[#737780] dark:text-[#a5acba]">
                {userProfile.name} · {userProfile.role}
              </p>
              <p className="text-[11px] text-[#7d5700] dark:text-[#feb71a] mt-0.5 truncate">
                {userProfile.address}
              </p>
            </div>
            <span className="material-symbols-outlined text-[#737780]">
              chevron_right
            </span>
          </div>

          {/* Clay Pot Watermark */}
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-7xl opacity-5 pointer-events-none text-[#001938] dark:text-white">
            soup_kitchen
          </span>
        </div>

        {/* Notifications Card */}
        <div
          onClick={() =>
            onUpdateProfile({ notificationsEnabled: !userProfile.notificationsEnabled })
          }
          className="glass-card p-4 sm:p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.06)] active:scale-98 transition-all cursor-pointer hover:shadow-md border border-[#e3e2e7] dark:border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#002e5d] rounded-2xl flex items-center justify-center text-[#7697cc] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">
                notifications
              </span>
            </div>
            <div>
              <p className="font-bold text-base text-[#001938] dark:text-white">
                Notifications
              </p>
              <p className="text-xs text-[#737780] dark:text-[#a5acba]">
                Alerts for delivery &amp; offers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                userProfile.notificationsEnabled
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {userProfile.notificationsEnabled ? 'ON' : 'OFF'}
            </span>
            <span className="material-symbols-outlined text-[#737780]">
              chevron_right
            </span>
          </div>
        </div>

        {/* Theme Card */}
        <div
          onClick={toggleTheme}
          className="glass-card p-4 sm:p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.06)] active:scale-98 transition-all cursor-pointer hover:shadow-md border border-[#e3e2e7] dark:border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#492500] rounded-2xl flex items-center justify-center text-[#ffb77a] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">
                palette
              </span>
            </div>
            <div>
              <p className="font-bold text-base text-[#001938] dark:text-white">
                Theme
              </p>
              <p className="text-xs text-[#737780] dark:text-[#a5acba]">
                Switch between Light &amp; Dark
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7d5700] dark:text-[#feb71a]">
              {userProfile.theme}
            </span>
            <span className="material-symbols-outlined text-[#737780]">
              chevron_right
            </span>
          </div>
        </div>

        {/* Language Card */}
        <div
          onClick={toggleLanguage}
          className="glass-card p-4 sm:p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.06)] active:scale-98 transition-all cursor-pointer hover:shadow-md border border-[#e3e2e7] dark:border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#7d5700] rounded-2xl flex items-center justify-center text-[#ffdeaa] shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">
                translate
              </span>
            </div>
            <div>
              <p className="font-bold text-base text-[#001938] dark:text-white">
                Language
              </p>
              <p className="text-xs text-[#737780] dark:text-[#a5acba]">
                English, Hindi, Marathi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#001938] dark:text-white">
              {getLanguageLabel()}
            </span>
            <span className="material-symbols-outlined text-[#737780]">
              chevron_right
            </span>
          </div>
        </div>

        {/* Refer & Earn Card (Asymmetric Layout) */}
        <div className="mt-3 p-5 sm:p-6 bg-[#2b1300] dark:bg-[#1a0e05] rounded-[24px] text-white relative overflow-hidden shadow-xl border border-[#ffb77a]/20">
          <div className="relative z-10 max-w-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ffdcc2] mb-1">
              REFER &amp; EARN
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
              Get Free Milk for 3 Days!
            </h3>
            <p className="text-xs text-[#ffdcc2]/80 mb-4 leading-relaxed">
              Invite your neighbors to join Dudh Sagar and earn heritage dairy rewards.
            </p>
            <button
              onClick={onOpenInviteModal}
              className="bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Invite Now</span>
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
          </div>

          <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[160px]">
              auto_awesome
            </span>
          </div>
        </div>

        {/* Logout Button Section */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={onLogout}
            className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Logout</span>
          </button>
          <p className="mt-4 text-[#737780] dark:text-[#a5acba] text-[11px] font-bold uppercase tracking-widest">
            App Version 2.4.1 · Heritage Build
          </p>
        </div>
      </div>
    </div>
  );
};
