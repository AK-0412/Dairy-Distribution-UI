import React, { useState } from 'react';
import { COMMON_ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [mobileNumber, setMobileNumber] = useState('9825478901');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) {
      setToastMessage('Please enter a valid mobile number');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }
    setToastMessage(`Welcome back! Logging in as Aravind Kumar...`);
    setTimeout(() => {
      onLoginSuccess();
    }, 600);
  };

  const handleQuickAccess = (type: 'google' | 'biometric') => {
    if (type === 'google') {
      setToastMessage('Authenticated with Google Account: aravind.partner@dudhsagar.in');
    } else {
      setToastMessage('Biometric fingerprint verified successfully!');
    }
    setTimeout(() => {
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-5 relative overflow-hidden w-full max-w-md mx-auto">
      {/* Decorative Top Garland Header */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 h-28">
        <div className="flex justify-center space-x-[-6px] pt-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-10 h-10 bg-[#feb71a] rounded-full shadow-xs flex items-center justify-center"
                style={{
                  boxShadow: '0 2px 6px rgba(254, 183, 26, 0.4)'
                }}
              >
                <span className="material-symbols-outlined text-[#6b4b00] text-xl">
                  eco
                </span>
              </div>
              <div className="w-0.5 h-6 bg-[#ffdeaa]"></div>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-[#feb71a] shadow-xs"></div>
      </div>

      {/* Main Content Card Container */}
      <div className="relative z-10 w-full pt-10 sm:pt-14">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 bg-[#002e5d] rounded-full flex items-center justify-center shadow-lg animate-float">
              <span
                className="material-symbols-outlined text-[#d5e3ff] text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water_drop
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#feb71a] rounded-full flex items-center justify-center border-2 border-[#fffdf5] dark:border-[#0d131f] shadow-xs">
              <span
                className="material-symbols-outlined text-[#6b4b00] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#001938] dark:text-white tracking-tight">
            Dudh Sagar
          </h1>
          <p className="text-[#43474f] dark:text-[#a5acba] text-sm mt-1">
            Pure Traditions, Delivered Fresh Daily
          </p>
        </div>

        {/* Login / Sign Up Card */}
        <div className="glass-card rounded-[24px] p-6 sm:p-7 border border-[#c3c6d0]/40 dark:border-white/10 shadow-[0_10px_32px_rgba(0,46,93,0.12)] relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none text-[#002e5d] dark:text-white">
            <span className="material-symbols-outlined text-[130px]">soup_kitchen</span>
          </div>

          {/* Tab buttons */}
          <div className="flex space-x-6 mb-6 border-b border-[#e3e2e7] dark:border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`pb-2 text-base font-bold transition-all relative ${
                activeTab === 'login'
                  ? 'text-[#001938] dark:text-[#feb71a]'
                  : 'text-[#43474f] dark:text-[#a5acba] hover:text-[#001938]'
              }`}
            >
              Login
              {activeTab === 'login' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#feb71a] rounded-t-full"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`pb-2 text-base font-medium transition-all relative ${
                activeTab === 'signup'
                  ? 'text-[#001938] dark:text-[#feb71a] font-bold'
                  : 'text-[#43474f] dark:text-[#a5acba] hover:text-[#001938]'
              }`}
            >
              Sign up
              {activeTab === 'signup' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#feb71a] rounded-t-full"></div>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Mobile Number Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#43474f] dark:text-[#a5acba] uppercase tracking-wider block">
                Mobile Number
              </label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#737780] group-focus-within:text-[#001938] dark:group-focus-within:text-[#feb71a] text-xl transition-colors">
                  smartphone
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-11 pr-4 py-3 bg-[#f5f1e9] dark:bg-[#1a2332] border border-transparent focus:border-[#feb71a] rounded-xl text-[#001938] dark:text-white placeholder-[#737780] text-sm font-medium focus:ring-2 focus:ring-[#feb71a]/30 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password / PIN Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#43474f] dark:text-[#a5acba] uppercase tracking-wider">
                  Password / PIN
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setToastMessage('PIN reset SMS has been sent to your registered number.')
                  }
                  className="text-xs font-bold text-[#7d5700] dark:text-[#feb71a] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#737780] group-focus-within:text-[#001938] dark:group-focus-within:text-[#feb71a] text-xl transition-colors">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-[#f5f1e9] dark:bg-[#1a2332] border border-transparent focus:border-[#feb71a] rounded-xl text-[#001938] dark:text-white placeholder-[#737780] text-sm font-medium focus:ring-2 focus:ring-[#feb71a]/30 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737780] hover:text-[#001938] dark:hover:text-white"
                  title="Toggle visibility"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center space-x-3 cursor-pointer py-1 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded-md border-2 border-[#c3c6d0] text-[#feb71a] focus:ring-[#feb71a] accent-[#feb71a] cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium text-[#1a1c1f] dark:text-[#f1f0f5]">
                Remember Me
              </span>
            </label>

            {/* Login Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] font-bold text-base py-3.5 rounded-xl shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{activeTab === 'login' ? 'Login' : 'Create Account'}</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Quick Access Divider */}
          <div className="mt-6 flex items-center justify-center space-x-3">
            <div className="h-px flex-1 bg-[#c3c6d0]/40"></div>
            <span className="text-[11px] font-bold text-[#737780] uppercase tracking-wider">
              Quick Access
            </span>
            <div className="h-px flex-1 bg-[#c3c6d0]/40"></div>
          </div>

          {/* Social / Biometric Login Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => handleQuickAccess('google')}
              className="flex-1 py-3 bg-[#f4f3f8] dark:bg-[#1a2332] hover:bg-white dark:hover:bg-[#242f42] rounded-xl border border-[#e3e2e7] dark:border-white/10 flex items-center justify-center shadow-xs active:scale-95 transition-all"
              title="Sign in with Google"
            >
              <img
                src={COMMON_ASSETS.googleGLogo}
                alt="Google G logo"
                className="w-5 h-5 object-contain"
              />
            </button>
            <button
              type="button"
              onClick={() => handleQuickAccess('biometric')}
              className="flex-1 py-3 bg-[#f4f3f8] dark:bg-[#1a2332] hover:bg-white dark:hover:bg-[#242f42] rounded-xl border border-[#e3e2e7] dark:border-white/10 flex items-center justify-center shadow-xs active:scale-95 transition-all text-[#001938] dark:text-[#feb71a]"
              title="Sign in with Fingerprint Biometrics"
            >
              <span className="material-symbols-outlined text-2xl">fingerprint</span>
            </button>
          </div>
        </div>

        {/* Terms & Privacy */}
        <p className="text-center mt-6 text-xs text-[#43474f] dark:text-[#a5acba]">
          By logging in, you agree to our{' '}
          <button
            onClick={() => setToastMessage('Terms of Service: Heritage purity guaranteed.')}
            className="text-[#7d5700] dark:text-[#feb71a] font-bold hover:underline"
          >
            Terms
          </button>{' '}
          &amp;{' '}
          <button
            onClick={() => setToastMessage('Privacy Policy: End-to-end customer ledger encryption.')}
            className="text-[#7d5700] dark:text-[#feb71a] font-bold hover:underline"
          >
            Privacy
          </button>
        </p>

        {/* Back to Welcome */}
        <div className="text-center mt-3">
          <button
            onClick={() => onNavigate('welcome')}
            className="text-xs text-[#737780] hover:text-[#001938] dark:hover:text-white transition-colors"
          >
            ← Back to Welcome Screen
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#001938] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 z-50 border border-[#feb71a]/40 animate-bounce">
          <span className="material-symbols-outlined text-[#feb71a] text-sm">
            info
          </span>
          {toastMessage}
        </div>
      )}
    </div>
  );
};
