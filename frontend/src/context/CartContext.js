import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id;
  };

  const loadCart = (userId) => {

    if (!userId) return;

    const storedCart = localStorage.getItem(`cart_${userId}`);

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  };

  useEffect(() => {

    const userId = getUserId();

    if (userId) {
      loadCart(userId);
    }

  }, []);

  const saveCart = (updatedCart) => {

    const userId = getUserId();

    if (!userId) return;

    localStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(updatedCart)
    );
  };

  const addToCart = (product) => {

    const existing = cart.find(item => item._id === product._id);

    let updatedCart;

    if (existing) {

      updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    } else {

      updatedCart = [
        ...cart,
        { ...product, quantity: 1 }
      ];

    }

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const removeFromCart = (id) => {

    const updatedCart = cart.filter(item => item._id !== id);

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const increaseQty = (id) => {

    const updatedCart = cart.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const decreaseQty = (id) => {

    const item = cart.find(i => i._id === id);

    let updatedCart;

    if (item.quantity === 1) {

      updatedCart = cart.filter(i => i._id !== id);

    } else {

      updatedCart = cart.map(i =>
        i._id === id
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );

    }

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};