import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE_URL}/cart`;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id || user?.id;
  };

  const fetchCartFromBackend = useCallback(async () => {
    const userId = getUserId();
    const token = getToken();

    if (!userId || !token) {
      setCart({ items: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data || { items: [] });
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch cart:", response.status, errorText);
        setCart({ items: [] });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartFromBackend();
  }, [fetchCartFromBackend]);

  useEffect(() => {
    const handleStorageChange = () => {
      const userId = getUserId();
      if (userId) {
        fetchCartFromBackend();
      } else {
        setCart({ items: [] });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchCartFromBackend]);

  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      console.error("User not logged in - no token found");
      return false;
    }

    if (!product || !product._id) {
      console.error("Invalid product - missing _id");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
        return true;
      }

      const errorText = await response.text();
      console.error("Failed to add to cart:", response.status, errorText);
      return false;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/remove`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to remove from cart:", response.status);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const increaseQty = async (productId) => {
    const token = getToken();
    if (!token) return;

    const item = cart.items.find(
      (i) => i.productId?._id === productId || i.productId === productId
    );

    if (!item) return;

    try {
      const response = await fetch(`${API_URL}/update-quantity`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: item.quantity + 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to update quantity:", response.status);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQty = async (productId) => {
    const token = getToken();
    if (!token) return;

    const item = cart.items.find(
      (i) => i.productId?._id === productId || i.productId === productId
    );

    if (!item) return;

    try {
      const response = await fetch(`${API_URL}/update-quantity`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: item.quantity - 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to update quantity:", response.status);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/clear`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to clear cart:", response.status);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const loadCart = async () => {
    await fetchCartFromBackend();
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
        loadCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};