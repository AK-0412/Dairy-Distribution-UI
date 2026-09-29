import React, { useState } from 'react';
import { DeliveryStop, ScreenType } from '../types';

interface DashboardScreenProps {
  stops: DeliveryStop[];
  onToggleStopStatus: (stopId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenAddStop: () => void;
  onOpenMap: () => void;
  onOpenUrgentModal: (stop: DeliveryStop) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  stops,
  onToggleStopStatus,
  onNavigate,
  onOpenAddStop,
  onOpenMap,
  onOpenUrgentModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stops based on search
  const filteredStops = stops.filter((stop) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      stop.customerName.toLowerCase().includes(q) ||
      stop.address.toLowerCase().includes(q) ||
      stop.itemsSummary.toLowerCase().includes(q) ||
      stop.stopNumber.toLowerCase().includes(q)
    );
  });

  const deliveredCount = stops.filter((s) => s.status === 'delivered').length;
  const totalStops = stops.length;
  const percentage = totalStops > 0 ? Math.round((deliveredCount / totalStops) * 100) : 75;

  return (
    <div className="flex-grow flex flex-col pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      {/* Hero Search Section */}
      <section className="mt-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, route, or item..."
            className="w-full bg-[#f4f3f8] dark:bg-[#1a2332] text-[#001938] dark:text-white placeholder-[#737780] border-none rounded-xl h-14 pl-12 pr-10 focus:ring-2 focus:ring-[#feb71a] text-sm sm:text-base shadow-xs focus:outline-none transition-all"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737780]">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737780] hover:text-[#001938]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </section>

      {/* The Daily Pail (Statistics Section) */}
      <section className="mt-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#001938] dark:text-white tracking-tight">
            Daily Statistics
          </h2>
          <span className="text-[#dd7e15] dark:text-[#ffb77a] font-bold text-xs uppercase tracking-wider bg-[#ffdcc2] dark:bg-[#492500] px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dd7e15] animate-ping"></span>
            Live Updates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Daily Progress - The Daily Pail */}
          <div className="bg-white dark:bg-[#141b27] p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.08)] border border-[#e3e2e7] dark:border-white/10 relative overflow-hidden flex flex-col items-center justify-center border-b-4 border-b-[#feb71a]">
            {/* Conic Gradient Pail */}
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center relative p-2 shadow-inner"
              style={{
                background: `conic-gradient(#feb71a ${percentage * 3.6}deg, #e3e2e7 ${
                  percentage * 3.6
                }deg)`
              }}
            >
              <div className="w-[106px] h-[106px] bg-white dark:bg-[#141b27] rounded-full flex flex-col items-center justify-center shadow-xs">
                <span className="font-serif text-3xl font-bold text-[#001938] dark:text-white leading-none">
                  {percentage}%
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737780] dark:text-[#a5acba] mt-0.5">
                  Delivered
                </span>
              </div>
            </div>
            <p className="mt-3 font-semibold text-sm sm:text-base text-[#001938] dark:text-white">
              Daily Pail Status
            </p>
            <p className="text-[11px] text-[#737780] dark:text-[#a5acba]">
              {deliveredCount} of {totalStops} morning stops cleared
            </p>
          </div>

          {/* Card 2: Total Scheduled - Saffron Card */}
          <div className="bg-[#feb71a] p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.08)] text-[#6b4b00] flex flex-col justify-between min-h-[160px] transition-transform hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-4xl">local_shipping</span>
              <span className="text-[11px] font-bold tracking-wider uppercase bg-white/40 px-2 py-0.5 rounded">
                Today
              </span>
            </div>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold leading-none">
                128
              </p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-85 mt-1">
                Total Bottles Scheduled
              </p>
            </div>
          </div>

          {/* Card 3: Payment Collection - Marigold Card */}
          <div className="bg-[#ffdeaa] p-5 rounded-[24px] shadow-[0_4px_16px_rgba(0,46,93,0.08)] text-[#271900] flex flex-col justify-between min-h-[160px] transition-transform hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-4xl">payments</span>
              <span className="text-[11px] font-bold tracking-wider uppercase bg-white/40 px-2 py-0.5 rounded">
                Pending
              </span>
            </div>
            <div>
              <p className="font-serif text-4xl sm:text-5xl font-bold leading-none">
                ₹4,250
              </p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-85 mt-1">
                Collection Remaining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="marigold-divider my-6 opacity-40"></div>

      {/* Upcoming Stops Section */}
      <section className="pb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl font-bold text-[#001938] dark:text-white tracking-tight">
            Upcoming Stops
          </h2>
          <button
            onClick={onOpenMap}
            className="text-[#dd7e15] dark:text-[#feb71a] font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">map</span>
            View Map
          </button>
        </div>

        <div className="space-y-3">
          {filteredStops.map((stop) => {
            const isDelivered = stop.status === 'delivered';
            const isUrgent = stop.isUrgent;

            if (isUrgent) {
              return (
                <div
                  key={stop.id}
                  className="bg-[#ffdad6] dark:bg-[#3f1212] p-4 rounded-xl shadow-xs border-l-8 border-[#ba1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white dark:bg-[#5c1c1c] rounded-xl flex items-center justify-center text-[#ba1a1a] dark:text-[#ffdad6] shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-2xl font-bold">
                        priority_high
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#93000a] dark:text-[#ffdad6]">
                          {stop.customerName}
                        </h3>
                        <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                          Action Required
                        </span>
                      </div>
                      <p className="text-xs text-[#93000a]/80 dark:text-[#ffdad6]/80 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-sm">water_drop</span>
                        {stop.itemsSummary}
                      </p>
                      {stop.amountDue && (
                        <p className="text-xs font-bold text-[#ba1a1a] dark:text-[#ffdad6] mt-1">
                          Amount Due: ₹{stop.amountDue}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onOpenUrgentModal(stop)}
                      className="bg-[#ba1a1a] hover:bg-[#93000a] text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      Urgent
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={stop.id}
                className={`bg-white dark:bg-[#141b27] p-4 rounded-xl shadow-xs border border-[#e3e2e7] dark:border-white/10 border-l-8 ${
                  isDelivered
                    ? 'border-l-emerald-500 opacity-80'
                    : stop.stopNumber === '04'
                    ? 'border-l-[#7d5700]'
                    : 'border-l-[#dd7e15]'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-xs ${
                      isDelivered
                        ? 'bg-emerald-100 text-emerald-800'
                        : stop.stopNumber === '04'
                        ? 'bg-[#d5e3ff] text-[#001938]'
                        : 'bg-[#ffdcc2] text-[#6d3a00]'
                    }`}
                  >
                    {isDelivered ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      stop.stopNumber
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#001938] dark:text-white leading-tight">
                      {stop.customerName}
                    </h3>
                    <p className="text-xs text-[#737780] dark:text-[#a5acba] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm text-[#7d5700] dark:text-[#feb71a]">
                        water_drop
                      </span>
                      {stop.itemsSummary}
                    </p>
                    <p className="text-[11px] text-[#737780] mt-0.5">
                      {stop.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onToggleStopStatus(stop.id)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                      isDelivered
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-[#001938] hover:bg-[#002e5d] text-white'
                    }`}
                  >
                    {isDelivered ? 'Delivered ✓' : 'Deliver'}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredStops.length === 0 && (
            <div className="text-center py-8 bg-white dark:bg-[#141b27] rounded-xl border border-dashed border-[#c3c6d0]">
              <span className="material-symbols-outlined text-3xl text-[#737780]">
                search_off
              </span>
              <p className="text-sm font-semibold text-[#001938] dark:text-white mt-1">
                No stops found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#feb71a] font-bold mt-2 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fresh Harvest Promo Card Showcase */}
      <section className="mt-6">
        <div className="bg-[#002e5d] p-6 rounded-[24px] text-white relative overflow-hidden shadow-lg border border-[#7697cc]/20">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 opacity-15 translate-x-6 -translate-y-4 pointer-events-none select-none">
            <span
              className="material-symbols-outlined text-[150px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              water_drop
            </span>
          </div>

          <div className="relative z-10 max-w-sm">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded text-[#ffdcc2]">
              Special Offer
            </span>
            <h2 className="font-serif text-2xl font-bold text-white mt-2 mb-1">
              Fresh Harvest Promo
            </h2>
            <p className="text-xs text-[#d5e3ff] mb-4 leading-relaxed">
              Unlock special discounts on organic wild honey and cultured white butter this week.
            </p>
            <button
              onClick={() => onNavigate('cart')}
              className="bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Store</span>
              <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Button (FAB) for adding new delivery/stop */}
      <button
        onClick={onOpenAddStop}
        className="fixed right-6 bottom-20 w-16 h-16 bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] rounded-full shadow-2xl flex items-center justify-center active:rotate-45 active:scale-105 transition-all duration-300 z-40 border-4 border-white dark:border-[#141b27] cursor-pointer group"
        title="Add New Delivery Stop or Daily Order"
      >
        <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">
          add
        </span>
      </button>
    </div>
  );
};
