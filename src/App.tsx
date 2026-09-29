/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { CartScreen } from './components/CartScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { Header } from './components/Header';
import { HistoryScreen } from './components/HistoryScreen';
import { LoginScreen } from './components/LoginScreen';
import {
  AddStopModal,
  DownloadPDFModal,
  InviteModal,
  ProfileModal,
  SidebarMenu,
  UrgentModal,
  ViewMapModal
} from './components/Modals';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { SettingsScreen } from './components/SettingsScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import {
  INITIAL_LEDGER_RECORDS,
  INITIAL_PRODUCTS,
  INITIAL_STOPS,
  INITIAL_USER_PROFILE
} from './data/mockData';
import { BasketItem, DeliveryStop, LedgerRecord, Product, ScreenType, UserProfile } from './types';

export default function App() {
  // Screen routing state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  // Application data state
  const [stops, setStops] = useState<DeliveryStop[]>(INITIAL_STOPS);
  const [ledgerRecords, setLedgerRecords] = useState<LedgerRecord[]>(INITIAL_LEDGER_RECORDS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Basket state matching screenshot 3
  const [basketItems, setBasketItems] = useState<BasketItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 }, // Fresh Buffalo Milk (2L)
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // Creamy Paneer (200g)
    { product: INITIAL_PRODUCTS[2], quantity: 1 }  // Pure Cow Ghee (500ml)
  ]);

  // UI state
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<LedgerRecord | null>(null);

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAddStopOpen, setIsAddStopOpen] = useState(false);
  const [urgentStop, setUrgentStop] = useState<DeliveryStop | null>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleToggleStopStatus = (stopId: string) => {
    setStops((prev) =>
      prev.map((stop) => {
        if (stop.id === stopId) {
          const nextStatus = stop.status === 'delivered' ? 'pending' : 'delivered';
          return { ...stop, status: nextStatus };
        }
        return stop;
      })
    );
  };

  const handleResolveUrgent = (stopId: string) => {
    setStops((prev) =>
      prev.map((stop) => {
        if (stop.id === stopId) {
          return { ...stop, status: 'delivered', isUrgent: false };
        }
        return stop;
      })
    );
  };

  const handleAddStop = (newStop: DeliveryStop) => {
    setStops((prev) => [newStop, ...prev]);
  };

  const handleUpdateBasketQuantity = (productId: string, delta: number) => {
    setBasketItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(0, newQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddProductToBasket = (product: Product) => {
    setBasketItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleSaveDailyEntry = (entry: LedgerRecord) => {
    setLedgerRecords((prev) => [entry, ...prev]);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    if (updates.theme !== undefined) {
      setIsDarkMode(updates.theme === 'dark');
    }
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  // Render current screen
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={() => setCurrentScreen('home')}
            onNavigate={setCurrentScreen}
          />
        );
      case 'home':
        return (
          <DashboardScreen
            stops={stops}
            onToggleStopStatus={handleToggleStopStatus}
            onNavigate={setCurrentScreen}
            onOpenAddStop={() => setIsAddStopOpen(true)}
            onOpenMap={() => setIsMapOpen(true)}
            onOpenUrgentModal={(stop) => setUrgentStop(stop)}
          />
        );
      case 'cart':
        return (
          <CartScreen
            basketItems={basketItems}
            availableProducts={INITIAL_PRODUCTS}
            onUpdateQuantity={handleUpdateBasketQuantity}
            onAddProductToBasket={handleAddProductToBasket}
            onSaveEntry={handleSaveDailyEntry}
            onNavigate={setCurrentScreen}
            deliveryPartnerName={userProfile.name}
          />
        );
      case 'history':
        return (
          <HistoryScreen
            ledgerRecords={ledgerRecords}
            onDownloadPDF={() => setIsPDFOpen(true)}
            onNavigate={setCurrentScreen}
            onSelectRecord={(rec) => setSelectedRecordForDetail(rec)}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
            onNavigate={setCurrentScreen}
            onOpenInviteModal={() => setIsInviteOpen(true)}
            onOpenProfileModal={() => setIsProfileOpen(true)}
          />
        );
      default:
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#0d131f]' : 'bg-[#fffdf5]'}`}>
      {/* Top Testing Switcher Banner */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => {
          setIsDarkMode(!isDarkMode);
          setUserProfile((p) => ({ ...p, theme: !isDarkMode ? 'dark' : 'light' }));
        }}
      />

      {/* Frame Container */}
      <div
        className={`min-h-[calc(100vh-42px)] transition-all flex flex-col justify-start items-center ${
          isMobileFrame ? 'py-4 sm:py-8 bg-black/10 dark:bg-black/40' : ''
        }`}
      >
        {/* If Mobile Frame mode is enabled, wrap in realistic iPhone / Android frame */}
        <div
          className={`w-full transition-all relative flex flex-col min-h-screen ${
            isMobileFrame
              ? 'max-w-[412px] min-h-[890px] rounded-[44px] shadow-2xl border-[10px] border-[#1e293b] overflow-hidden bg-[#fffdf5] dark:bg-[#0d131f]'
              : 'max-w-full'
          }`}
        >
          {/* Mobile frame notch indicator if framed */}
          {isMobileFrame && (
            <div className="w-full h-6 bg-[#001938] flex items-center justify-between px-6 text-[10px] text-white/80 z-50 select-none">
              <span>6:30 AM</span>
              <div className="w-20 h-3 bg-black/60 rounded-full mx-auto"></div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-xs">wifi</span>
                <span className="material-symbols-outlined text-xs">battery_full</span>
              </div>
            </div>
          )}

          {/* Top Header (Visible on home, cart, history, settings, and welcome) */}
          {currentScreen !== 'login' && (
            <Header
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              onOpenMenu={() => setIsMenuOpen(true)}
              userProfile={userProfile}
            />
          )}

          {/* Screen Content */}
          <main
            className={`flex-grow flex flex-col w-full ${
              currentScreen !== 'login' ? 'pt-16' : ''
            }`}
          >
            {renderScreenContent()}
          </main>

          {/* Bottom Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            cartItemCount={basketItems.reduce((acc, item) => acc + item.quantity, 0)}
          />
        </div>
      </div>

      {/* Modals & Overlays */}
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        userProfile={userProfile}
      />

      <ViewMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        stops={stops}
      />

      <AddStopModal
        isOpen={isAddStopOpen}
        onClose={() => setIsAddStopOpen(false)}
        onAddStop={handleAddStop}
      />

      <UrgentModal
        isOpen={urgentStop !== null}
        onClose={() => setUrgentStop(null)}
        stop={urgentStop}
        onResolve={handleResolveUrgent}
      />

      <DownloadPDFModal
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        ledgerRecords={ledgerRecords}
        userProfile={userProfile}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Record Quick Detail Modal (from History item click) */}
      {selectedRecordForDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-sm w-full p-6 text-center shadow-2xl border-4 border-[#feb71a] animate-scaleUp">
            <div className="w-14 h-14 bg-[#feb71a] text-[#6b4b00] rounded-full mx-auto flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
            </div>
            <p className="text-[11px] font-bold text-[#737780] uppercase tracking-wider">
              {selectedRecordForDetail.date}
            </p>
            <h3 className="font-serif text-2xl font-bold text-[#001938] dark:text-white mt-0.5">
              {selectedRecordForDetail.customerName}
            </h3>

            <div className="my-4 p-3 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#737780]">Quantity:</span>
                <span className="font-bold text-[#001938] dark:text-white">
                  {selectedRecordForDetail.quantityLiters.toFixed(1)} Liters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737780]">Amount:</span>
                <span className="font-bold text-[#7d5700] dark:text-[#feb71a] text-sm">
                  ₹{selectedRecordForDetail.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737780]">Payment Status:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                    selectedRecordForDetail.status === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedRecordForDetail.status}
                </span>
              </div>
              {selectedRecordForDetail.itemsDescription && (
                <div className="pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-[#737780] block text-[10px]">Description:</span>
                  <span className="text-[#001938] dark:text-white">
                    {selectedRecordForDetail.itemsDescription}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedRecordForDetail(null)}
              className="w-full bg-[#001938] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#002e5d] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
