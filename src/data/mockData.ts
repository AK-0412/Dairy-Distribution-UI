import { DeliveryStop, LedgerRecord, Product, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Buffalo Milk',
    unit: 'Litre',
    price: 64.0,
    category: 'milk',
    icon: 'water_drop',
    description: 'Rich, creamy 7.5% fat buffalo milk fresh from morning milking.',
  },
  {
    id: 'p2',
    name: 'Creamy Paneer',
    unit: '200g',
    price: 120.0,
    category: 'paneer',
    icon: 'icecream',
    description: 'Fresh malai cottage cheese, soft and unadulterated.',
  },
  {
    id: 'p3',
    name: 'Pure Cow Ghee',
    unit: '500ml',
    price: 550.0,
    category: 'ghee',
    icon: 'energy_savings_leaf',
    description: 'Traditional bilona churned A2 desi cow ghee with rich aroma.',
  },
  {
    id: 'p4',
    name: 'Farm Fresh Cow Milk',
    unit: 'Litre',
    price: 58.0,
    category: 'milk',
    icon: 'local_drink',
    description: 'Light, nutrient-dense natural desi cow milk untouched by hand.',
  },
  {
    id: 'p5',
    name: 'Artisanal Clay Pot Curd',
    unit: '400g',
    price: 50.0,
    category: 'curd',
    icon: 'cookie',
    description: 'Naturally fermented thick curd set in earthen pots.',
  },
  {
    id: 'p6',
    name: 'Cultured White Butter (Makhan)',
    unit: '250g',
    price: 160.0,
    category: 'specialty',
    icon: 'breakfast_dining',
    description: 'Freshly churned unsalted white butter, classic village style.',
  },
  {
    id: 'p7',
    name: 'Wild Forest Raw Honey',
    unit: '350g',
    price: 320.0,
    category: 'specialty',
    icon: 'hive',
    description: 'Unprocessed organic multi-floral forest honey.',
  }
];

export const INITIAL_STOPS: DeliveryStop[] = [
  {
    id: 'stop-04',
    stopNumber: '04',
    customerName: 'Shanti Niwas, Sector 4',
    address: 'Plot 18, Shanti Niwas, Sector 4, Gandhinagar',
    itemsSummary: '2L Buffalo Milk • 500g Ghee',
    status: 'pending',
    amountDue: 278,
    phone: '+91 98250 12345'
  },
  {
    id: 'stop-05',
    stopNumber: '05',
    customerName: 'B-402, Royal Residency',
    address: 'B-402, Royal Residency, VIP Road',
    itemsSummary: '1.5L Cow Milk',
    status: 'pending',
    amountDue: 87,
    phone: '+91 98791 67890'
  },
  {
    id: 'stop-urgent',
    stopNumber: '!',
    customerName: 'C-12, Green Park',
    address: 'C-12, Green Park Society, Main Gate',
    itemsSummary: 'New Subscription • Collect Payment',
    status: 'pending',
    isUrgent: true,
    urgentNote: 'Collect monthly advance cheque / cash payment & deliver welcome starter kit.',
    amountDue: 1850,
    phone: '+91 94260 99881'
  },
  {
    id: 'stop-06',
    stopNumber: '06',
    customerName: 'A-108, Surya Enclave',
    address: 'A-108, Surya Enclave, Near Temple',
    itemsSummary: '2L Buffalo Milk • 200g Paneer',
    status: 'delivered',
    amountDue: 248,
    phone: '+91 99044 11223'
  },
  {
    id: 'stop-07',
    stopNumber: '07',
    customerName: 'Villa 9, Palm Meadows',
    address: 'Villa 9, Palm Meadows, Ring Road',
    itemsSummary: '3L Cow Milk • 1L Ghee',
    status: 'pending',
    amountDue: 1274,
    phone: '+91 98240 55667'
  }
];

export const INITIAL_LEDGER_RECORDS: LedgerRecord[] = [
  {
    id: 'led-1',
    date: '24 OCT 2026',
    customerName: 'Meera Iyer',
    quantityLiters: 2.5,
    amount: 175.0,
    status: 'PAID',
    itemsDescription: '2.5L Buffalo Milk (Daily morning delivery)'
  },
  {
    id: 'led-2',
    date: '23 OCT 2026',
    customerName: 'Rajesh Kumar',
    quantityLiters: 1.0,
    amount: 70.0,
    status: 'PENDING',
    itemsDescription: '1L Buffalo Milk • Cash pending on weekend'
  },
  {
    id: 'led-3',
    date: '22 OCT 2026',
    customerName: 'Ananya Sharma',
    quantityLiters: 1.5,
    amount: 105.0,
    status: 'PAID',
    itemsDescription: '1.5L Farm Cow Milk (UPI payment received)'
  },
  {
    id: 'led-4',
    date: '21 OCT 2026',
    customerName: 'Vikram Singh',
    quantityLiters: 0.5,
    amount: 35.0,
    status: 'PAID',
    itemsDescription: '0.5L Buffalo Milk'
  },
  {
    id: 'led-5',
    date: '20 OCT 2026',
    customerName: 'Dr. Sunita Patel',
    quantityLiters: 2.0,
    amount: 140.0,
    status: 'PAID',
    itemsDescription: '2L Buffalo Milk + 200g Fresh Paneer'
  },
  {
    id: 'led-6',
    date: '19 OCT 2026',
    customerName: 'Alok Nath Mishra',
    quantityLiters: 3.0,
    amount: 210.0,
    status: 'PENDING',
    itemsDescription: '3L Buffalo Milk • Ledger balance due'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Aravind Kumar',
  role: 'Premium Partner',
  phone: '+91 98254 78901',
  address: 'Shop 14, Dudh Sagar Heritage Depot, Sector 4, Gandhinagar',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBohSIZWDzgvsvbqEpBY6LFFZxZ3PMv7pPRRsKIoQm8VYI2bkKVPCL0J2LxMVG6r_9CB59YXSF-1OxC2y8aZRJjXBXYQ7jhw6sSqVjRyZvY2wzsB55J5Tf2grL3wMvuogVYuNzkqnHFb0TVyIkQKs9xQhM65JUnBnwxv0V_N8f4W_Ga43-CMlfU-O41HhrpusgyOzLK_Xp6ZjK9poIz9lXdQgYm5Ekb8MB513cD5W-_SGMY3X32nn0oUrminXuV5KHxlM0mLlebF9_J',
  route: 'Route #4 (Sector 3, 4 & Royal Residency)',
  notificationsEnabled: true,
  theme: 'light',
  language: 'en'
};

export const COMMON_ASSETS = {
  milkPailHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNM2wchVHsLLqvuL-AatNRk1UaumsbBkdWgpDTWYqMHdPE8o12JvUHc3z5aMqP6r0p_unN1jhy5S51Wa0tqRlmlME6y8Yl5TylYPmqmy-A5qcgjGmqx6Nfc-5VQ9xc6uzZsr7rgEaFCUHPX4znjfrUlegPEo514ZU4tcjYDOwg32ca3m5BmSlIHMynxSGVuDQgFhuUY6uk-p__qcu-VCgVDFFpAFAiSJC-MwbJaaBT_gc3q6kV2ByvBtW_dWY8gvPdzMHoGut93ViG',
  welcomeAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA39LP_pGc6v5RAnln4Xzdxl__DI_ibS8fH5MXggk1pqoMYZ9ddMFqsGelzq-IKXBqwNBTX_scbSNdf7X_ES9uJO9fcDvEAiMCcT7Py8PYHBwn_klBZcDzZLrDgO1f8hmY1D92qK3AeI_576-OctUjVeeFrlHkXQUF4QGM862AKevwEUTjgPkYlJnWaCyAC4cU5_uClZRgx7wu-9XTRO4w6XzAl0wLI5uWoKAWvSMS0QDF9Cz52I8jX-hk_EXmdqwEPrSez1mEj1Szt',
  partnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBohSIZWDzgvsvbqEpBY6LFFZxZ3PMv7pPRRsKIoQm8VYI2bkKVPCL0J2LxMVG6r_9CB59YXSF-1OxC2y8aZRJjXBXYQ7jhw6sSqVjRyZvY2wzsB55J5Tf2grL3wMvuogVYuNzkqnHFb0TVyIkQKs9xQhM65JUnBnwxv0V_N8f4W_Ga43-CMlfU-O41HhrpusgyOzLK_Xp6ZjK9poIz9lXdQgYm5Ekb8MB513cD5W-_SGMY3X32nn0oUrminXuV5KHxlM0mLlebF9_J',
  managerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIlq7__qe9KN9nSOdbYDgncx0OOjdAUAmpvklucIhF-2azO6NUUsnUqxu4x_BbBVeWo0_nFFOxdnPZBStXYfOTd8Vtko2iRJEm8ss5lssqXN5JQb9EzMgpoktWsNkBob2P9AYpq5Sn3kzqQLwZm9yygPVpjFyk1zKBsk8IdQkYIffXK8YzH05jAQwch6P_3J1l5eosFWelu-wvJxkOyJk-kkmL-Hw90FfIU0iCf3GLR3GBdKJPm05qXSavEutOWaqqmrOytXAH1QOP',
  historyAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5-KSOSKtd6XhA3PbKw6UWpw49MC5zuVyPVB2AsvECeimh32uJd88DJBjuntZnFxsKSMV0Biq6ufaBXgj9j6TJ6L16ggoPBB1TMEzQc9aBgA4E4HxlDOQq8u2Pih3vFkJGVHKL08oVn4CgJcIABHIA3_ow-YGtJJ4ajpFo3GMxPzHJWVeLPRcnhx8ALdDOgPXti3ADOyuVQDoZZm-GtCOPgQFoJB8HJa07aH6V578mZ13a8hfUm5nhBMuJZS98J_Np-4QqWyIxiePs',
  settingsAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77SHnRqhRh55pIdJxkn3aoPXr_6idPtqNX0DqEbi4IJkMrDyeRY3jJJ1xqgxU0kcGzK28Skeb38G4Ri3LbpK1FjyRK23hdrnAGvNh4joAx8qzryFrTKRTRBT8D0v4do27sKmFO3JAxcTqYM42xyU3Wcsc_9ns8ufXbgmjWpYoe5DDc2OkeWFwXUCHjbOYAlhII9itOdef4G_2b0MD5EfCQDyByRwDw8x0fltOviUFrN20C7uI95UfqX2YCcCk-EHoyt9Lpz5zq5a_',
  googleGLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIOyujqkT8k4g8XicVoGfUU9ewjdxLxcbnirDFM9aA3j_Do3He2Y7JlnelHpA1OyYjCLF5elqxB8qNtHWz2OkHb_fVgYGKg6fDHrgjsEiLQ5caQuKthOsB_VbfEoLFw511oqHNXUxB4VaxyMZlt21IlrA8Dkj-lEJV4Lg6PtIITtYhXag1RudK8q49a-Ywh7RuSiRjhxApuTwYq9kqM3Mm40NJL1T6PzZkepgjnj7Renxtss0ObZl0YKgb_mX_8trr8KoQLVfs02Rh',
  clayPotGraphic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw8yLhERZyIEuHC7-sbSWsSRbTb6Cm2TiAyb_dNAYyAqjjaDhus9rWPfs-nViMY_Cyk4h3lZYVdZ2HKx05vqtgCUK9v4eMTUOlL6lhtEyTqat-8yDo-hjmCUedVVCSXjHiCjzymDSqWnAmtdDcZmRfiMTi9Uwuu_gZEa_TqRS2Vcr1C9iWiioSi57K2rmudCrmVEnTKROTnvoHEKVQP9NiRXirCTakW22MFPcdalfvznsGAezVwVb0AeVAR9mA-df4ZVlec30eQHDM'
};
