import React, { useState } from 'react';
import { DeliveryStop, LedgerRecord, ScreenType, UserProfile } from '../types';

// ==================== VIEW MAP MODAL ====================
export const ViewMapModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  stops: DeliveryStop[];
}> = ({ isOpen, onClose, stops }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-lg w-full p-5 shadow-2xl border-4 border-[#feb71a] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#e3e2e7] dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002e5d] dark:text-[#feb71a]">
              route
            </span>
            <h3 className="font-serif text-xl font-bold text-[#001938] dark:text-white">
              Morning Delivery Route Map
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#737780]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Visual Simulated Map Canvas */}
        <div className="relative w-full h-64 bg-[#e9ecef] dark:bg-[#1a2332] rounded-2xl overflow-hidden border border-[#c3c6d0]/50 mb-4 p-4 flex flex-col justify-between">
          {/* Map Grid and Roads Simulation */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#002e5d_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#feb71a] stroke-[4] fill-none stroke-dasharray-[6,6]">
            <path d="M 60 40 Q 180 80, 240 140 T 360 200" />
          </svg>

          {/* Route Pins */}
          <div className="absolute top-8 left-12 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#001938] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#feb71a]">
              04
            </div>
            <span className="bg-white/90 dark:bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-1 text-[#001938] dark:text-white">
              Shanti Niwas
            </span>
          </div>

          <div className="absolute top-28 left-48 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#7d5700] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#feb71a]">
              05
            </div>
            <span className="bg-white/90 dark:bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-1 text-[#001938] dark:text-white">
              Royal Res.
            </span>
          </div>

          <div className="absolute bottom-8 right-14 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white animate-pulse">
              !
            </div>
            <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-1">
              C-12 Urgent
            </span>
          </div>

          <div className="z-10 flex justify-between items-start">
            <span className="bg-white/90 dark:bg-[#141b27]/90 text-[11px] font-bold px-2 py-1 rounded shadow-xs text-[#001938] dark:text-white">
              📍 Sector 4 Route · ETA 6:45 AM
            </span>
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Live GPS Active
            </span>
          </div>

          <div className="z-10 self-start bg-white/90 dark:bg-[#141b27]/90 p-2 rounded-xl text-xs max-w-xs shadow-sm">
            <p className="font-bold text-[#001938] dark:text-white">Optimized Sequence</p>
            <p className="text-[11px] text-[#737780] dark:text-[#a5acba]">
              Depot → Stop 04 → Stop 05 → C-12 Green Park (Finish before 7:00 AM)
            </p>
          </div>
        </div>

        {/* List of stops */}
        <div className="overflow-y-auto max-h-48 space-y-2 pr-1 text-xs">
          {stops.map((s, idx) => (
            <div
              key={s.id}
              className="p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#001938] text-[#feb71a] font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-bold text-[#001938] dark:text-white">{s.customerName}</p>
                  <p className="text-[10px] text-[#737780]">{s.address}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  s.status === 'delivered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {s.status === 'delivered' ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#001938] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#002e5d] cursor-pointer"
        >
          Close Route Map
        </button>
      </div>
    </div>
  );
};

// ==================== ADD DELIVERY STOP MODAL ====================
export const AddStopModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddStop: (stop: DeliveryStop) => void;
}> = ({ isOpen, onClose, onAddStop }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [itemsSummary, setItemsSummary] = useState('2L Buffalo Milk');
  const [amountDue, setAmountDue] = useState('128');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const newStop: DeliveryStop = {
      id: `stop-${Date.now()}`,
      stopNumber: `0${Math.floor(Math.random() * 8) + 8}`,
      customerName,
      address: address || 'Gandhinagar Route',
      itemsSummary,
      status: 'pending',
      amountDue: parseFloat(amountDue) || 0,
      phone: '+91 98000 00000'
    };

    onAddStop(newStop);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-md w-full p-6 shadow-2xl border-4 border-[#feb71a] animate-scaleUp">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e3e2e7] dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#feb71a]">add_location_alt</span>
            <h3 className="font-serif text-xl font-bold text-[#001938] dark:text-white">
              Add New Delivery Stop
            </h3>
          </div>
          <button onClick={onClose} className="text-[#737780] hover:text-[#001938]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Customer / Household Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g., K-304, Shivam Heights"
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Delivery Address &amp; Landmarks
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., Near Club House, VIP Road"
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Items Scheduled
            </label>
            <input
              type="text"
              value={itemsSummary}
              onChange={(e) => setItemsSummary(e.target.value)}
              placeholder="e.g., 2L Buffalo Milk • 200g Paneer"
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Amount Due (₹)
            </label>
            <input
              type="number"
              value={amountDue}
              onChange={(e) => setAmountDue(e.target.value)}
              placeholder="128"
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#c3c6d0] text-[#737780] font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#feb71a] text-[#6b4b00] font-bold uppercase tracking-wider hover:bg-[#ffba2c]"
            >
              Save Stop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==================== URGENT PAYMENT MODAL ====================
export const UrgentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  stop: DeliveryStop | null;
  onResolve: (stopId: string) => void;
}> = ({ isOpen, onClose, stop, onResolve }) => {
  if (!isOpen || !stop) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-sm w-full p-6 text-center shadow-2xl border-4 border-[#ba1a1a] animate-scaleUp">
        <div className="w-14 h-14 bg-[#ffdad6] text-[#ba1a1a] rounded-full mx-auto flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-3xl font-bold">priority_high</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#ba1a1a]">
          Urgent Action
        </h3>
        <p className="font-bold text-sm text-[#001938] dark:text-white mt-1">
          {stop.customerName}
        </p>
        <p className="text-xs text-[#737780] dark:text-[#a5acba] mt-0.5">
          {stop.urgentNote || 'Collect cash / UPI monthly subscription advance.'}
        </p>

        <div className="my-4 p-3 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl text-left text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-[#737780]">Collection Amount:</span>
            <span className="font-bold text-base text-[#ba1a1a]">₹{stop.amountDue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#737780]">Phone:</span>
            <span className="font-mono text-[#001938] dark:text-white">{stop.phone}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              onResolve(stop.id);
              onClose();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
          >
            Mark Payment Collected &amp; Delivered
          </button>
          <button
            onClick={onClose}
            className="w-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-[#737780] py-2 rounded-xl text-xs font-semibold"
          >
            Remind Later
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== DOWNLOAD DETAILED PDF MODAL ====================
export const DownloadPDFModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  ledgerRecords: LedgerRecord[];
  userProfile: UserProfile;
}> = ({ isOpen, onClose, ledgerRecords, userProfile }) => {
  if (!isOpen) return null;

  const totalMilk = ledgerRecords.reduce((sum, r) => sum + r.quantityLiters, 0);
  const totalAmount = ledgerRecords
    .filter((r) => r.status === 'PAID')
    .reduce((sum, r) => sum + r.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white text-[#1a1c1f] rounded-[28px] max-w-xl w-full p-6 shadow-2xl border-4 border-[#feb71a] max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-[#feb71a]/30">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#001938]">
              Dudh Sagar Dairy Statement
            </h3>
            <p className="text-xs text-[#737780]">
              Official Route Ledger &amp; Monthly Summary Report
            </p>
          </div>
          <button onClick={onClose} className="text-[#737780] hover:text-[#001938]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Printable Statement Sheet */}
        <div className="my-4 p-5 bg-[#fffdf5] rounded-xl border border-[#c3c6d0]/40 text-xs space-y-3">
          <div className="flex justify-between items-start pb-2 border-b border-dashed border-[#c3c6d0]">
            <div>
              <p className="font-bold text-sm text-[#001938]">{userProfile.name}</p>
              <p className="text-[#737780]">{userProfile.role} · {userProfile.route}</p>
              <p className="text-[#737780]">{userProfile.address}</p>
            </div>
            <div className="text-right">
              <span className="bg-[#feb71a] text-[#6b4b00] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
                OCTOBER 2026
              </span>
              <p className="font-mono text-[#737780] text-[10px] mt-1">
                Generated: {new Date().toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>

          {/* Statement Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#001938]/20 text-[#737780] font-bold text-[10px] uppercase">
                <th className="py-1">Date</th>
                <th className="py-1">Customer</th>
                <th className="py-1 text-center">Liters</th>
                <th className="py-1 text-right">Amount (₹)</th>
                <th className="py-1 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ledgerRecords.map((r) => (
                <tr key={r.id}>
                  <td className="py-1.5 font-mono text-[11px] text-[#737780]">{r.date}</td>
                  <td className="py-1.5 font-bold text-[#001938]">{r.customerName}</td>
                  <td className="py-1.5 text-center font-mono">{r.quantityLiters.toFixed(1)}L</td>
                  <td className="py-1.5 text-right font-mono font-bold">₹{r.amount.toFixed(2)}</td>
                  <td className="py-1.5 text-right">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        r.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="pt-3 border-t-2 border-[#001938] flex justify-between items-center text-sm font-bold">
            <span>Summary: {totalMilk.toFixed(1)} Liters Total</span>
            <span className="text-base text-[#7d5700]">
              Total Collected: ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#001938] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#002e5d] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#c3c6d0] text-[#737780] font-bold text-xs uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== REFER & EARN MODAL ====================
export const InviteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://dudhsagar.app/r/ARAVIND77';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-sm w-full p-6 text-center shadow-2xl border-4 border-[#feb71a] animate-scaleUp">
        <div className="w-16 h-16 bg-[#feb71a] text-[#6b4b00] rounded-full mx-auto flex items-center justify-center mb-3 shadow-md">
          <span className="material-symbols-outlined text-3xl">celebration</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#001938] dark:text-white">
          Get Free Milk for 3 Days!
        </h3>
        <p className="text-xs text-[#737780] dark:text-[#a5acba] mt-1">
          Share your partner link with friends, family, or society members. When they subscribe, both get 3 days of complimentary A2 milk!
        </p>

        <div className="my-4 p-3 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl flex items-center justify-between gap-2 border border-[#feb71a]/30">
          <span className="font-mono text-xs font-bold text-[#001938] dark:text-white truncate">
            {referralLink}
          </span>
          <button
            onClick={handleCopy}
            className="bg-[#feb71a] text-[#6b4b00] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer shrink-0"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#001938] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#002e5d] cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export const ReferModal = InviteModal;

// ==================== PROFILE MODAL ====================
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: Partial<UserProfile>) => void;
}> = ({ isOpen, onClose, userProfile, onSaveProfile }) => {
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [route, setRoute] = useState(userProfile.route);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ name, phone, address, route });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-md w-full p-6 shadow-2xl border-4 border-[#feb71a] animate-scaleUp">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e3e2e7] dark:border-white/10">
          <h3 className="font-serif text-xl font-bold text-[#001938] dark:text-white">
            Partner Profile &amp; Route
          </h3>
          <button onClick={onClose} className="text-[#737780]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Assigned Route
            </label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-[#43474f] dark:text-[#a5acba] uppercase block mb-1">
              Depot / Hub Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-transparent focus:border-[#feb71a] text-sm text-[#001938] dark:text-white"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#c3c6d0] text-[#737780] font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#feb71a] text-[#6b4b00] font-bold uppercase tracking-wider hover:bg-[#ffba2c]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==================== SIDEBAR / DRAWER MENU ====================
export const SidebarMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userProfile: UserProfile;
}> = ({ isOpen, onClose, currentScreen, onNavigate, userProfile }) => {
  if (!isOpen) return null;

  const menuItems: { screen: ScreenType; label: string; icon: string }[] = [
    { screen: 'welcome', label: 'Welcome Screen', icon: 'waving_hand' },
    { screen: 'home', label: 'Delivery Dashboard', icon: 'local_shipping' },
    { screen: 'cart', label: 'Daily Entry (Basket)', icon: 'shopping_basket' },
    { screen: 'history', label: 'History (Monthly Ledger)', icon: 'menu_book' },
    { screen: 'settings', label: 'Settings & Account', icon: 'settings' },
    { screen: 'login', label: 'Login / Sign up', icon: 'lock' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-72 max-w-[80vw] bg-[#001938] text-white h-full shadow-2xl z-10 flex flex-col justify-between p-5 border-r border-[#feb71a]/30">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#feb71a] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water_drop
              </span>
              <h2 className="font-serif text-xl font-bold text-[#feb71a]">
                Dudh Sagar
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* User badge */}
          <div className="my-4 p-3 bg-white/5 rounded-2xl flex items-center gap-3 border border-white/10">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full border border-[#feb71a] object-cover"
            />
            <div>
              <p className="font-bold text-sm text-white">{userProfile.name}</p>
              <p className="text-[10px] text-[#feb71a] uppercase font-bold tracking-wider">
                {userProfile.role}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 mt-4">
            {menuItems.map((item) => {
              const active = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    onNavigate(item.screen);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-left ${
                    active
                      ? 'bg-[#feb71a] text-[#001938] font-bold shadow-xs'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-[11px] text-white/50 text-center">
          <p>Dudh Sagar Dairy Systems</p>
          <p className="text-[#feb71a]/70">Pure Traditions, Delivered Fresh Daily</p>
        </div>
      </div>
    </div>
  );
};
