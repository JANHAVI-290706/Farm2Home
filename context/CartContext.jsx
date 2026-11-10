import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { products } from "../data/products";

const CartContext = createContext(null);

const STORAGE_KEY = "farm2home_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : {};

      if (
        !parsedCart ||
        typeof parsedCart !== "object" ||
        Array.isArray(parsedCart)
      ) {
        return {};
      }

      const validCart = {};

      Object.entries(parsedCart).forEach(([id, quantity]) => {
        const productExists = products.some(
          (product) => product.id === Number(id)
        );

        const validQuantity = Number(quantity);

        if (
          productExists &&
          Number.isInteger(validQuantity) &&
          validQuantity > 0
        ) {
          validCart[id] = validQuantity;
        }
      });

      return validCart;
    } catch {
      return {};
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (productId, quantity = 1) => {
    const productExists = products.some(
      (product) => product.id === Number(productId)
    );

    const amount = Number(quantity);

    if (
      !productExists ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return;
    }

    setCart((previousCart) => ({
      ...previousCart,
      [productId]: (previousCart[productId] || 0) + amount,
    }));
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((previousCart) => {
      const updatedCart = { ...previousCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1) {
      return;
    }

    setCart((previousCart) => {
      if (!previousCart[productId]) {
        return previousCart;
      }

      return {
        ...previousCart,
        [productId]: amount,
      };
    });
  };

  // Clear entire cart and update localStorage immediately
  const clearCart = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    setCart({});
  };

  // Get complete product information for cart items
  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = products.find(
          (item) => item.id === Number(id)
        );

        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity,
          subtotal: product.price * quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  // Calculate total quantity
  const cartCount = useMemo(() => {
    return Object.values(cart).reduce(
      (total, quantity) => total + quantity,
      0
    );
  }, [cart]);

  // Calculate total price
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  }, [cartItems]);

  const value = {
    cart,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing cart
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}