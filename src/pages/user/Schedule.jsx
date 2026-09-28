import React, { useState } from "react";
import { CalendarDays, Clock, LockKeyhole } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SuccessModal from "../../components/SuccessModal";

export default function Schedule() {
  const { userPickups, schedulePickup } = useApp();
  const pending = userPickups.find(p=>p.status==="approved");
  const [date,setDate]=useState(""); const [slot,setSlot]=useState(""); const [open,setOpen]=useState(false);
  const submit=e=>{e.preventDefault();if(!pending||!date||!slot)return;schedulePickup(pending.id,date,slot);setOpen(true);};
  if(!pending) return <div className="empty-page"><CalendarDays size={46}/><h2>No pickup waiting for scheduling</h2><p>When the recycling center approves a pickup, its available dates and time slots will appear here.</p></div>;
  return <div><div className="page-title"><div><span className="eyebrow">APPROVED PICKUP</span><h1>Choose your schedule</h1><p>Confirm a convenient date and time.</p></div></div>
    <form className="schedule-layout" onSubmit={submit}><div className="panel locked-info"><div className="panel-head"><div><h3>Pickup details</h3><p>These details were submitted and verified.</p></div><span className="locked"><LockKeyhole size={15}/> Locked</span></div>
      <div className="detail-grid"><div><span>Plastic type</span><strong>{pending.plasticType}</strong></div><div><span>Quantity</span><strong>{pending.quantity} kg</strong></div><div><span>Address</span><strong>{pending.address}</strong></div><div><span>Reward points</span><strong className="points">{pending.rewardPoints} pts</strong></div><div className="wide"><span>Description</span><strong>{pending.description}</strong></div></div></div>
      <div className="panel schedule-picker"><h3>Available slots</h3><p>Select one date and time.</p><label><CalendarDays size={17}/> Date<select value={date} onChange={e=>setDate(e.target.value)} required><option value="">Choose a date</option>{(pending.availableDates||[]).map(d=><option key={d} value={d}>{d}</option>)}</select></label><label><Clock size={17}/> Time slot<select value={slot} onChange={e=>setSlot(e.target.value)} required><option value="">Choose a time</option>{(pending.slots||[]).map(s=><option key={s}>{s}</option>)}</select></label><button className="btn btn-primary full">Confirm schedule</button></div></form>
    <SuccessModal open={open} title="Scheduled successfully" message={`Your pickup is scheduled for ${date} · ${slot}.`} onClose={()=>setOpen(false)}/>
  </div>;
}
