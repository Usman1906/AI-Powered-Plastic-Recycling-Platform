import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useApp } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserHome from "./pages/user/Home";
import Pickup from "./pages/user/Pickup";
import Schedule from "./pages/user/Schedule";
import Tracking from "./pages/user/Tracking";
import HistoryRewards from "./pages/user/HistoryRewards";
import Shopping from "./pages/user/Shopping";
import Cart from "./pages/user/Cart";
import AdminHome from "./pages/admin/AdminHome";
import ManageUsers from "./pages/admin/ManageUsers";
import CreateSchedules from "./pages/admin/CreateSchedules";

export default function App() {
  const { currentUser } = useApp();

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to={currentUser.role === "admin" ? "/admin" : "/"} replace /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <Signup />} />

      <Route element={<ProtectedRoute role="user" />}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/rewards" element={<HistoryRewards />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/schedules" element={<CreateSchedules />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={currentUser ? (currentUser.role === "admin" ? "/admin" : "/") : "/login"} replace />} />
    </Routes>
  );
}
