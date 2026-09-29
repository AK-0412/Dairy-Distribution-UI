import React, { useState } from 'react';
import { BasketItem, LedgerRecord, Product, ScreenType } from '../types';

interface CartScreenProps {
  basketItems: BasketItem[];
  availableProducts: Product[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onAddProductToBasket: (product: Product) => void;
  onSaveEntry: (entry: LedgerRecord) => void;
  onNavigate: (screen: ScreenType) => void;
  deliveryPartnerName: string;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  basketItems,
  availableProducts,
  onUpdateQuantity,
  onAddProductToBasket,
  onSaveEntry,
  onNavigate,
  deliveryPartnerName
}) => {
  const [customerName, setCustomerName] = useState('Shanti Niwas, Sector 4');
  const [invoiceNumber] = useState('INV #44521');
  const [showCatalog, setShowCatalog] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastSavedAmount, setLastSavedAmount] = useState(0);

  // Quick customer suggestions
  const customerSuggestions = [
    'Shanti Niwas, Sector 4',
    'B-402, Royal Residency',
    'C-12, Green Park',
    'Meera Iyer (Flat 202)',
    'Rajesh Kumar (Villa 12)'
  ];

  // Calculations
  const deliveryFee = 18.0;
  const itemsTotal = basketItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const grandTotal = itemsTotal > 0 ? itemsTotal + deliveryFee : 0;
  const totalItemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirm = () => {
    if (!customerName.trim()) {
      alert('Please enter a customer name or ID');
      return;
    }
    if (basketItems.length === 0 || totalItemCount === 0) {
      alert('Please add at least one item to basket.');
      return;
    }

    // Estimate liters
    const milkItem = basketItems.find((i) => i.product.category === 'milk');
    const liters = milkItem ? milkItem.quantity : 1.0;

    const newRecord: LedgerRecord = {
      id: `led-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase(),
      customerName: customerName,
      quantityLiters: liters,
      amount: grandTotal,
      status: 'PAID',
      itemsDescription: basketItems
        .filter((i) => i.quantity > 0)
        .map((i) => `${i.quantity}x ${i.product.name}`)
        .join(' • ')
    };

    onSaveEntry(newRecord);
    setLastSavedAmount(grandTotal);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex-grow flex flex-col pb-32 pt-4 px-4 sm:px-6 max-w-2xl mx-auto w-full">
      {/* Record Entry Header */}
      <section className="mb-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#001938] dark:text-white tracking-tight">
          Daily Entry
        </h2>
        <p className="text-xs sm:text-sm text-[#43474f] dark:text-[#a5acba] mt-0.5">
          Log daily milk distribution and update the ledger.
        </p>
      </section>

      {/* Customer Identity Section */}
      <section className="bg-white dark:bg-[#141b27] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,46,93,0.08)] border-l-4 border-[#feb71a] border border-[#e3e2e7] dark:border-white/10 mb-5 relative overflow-hidden">
        <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none text-[#001938] dark:text-white">
          <span className="material-symbols-outlined text-7xl">person</span>
        </div>

        <div className="space-y-3 relative z-10">
          <div>
            <label className="text-[11px] font-bold text-[#001938] dark:text-[#feb71a] uppercase tracking-wider block mb-1">
              Customer Name / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Search customer name or ID..."
                className="w-full bg-[#fffdf5] dark:bg-[#1a2332] text-[#001938] dark:text-white placeholder-[#737780] border-2 border-[#002e5d]/30 dark:border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#feb71a] focus:border-[#feb71a] transition-all text-sm font-medium focus:outline-none"
              />
              <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#002e5d] dark:text-[#feb71a]">
                search
              </span>
            </div>
          </div>

          {/* Quick chip suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {customerSuggestions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCustomerName(name)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                  customerName === name
                    ? 'bg-[#002e5d] text-white'
                    : 'bg-[#f4f3f8] dark:bg-[#1a2332] text-[#43474f] dark:text-[#a5acba] hover:bg-[#e3e2e7]'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Marigold Divider */}
      <div className="marigold-divider mb-5 opacity-50"></div>

      {/* Product Cart Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-base sm:text-lg text-[#001938] dark:text-white">
            Items in Basket
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-[#002e5d] text-[#d5e3ff] text-xs font-bold px-3 py-1 rounded-full">
              {totalItemCount} Items Selected
            </span>
            <button
              onClick={() => setShowCatalog(!showCatalog)}
              className="text-xs font-bold text-[#7d5700] dark:text-[#feb71a] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-sm">
                {showCatalog ? 'close' : 'add_circle'}
              </span>
              {showCatalog ? 'Close Catalog' : '+ Add Item'}
            </button>
          </div>
        </div>

        {/* Catalog Drawer / Quick Add */}
        {showCatalog && (
          <div className="mb-4 p-3 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl border border-[#feb71a]/40 animate-fadeIn">
            <p className="text-xs font-bold text-[#001938] dark:text-white mb-2 uppercase tracking-wider">
              Add More From Dairy Store
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => onAddProductToBasket(prod)}
                  className="bg-white dark:bg-[#141b27] p-2 rounded-lg border border-[#e3e2e7] dark:border-white/10 text-left hover:border-[#feb71a] transition-all flex flex-col justify-between text-xs cursor-pointer active:scale-95 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 font-bold text-[#001938] dark:text-white">
                    <span className="material-symbols-outlined text-sm text-[#7d5700] dark:text-[#feb71a]">
                      {prod.icon}
                    </span>
                    <span className="truncate">{prod.name}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[11px] text-[#737780]">
                    <span>₹{prod.price}</span>
                    <span className="text-[#feb71a] font-bold">+ Add</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Basket Items List */}
        <div className="space-y-3">
          {basketItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-white dark:bg-[#141b27] rounded-2xl p-4 flex items-center gap-4 shadow-[0_4px_12px_rgba(0,46,93,0.06)] border border-[#e3e2e7] dark:border-white/10 hover:border-[#feb71a] transition-colors"
            >
              <div className="h-14 w-14 bg-[#eeedf2] dark:bg-[#1a2332] rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#002e5d] dark:text-[#feb71a] text-2xl">
                  {item.product.icon}
                </span>
              </div>

              <div className="flex-grow">
                <h4 className="font-bold text-sm sm:text-base text-[#001938] dark:text-white leading-tight">
                  {item.product.name}
                </h4>
                <p className="text-xs text-[#737780] dark:text-[#a5acba] mt-0.5">
                  ₹{item.product.price.toFixed(2)} / {item.product.unit}
                </p>
                <p className="text-[11px] font-semibold text-[#7d5700] dark:text-[#feb71a]">
                  Subtotal: ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center bg-[#f4f3f8] dark:bg-[#1a2332] rounded-full p-1 border border-[#c3c6d0]/40 shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#242f42] text-[#001938] dark:text-white flex items-center justify-center shadow-xs hover:bg-[#feb71a] transition-colors active:scale-90 cursor-pointer"
                  title="Decrease"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#001938] dark:text-white">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#242f42] text-[#001938] dark:text-white flex items-center justify-center shadow-xs hover:bg-[#feb71a] transition-colors active:scale-90 cursor-pointer"
                  title="Increase"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          ))}

          {basketItems.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-[#141b27] rounded-2xl border border-dashed border-[#c3c6d0]">
              <span className="material-symbols-outlined text-4xl text-[#737780]">
                remove_shopping_cart
              </span>
              <p className="text-sm font-semibold text-[#001938] dark:text-white mt-2">
                Your basket is empty
              </p>
              <button
                onClick={() => setShowCatalog(true)}
                className="mt-3 bg-[#feb71a] text-[#6b4b00] px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer"
              >
                + Browse Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Summary & Action Section */}
      <section className="space-y-4">
        {/* Total Summary Card (Marigold Yellow) */}
        <div className="bg-[#feb71a] rounded-2xl p-5 shadow-lg relative overflow-hidden text-[#6b4b00]">
          {/* Subtle clay pot mask */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-8xl">soup_kitchen</span>
          </div>

          <div className="flex justify-between items-start mb-3 relative z-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                Order Summary
              </p>
              <h3 className="font-serif text-3xl font-bold mt-0.5 leading-none">
                ₹ {grandTotal.toFixed(2)}
              </h3>
            </div>
            <div className="bg-white/40 backdrop-blur-xs rounded-lg px-2.5 py-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">receipt_long</span>
              <span className="text-[10px] font-bold tracking-wider">{invoiceNumber}</span>
            </div>
          </div>

          <div className="space-y-1 border-t border-[#6b4b00]/15 pt-2.5 text-xs opacity-90 relative z-10">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold">₹ {itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery &amp; Packaging Fee</span>
              <span className="font-semibold">₹ {itemsTotal > 0 ? deliveryFee.toFixed(2) : '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Big Action Button (Vibrant Saffron) */}
        <button
          onClick={handleConfirm}
          disabled={basketItems.length === 0}
          className="w-full bg-[#feb71a] hover:bg-[#ffba2c] disabled:opacity-50 disabled:cursor-not-allowed text-[#6b4b00] font-bold text-base sm:text-lg py-4 rounded-2xl shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Confirm &amp; Save Entry</span>
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
            arrow_forward_ios
          </span>
        </button>

        {/* Quick Note */}
        <p className="text-center text-[#737780] dark:text-[#a5acba] text-xs flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-sm text-[#002e5d] dark:text-[#feb71a]">
            verified
          </span>
          Entry will be reflected in {deliveryPartnerName}'s Milk Ledger immediately.
        </p>
      </section>

      {/* Confirmation Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141b27] rounded-[28px] max-w-sm w-full p-6 text-center shadow-2xl border-4 border-[#feb71a] animate-scaleUp">
            <div className="w-16 h-16 bg-[#feb71a] text-[#6b4b00] rounded-full mx-auto flex items-center justify-center shadow-md mb-3">
              <span className="material-symbols-outlined text-3xl font-bold">check</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#001938] dark:text-white">
              Entry Saved!
            </h3>
            <p className="text-xs text-[#43474f] dark:text-[#a5acba] mt-1">
              Logged <span className="font-bold text-[#001938] dark:text-white">₹{lastSavedAmount.toFixed(2)}</span> for{' '}
              <span className="font-bold text-[#001938] dark:text-white">{customerName}</span>.
            </p>

            <div className="my-4 py-3 bg-[#f4f3f8] dark:bg-[#1a2332] rounded-xl text-left px-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#737780]">Invoice ID:</span>
                <span className="font-mono font-bold">{invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737780]">Status:</span>
                <span className="text-emerald-700 font-bold">RECORDED IN LEDGER</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('history');
                }}
                className="flex-1 bg-[#001938] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#002e5d] cursor-pointer"
              >
                View in History
              </button>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="flex-1 bg-[#feb71a] text-[#6b4b00] py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#ffba2c] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
