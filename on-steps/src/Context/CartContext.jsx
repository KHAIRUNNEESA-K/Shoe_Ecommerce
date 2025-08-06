import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const updateUserCartInDB = async (userId, updatedCart) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    if (!res.ok) throw new Error("User not found");
    const user = await res.json();
    const updatedUser = { ...user, cart: updatedCart };

    const updateRes = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (!updateRes.ok) throw new Error("Failed to update cart");
  } catch (err) {
    console.error("Failed to update cart:", err);
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load userId once on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((user) => {
        const cartFromDB = user.cart || [];
        setCartItems(cartFromDB);
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartFromDB));
      })
      .catch((err) => {
        console.error("Error loading user/cart:", err.message);
        setCartItems([]);
        localStorage.removeItem("loggedInUser");
        setUserId(null);
      });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = useCallback(
    (product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.id === product.id && item.size === product.size
        );

        let updatedCart;

        if (existingItem) {
          updatedCart = prevItems.map((item) =>
            item.id === product.id && item.size === product.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prevItems, { ...product, quantity: 1 }];
        }

        if (userId) updateUserCartInDB(userId, updatedCart);
        return updatedCart;
      });
    },
    [userId]
  );

  const removeFromCart = (productId, productSize) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter(
        (item) => item.id !== productId || item.size !== productSize
      );
      if (userId) updateUserCartInDB(userId, updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, productSize, newQuantity) => {
    if (newQuantity <= 0) return;

    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId && item.size === productSize
          ? { ...item, quantity: newQuantity }
          : item
      );
      if (userId) updateUserCartInDB(userId, updatedCart);
      return updatedCart;
    });
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => {
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
