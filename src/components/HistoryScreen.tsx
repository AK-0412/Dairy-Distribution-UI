import React, { useState } from 'react';
import { LedgerRecord, ScreenType } from '../types';

interface HistoryScreenProps {
  ledgerRecords: LedgerRecord[];
  onDownloadPDF: () => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectRecord: (record: LedgerRecord) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  ledgerRecords,
  onDownloadPDF,
  onNavigate,
  onSelectRecord
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'PAID' | 'LEDGER'>('ALL');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter records
  const filteredRecords = ledgerRecords.filter((record) => {
    // Status filter
    if (filterStatus === 'PAID' && record.status !== 'PAID') return false;
    if (filterStatus === 'PENDING' && record.status !== 'PENDING') return false;

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      record.customerName.toLowerCase().includes(q) ||
      record.date.toLowerCase().includes(q) ||
      record.amount.toString().includes(q)
    );
  });

  // Calculate live summary
  const totalMilkLiters = ledgerRecords.reduce((sum, r) => sum + r.quantityLiters, 0);
  const totalAmountCollected = ledgerRecords
    .filter((r) => r.status === 'PAID')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="flex-grow flex flex-col pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      {/* Search & Filter Section */}
      <section className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer or date..."
              className="w-full bg-[#f4f3f8] dark:bg-[#1a2332] text-[#001938] dark:text-white placeholder-[#737780] border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-[#feb71a] text-sm shadow-xs focus:outline-none transition-all"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737780]">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737780] hover:text-[#001938]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] px-3.5 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-xs cursor-pointer"
            title="Filter records"
          >
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-[#001938] text-white shadow-xs'
                : 'bg-[#eeedf2] dark:bg-[#1a2332] text-[#43474f] dark:text-[#a5acba] hover:bg-[#e3e2e7]'
            }`}
          >
            All Records
          </button>
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'PENDING'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'bg-[#eeedf2] dark:bg-[#1a2332] text-[#43474f] dark:text-[#a5acba] hover:bg-[#e3e2e7]'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('PAID')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'PAID'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[#eeedf2] dark:bg-[#1a2332] text-[#43474f] dark:text-[#a5acba] hover:bg-[#e3e2e7]'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilterStatus('LEDGER')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'LEDGER'
                ? 'bg-[#feb71a] text-[#6b4b00] shadow-xs'
                : 'bg-[#eeedf2] dark:bg-[#1a2332] text-[#43474f] dark:text-[#a5acba] hover:bg-[#e3e2e7]'
            }`}
          >
            Milk Ledger
          </button>
        </div>
      </section>

      {/* Decorative Marigold Divider */}
      <div className="marigold-divider my-4 opacity-50"></div>

      {/* Ledger Content */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="font-bold text-lg sm:text-xl text-[#001938] dark:text-white">
            Monthly Ledger
          </h2>
          <span className="text-[#7d5700] dark:text-[#feb71a] text-xs font-bold tracking-wider uppercase">
            OCTOBER 2026
          </span>
        </div>

        {/* Ledger Records Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredRecords.slice(0, 3).map((record) => renderRecordCard(record, onSelectRecord))}

          {/* Monthly Summary "The Daily Pail" Style Report */}
          <div className="my-2 bg-[#002e5d] text-white p-5 rounded-2xl relative overflow-hidden shadow-lg border border-[#7697cc]/20">
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none">
              <span
                className="material-symbols-outlined text-[140px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                nest_eco_leaf
              </span>
            </div>

            <h3 className="font-bold text-base text-[#feb71a] mb-3 relative z-10">
              Monthly Summary
            </h3>

            <div className="flex justify-around items-center py-2 relative z-10">
              <div className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {totalMilkLiters.toFixed(1)}L
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  TOTAL MILK
                </div>
              </div>

              <div className="w-px h-10 bg-white/20"></div>

              <div className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#feb71a]">
                  ₹{totalAmountCollected.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                  COLLECTED
                </div>
              </div>
            </div>

            <button
              onClick={onDownloadPDF}
              className="mt-4 w-full bg-[#feb71a] hover:bg-[#ffba2c] text-[#6b4b00] py-3 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-98 transition-all relative z-10 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Detailed PDF</span>
            </button>
          </div>

          {/* Remaining Records */}
          {filteredRecords.slice(3).map((record) => renderRecordCard(record, onSelectRecord))}

          {filteredRecords.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-[#141b27] rounded-xl border border-dashed border-[#c3c6d0]">
              <span className="material-symbols-outlined text-4xl text-[#737780]">
                receipt
              </span>
              <p className="text-sm font-semibold text-[#001938] dark:text-white mt-2">
                No ledger records match your filter.
              </p>
              <button
                onClick={() => {
                  setFilterStatus('ALL');
                  setSearchQuery('');
                }}
                className="text-xs text-[#feb71a] font-bold mt-2 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Render helper for single ledger card
function renderRecordCard(
  record: LedgerRecord,
  onSelect: (record: LedgerRecord) => void
) {
  const isPaid = record.status === 'PAID';

  return (
    <div
      key={record.id}
      onClick={() => onSelect(record)}
      className={`bg-white dark:bg-[#141b27] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,46,93,0.06)] border border-[#e3e2e7] dark:border-white/10 border-l-4 ${
        isPaid ? 'border-l-[#feb71a]' : 'border-l-[#ba1a1a]'
      } relative overflow-hidden active:scale-98 transition-transform cursor-pointer hover:shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[11px] font-bold text-[#737780] dark:text-[#a5acba] uppercase tracking-wider">
            {record.date}
          </span>
          <h3 className="font-bold text-base text-[#001938] dark:text-white mt-0.5">
            {record.customerName}
          </h3>
          {record.itemsDescription && (
            <p className="text-xs text-[#737780] dark:text-[#a5acba] mt-0.5 truncate max-w-[200px] sm:max-w-xs">
              {record.itemsDescription}
            </p>
          )}
        </div>

        <div className="text-right">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isPaid
                ? 'bg-[#ffdcc2] text-[#6d3a00]'
                : 'bg-[#ffdad6] text-[#93000a]'
            }`}
          >
            {record.status}
          </span>
          <div className="mt-1 font-serif text-xl sm:text-2xl font-bold text-[#001938] dark:text-white">
            {record.quantityLiters.toFixed(1)}L
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center border-t border-dashed border-[#c3c6d0]/60 dark:border-white/10 pt-2">
        <div className="flex items-center gap-1 text-[#7d5700] dark:text-[#feb71a]">
          <span className="material-symbols-outlined text-sm">payments</span>
          <span className="font-semibold text-xs sm:text-sm text-[#001938] dark:text-white">
            ₹{record.amount.toFixed(2)}
          </span>
        </div>
        <span className="material-symbols-outlined text-[#737780] text-sm">
          chevron_right
        </span>
      </div>
    </div>
  );
}
