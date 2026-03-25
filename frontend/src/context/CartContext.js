import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE_URL}/cart`;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Get userId from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;
    return userId;
  };

  // Fetch cart from backend
  const fetchCartFromBackend = async () => {
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
  };

  // Load cart when component mounts or user logs in
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      fetchCartFromBackend();
    } else {
      setCart({ items: [] });
    }
  }, []);

  // Listen for storage changes (login/logout)
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
  }, []);

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
        console.log("Product added to cart successfully", data);
        setCart(data);
        return true;
      } else {
        const errorText = await response.text();
        console.error("Failed to add to cart:", response.status, errorText);
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();

    if (!token) {
      console.error("User not logged in");
      return;
    }

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

    if (!token) {
      console.error("User not logged in");
      return;
    }

    const item = cart.items.find(
      (i) => i.productId._id === productId || i.productId === productId,
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

    if (!token) {
      console.error("User not logged in");
      return;
    }

    const item = cart.items.find(
      (i) => i.productId._id === productId || i.productId === productId,
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

    if (!token) {
      console.error("User not logged in");
      return;
    }

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

  const loadCart = async (userId) => {
    // Reload cart from backend - useful after login
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
