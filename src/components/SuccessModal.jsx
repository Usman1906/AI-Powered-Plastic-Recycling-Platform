import React from "react";
import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({ open, title, message, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card success-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20}/></button>
        <div className="success-icon"><CheckCircle2 size={58}/></div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>Continue</button>
      </div>
    </div>
  );
}
