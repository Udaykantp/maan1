import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { PRODUCTS, type Product, type ProductVariant } from '../data/catalog';

export interface StoredBagItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartEntry {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface OrderRecord {
  orderNumber: string;
  date: string;
  customerName: string;
  pinCode: string;
  address: string;
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  totalPaid: number;
  items: {
    name: string;
    brand: string;
    variantLabel: string;
    quantity: number;
    price: number;
  }[];
}

interface StoreContextValue {
  bagItems: CartEntry[];
  totalBagCount: number;
  wishlistIds: string[];
  user: UserProfile | null;
  orders: OrderRecord[];
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
  getBagQuantity: (productId: string, variantId: string) => number;
  addToBag: (product: Product, variantId: string, quantity?: number) => void;
  updateBagQty: (productId: string, variantId: string, delta: number) => void;
  removeFromBag: (productId: string, variantId: string) => void;
  clearBag: () => void;
  toggleWishlist: (productId: string) => void;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;
  addOrder: (order: OrderRecord) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const BAG_STORAGE_KEY = 'maan_bag_v2';
const WISHLIST_STORAGE_KEY = 'maan_wishlist_v2';
const USER_STORAGE_KEY = 'maan_user_v1';
const ORDERS_STORAGE_KEY = 'maan_orders_v1';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bagRecords, setBagRecords] = useState<StoredBagItem[]>(() => {
    try {
      const raw = localStorage.getItem(BAG_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bagRecords));
    } catch {
      // Ignore storage quota issues
    }
  }, [bagRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota issues
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota issues
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota issues
    }
  }, [orders]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const bagItems: CartEntry[] = useMemo(() => {
    return bagRecords
      .map((entry) => {
        const product = PRODUCTS.find((p) => p.id === entry.productId);
        if (!product) return null;
        const variant =
          product.variants.find((v) => v.id === entry.variantId) ??
          product.variants[0];
        return { product, variant, quantity: entry.quantity };
      })
      .filter((item): item is CartEntry => item !== null);
  }, [bagRecords]);

  const totalBagCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + item.quantity, 0),
    [bagItems],
  );

  const getBagQuantity = (productId: string, variantId: string) => {
    return (
      bagRecords.find(
        (item) => item.productId === productId && item.variantId === variantId,
      )?.quantity ?? 0
    );
  };

  const addToBag = (product: Product, variantId: string, quantity = 1) => {
    setBagRecords((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.variantId === variantId,
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { productId: product.id, variantId, quantity }];
    });
    setToastMessage(`Added ${product.name} to Bag`);
  };

  const updateBagQty = (productId: string, variantId: string, delta: number) => {
    setBagRecords((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromBag = (productId: string, variantId: string) => {
    setBagRecords((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantId === variantId),
      ),
    );
  };

  const clearBag = () => setBagRecords([]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      setToastMessage(
        exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
      );
      return exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
    });
  };

  const loginUser = (profile: UserProfile) => {
    setUser(profile);
    setToastMessage(`Welcome to Maan, ${profile.name}`);
  };

  const logoutUser = () => {
    setUser(null);
    setToastMessage('Signed out of Maan');
  };

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        bagItems,
        totalBagCount,
        wishlistIds,
        user,
        orders,
        isBagOpen,
        setIsBagOpen,
        toastMessage,
        showToast: setToastMessage,
        clearToast: () => setToastMessage(null),
        getBagQuantity,
        addToBag,
        updateBagQty,
        removeFromBag,
        clearBag,
        toggleWishlist,
        loginUser,
        logoutUser,
        addOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
