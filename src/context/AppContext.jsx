import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const KEY = "replast_state_v1";

const seedProducts = [
  { id: 1, name: "Recycled Tote Bag", price: 350, description: "Durable everyday bag made from recycled material.", emoji: "👜" },
  { id: 2, name: "Bamboo Bottle", price: 500, description: "Reusable insulated bottle for a greener routine.", emoji: "🍶" },
  { id: 3, name: "Eco Notebook", price: 220, description: "Recycled-paper notebook with a minimal design.", emoji: "📓" },
  { id: 4, name: "Plantable Pencils", price: 180, description: "Seed-tipped pencils that can be planted after use.", emoji: "✏️" },
  { id: 5, name: "Recycled Planter", price: 420, description: "Modern planter created from recovered plastic.", emoji: "🪴" },
  { id: 6, name: "Eco Lunch Box", price: 650, description: "Reusable lunch box designed to replace disposables.", emoji: "🥡" }
];

const seedState = {
  users: [
    { id: 101, name: "Rahul Kumar", email: "rahul@example.com", phone: "9876543210", password: "123456", role: "user", points: 1250, recycledKg: 18.5 },
    { id: 102, name: "Priya Sharma", email: "priya@example.com", phone: "9876501234", password: "123456", role: "user", points: 1980, recycledKg: 26 }
  ],
  pickups: [
    {
      id: 9001, userId: 101, plasticType: "PET Bottles", quantity: 6, description: "Clean plastic bottles",
      image: "", address: "Khammam, Telangana", lat: 17.2473, lng: 80.1514,
      status: "recycled", rewardPoints: 600, date: "2026-08-18", slot: "10:00 AM - 11:00 AM",
      createdAt: "2026-08-10"
    },
    {
      id: 9002, userId: 101, plasticType: "HDPE", quantity: 4, description: "Household containers",
      image: "", address: "Khammam, Telangana", lat: 17.2473, lng: 80.1514,
      status: "approved", rewardPoints: 400, date: "", slot: "", createdAt: "2026-09-04",
      availableDates: ["2026-09-10", "2026-09-11", "2026-09-12"],
      slots: ["09:00 AM - 10:00 AM", "12:00 PM - 01:00 PM", "03:00 PM - 04:00 PM", "05:00 PM - 06:00 PM"]
    }
  ],
  notifications: [
    { id: 7001, userId: 101, title: "Pickup approved", message: "Your HDPE pickup was approved. Choose a date and time slot.", link: "/schedule", read: false, createdAt: "2026-09-04" }
  ],
  orders: [],
  products: seedProducts
};

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : seedState;
  } catch {
    return seedState;
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("replast_current_user") || "null"); } catch { return null; }
  });

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  useEffect(() => {
    if (currentUser) localStorage.setItem("replast_current_user", JSON.stringify(currentUser));
    else localStorage.removeItem("replast_current_user");
  }, [currentUser]);

  const login = (email, password) => {
    if (email === "admin@123" && password === "123789") {
      const admin = { id: 1, name: "RePlast Admin", email, role: "admin" };
      setCurrentUser(admin);
      return { ok: true, user: admin };
    }
    const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { ok: false, message: "Invalid email or password." };
    setCurrentUser(user);
    return { ok: true, user };
  };

  const signup = ({ name, email, phone, password }) => {
    if (state.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    const user = { id: Date.now(), name, email, phone, password, role: "user", points: 0, recycledKg: 0 };
    setState(s => ({ ...s, users: [...s.users, user] }));
    setCurrentUser(user);
    return { ok: true, user };
  };

  const logout = () => setCurrentUser(null);

  const addPickup = (payload) => {
    const pickup = {
      ...payload,
      id: Date.now(),
      userId: currentUser.id,
      status: "pending",
      rewardPoints: 0,
      date: "",
      slot: "",
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setState(s => ({ ...s, pickups: [pickup, ...s.pickups] }));
    return pickup;
  };

  const approvePickup = (id, rewardPoints, availableDates, slots) => {
    setState(s => ({
      ...s,
      pickups: s.pickups.map(p => p.id === id ? { ...p, status: "approved", rewardPoints: Number(rewardPoints), availableDates, slots } : p),
      notifications: [
        {
          id: Date.now(), userId: s.pickups.find(p => p.id === id)?.userId,
          title: "Pickup approved", message: "Your pickup request was approved. Select a schedule.",
          link: "/schedule", read: false, createdAt: new Date().toISOString().slice(0, 10)
        },
        ...s.notifications
      ]
    }));
  };

  const rejectPickup = (id) => setState(s => ({
    ...s,
    pickups: s.pickups.map(p => p.id === id ? { ...p, status: "rejected" } : p)
  }));

  const schedulePickup = (id, date, slot) => setState(s => ({
    ...s,
    pickups: s.pickups.map(p => p.id === id ? { ...p, status: "scheduled", date, slot } : p),
    notifications: s.notifications.map(n => n.userId === currentUser.id && n.link === "/schedule" ? { ...n, read: true } : n)
  }));

  const updatePickupStatus = (id, status) => {
    setState(s => {
      const pickup = s.pickups.find(p => p.id === id);
      const user = s.users.find(u => u.id === pickup?.userId);
      let users = s.users;
      if (pickup && user && status === "recycled" && pickup.status !== "recycled") {
        users = s.users.map(u => u.id === user.id ? { ...u, points: u.points + pickup.rewardPoints, recycledKg: u.recycledKg + Number(pickup.quantity) } : u);
      }
      return { ...s, pickups: s.pickups.map(p => p.id === id ? { ...p, status } : p), users };
    });
  };

  const markNotificationsRead = () => setState(s => ({
    ...s,
    notifications: s.notifications.map(n => n.userId === currentUser?.id ? { ...n, read: true } : n)
  }));

  const redeem = (product, quantity) => {
    const total = product.price * quantity;
    const user = state.users.find(u => u.id === currentUser.id);
    if (!user || user.points < total) return { ok: false, message: "Insufficient reward points." };
    const order = { id: Date.now(), userId: user.id, items: [{ ...product, quantity }], total, date: new Date().toISOString().slice(0,10) };
    setState(s => ({
      ...s,
      users: s.users.map(u => u.id === user.id ? { ...u, points: u.points - total } : u),
      orders: [order, ...s.orders]
    }));
    setCurrentUser(u => ({ ...u, points: u.points - total }));
    return { ok: true, order };
  };

  const cart = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(`replast_cart_${currentUser?.id}`) || "[]"); } catch { return []; }
  }, [currentUser?.id]);

  const setCart = (items) => {
    localStorage.setItem(`replast_cart_${currentUser?.id}`, JSON.stringify(items));
    window.dispatchEvent(new Event("replast-cart-change"));
  };

  const addToCart = (product) => setCart([...cart, { ...product, cartId: Date.now(), quantity: 1 }]);
  const removeFromCart = (cartId) => setCart(cart.filter(x => x.cartId !== cartId));
  const changeQty = (cartId, quantity) => setCart(cart.map(x => x.cartId === cartId ? { ...x, quantity: Math.max(1, quantity) } : x));
  const clearCart = () => setCart([]);

  const refreshCurrentUser = () => {
    if (!currentUser || currentUser.role === "admin") return;
    const fresh = state.users.find(u => u.id === currentUser.id);
    if (fresh) setCurrentUser(fresh);
  };

  useEffect(refreshCurrentUser, [state.users]);

  const user = currentUser?.role === "user" ? state.users.find(u => u.id === currentUser.id) || currentUser : currentUser;
  const userPickups = state.pickups.filter(p => p.userId === currentUser?.id);
  const userNotifications = state.notifications.filter(n => n.userId === currentUser?.id);

  const value = {
    ...state, user, currentUser, login, signup, logout, addPickup, approvePickup, rejectPickup,
    schedulePickup, updatePickupStatus, markNotificationsRead, redeem, cart, addToCart,
    removeFromCart, changeQty, clearCart, userPickups, userNotifications
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
