import React, { useState } from "react";
import { CheckCircle2, XCircle, CalendarClock, Eye, Truck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";

function RequestCard({ p, user, onApprove, onReject, onStatus }) {
 const [points,setPoints]=useState(Math.round(Number(p.quantity)*100)); const [dates,setDates]=useState("2026-09-10,2026-09-11,2026-09-12"); const [slotText,setSlotText]=useState("09:00 AM - 10:00 AM,12:00 PM - 01:00 PM,03:00 PM - 04:00 PM,05:00 PM - 06:00 PM");
 const approve=()=>onApprove(p.id,points,dates.split(",").map(x=>x.trim()).filter(Boolean),slotText.split(",").map(x=>x.trim()).filter(Boolean));
 return <div className="request-card"><div className="request-head"><div><h3>{p.plasticType} · {p.quantity} kg</h3><p>Requested by <b>{user?.name}</b> · {p.createdAt}</p></div><StatusBadge status={p.status}/></div>
 <div className="request-body"><div><span>Address</span><strong>{p.address}</strong></div><div><span>Description</span><strong>{p.description}</strong></div>{p.image&&<img className="request-image" src={p.image} alt="Uploaded waste"/>}</div>
 {p.status==="pending"&&<div className="approval-controls"><label>Reward points<input type="number" min="0" value={points} onChange={e=>setPoints(e.target.value)}/></label><label>Available dates<input value={dates} onChange={e=>setDates(e.target.value)} /></label><label className="wide-control">Time slots<input value={slotText} onChange={e=>setSlotText(e.target.value)} /></label><div className="approval-actions"><button className="btn btn-primary" onClick={approve}><CheckCircle2 size={17}/>Approve & create schedule</button><button className="btn btn-danger" onClick={()=>onReject(p.id)}><XCircle size={17}/>Reject</button></div></div>}
 {p.status==="scheduled"&&<div className="admin-status-actions"><span>📅 {p.date} · ⏰ {p.slot}</span><button className="btn btn-secondary small" onClick={()=>onStatus(p.id,"picked")}><Truck size={15}/> Mark picked up</button></div>}
 {p.status==="picked"&&<div className="admin-status-actions"><span>Ready for recycling verification.</span><button className="btn btn-primary small" onClick={()=>onStatus(p.id,"recycled")}><CheckCircle2 size={15}/> Mark recycled</button></div>}
 {p.status==="recycled"&&<div className="success-strip">✓ Recycling completed · {p.rewardPoints} points awarded</div>}
 </div>;
}

export default function CreateSchedules(){
 const {pickups,users,approvePickup,rejectPickup,updatePickupStatus}=useApp(); const [filter,setFilter]=useState("all");
 const list=pickups.filter(p=>filter==="all"||p.status===filter);
 return <div><div className="page-title"><div><span className="eyebrow">OPERATIONS</span><h1>Pickup schedules</h1><p>Approve requests, assign rewards, create slots and update recycling status.</p></div><div className="title-icon"><CalendarClock/></div></div>
 <div className="filter-tabs">{["all","pending","approved","scheduled","picked","recycled"].map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
 <div className="request-list">{list.map(p=><RequestCard key={p.id} p={p} user={users.find(u=>u.id===p.userId)} onApprove={approvePickup} onReject={rejectPickup} onStatus={updatePickupStatus}/>)}{!list.length&&<div className="empty-page"><CalendarClock/><h2>No requests in this status</h2><p>New user pickup requests will appear here.</p></div>}</div>
 </div>;
}
