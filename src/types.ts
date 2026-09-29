export type ScreenType = 'welcome' | 'login' | 'home' | 'cart' | 'history' | 'settings';

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: 'milk' | 'ghee' | 'paneer' | 'curd' | 'specialty';
  icon: string;
  description?: string;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface DeliveryStop {
  id: string;
  stopNumber: string;
  customerName: string;
  address: string;
  itemsSummary: string;
  status: 'pending' | 'delivered';
  isUrgent?: boolean;
  urgentNote?: string;
  amountDue?: number;
  phone?: string;
}

export interface LedgerRecord {
  id: string;
  date: string;
  customerName: string;
  quantityLiters: number;
  amount: number;
  status: 'PAID' | 'PENDING';
  itemsDescription?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  phone: string;
  address: string;
  avatarUrl: string;
  route: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi' | 'mr';
}
