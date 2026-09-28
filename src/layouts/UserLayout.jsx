import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, Recycle, MapPin, Trophy, ShoppingBag, ShoppingCart, Menu, X, LogOut, Leaf } from "lucide-react";
import { useApp } from "../context/AppContext";
import NotificationDropdown from "../components/NotificationDropdown";

const links = [
  ["/", "Home", Home], ["/pickup", "Pickup", Recycle], ["/schedule", "Schedule", MapPin],
  ["/tracking", "Tracking", MapPin], ["/rewards", "History & Rewards", Trophy],
  ["/shopping", "Shopping", ShoppingBag], ["/cart", "Cart", ShoppingCart]
];

export default function UserLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const doLogout = () => { logout(); navigate("/login"); };

  return <div className="app-shell">
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Leaf size={21}/></div><div><strong>RePlast</strong><small>Recycle. Reward. Repeat.</small></div></div>
      <nav>{links.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>
      <button className="logout-link" onClick={doLogout}><LogOut size={19}/>Logout</button>
    </aside>
    {open && <div className="mobile-overlay" onClick={() => setOpen(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setOpen(true)}><Menu/></button>
        <div className="topbar-spacer"/>
        <NotificationDropdown/>
        <div className="wallet-pill">♻ <span>{user?.points || 0} pts</span></div>
        <div className="avatar">{(user?.name || "U")[0]}</div>
      </header>
      <div className="page-content"><Outlet/></div>
    </main>
  </div>;
}
