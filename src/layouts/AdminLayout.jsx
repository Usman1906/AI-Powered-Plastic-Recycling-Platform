import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarClock, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { logout } = useApp();
  const navigate = useNavigate();
  return <div className="app-shell admin-shell">
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={21}/></div><div><strong>RePlast Admin</strong><small>Control Center</small></div></div>
      <nav>
        <NavLink to="/admin" end onClick={() => setOpen(false)}><LayoutDashboard size={19}/>Dashboard</NavLink>
        <NavLink to="/admin/users" onClick={() => setOpen(false)}><Users size={19}/>Manage Users</NavLink>
        <NavLink to="/admin/schedules" onClick={() => setOpen(false)}><CalendarClock size={19}/>Create Schedules</NavLink>
      </nav>
      <button className="logout-link" onClick={() => { logout(); navigate("/login"); }}><LogOut size={19}/>Logout</button>
    </aside>
    {open && <div className="mobile-overlay" onClick={() => setOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setOpen(true)}><Menu/></button><div className="topbar-spacer"/><span className="admin-chip">Administrator</span></header>
      <div className="page-content"><Outlet/></div>
    </main>
  </div>;
}
