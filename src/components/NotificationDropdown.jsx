import React, { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { userNotifications, markNotificationsRead } = useApp();
  const navigate = useNavigate();
  const unread = userNotifications.filter(n => !n.read).length;

  return (
    <div className="notification-wrap">
      <button className="icon-btn" onClick={() => { setOpen(v => !v); markNotificationsRead(); }} aria-label="Notifications">
        <Bell size={20}/>{unread > 0 && <span className="notification-dot">{unread}</span>}
      </button>
      {open && (
        <div className="notification-panel">
          <div className="panel-title"><strong>Notifications</strong><CheckCheck size={16}/></div>
          {userNotifications.length === 0 ? <p className="muted">No notifications yet.</p> : userNotifications.slice(0,5).map(n => (
            <button className="notification-item" key={n.id} onClick={() => navigate(n.link)}>
              <strong>{n.title}</strong><span>{n.message}</span><small>{n.createdAt}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
