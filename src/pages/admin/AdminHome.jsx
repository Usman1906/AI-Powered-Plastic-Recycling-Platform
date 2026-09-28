import React from "react";
import { Users, Recycle, Clock3, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function AdminHome(){
 const {users,pickups}=useApp(); const pending=pickups.filter(p=>p.status==="pending").length; const scheduled=pickups.filter(p=>p.status==="scheduled").length; const recycled=pickups.filter(p=>p.status==="recycled").reduce((a,p)=>a+Number(p.quantity),0); const points=pickups.filter(p=>p.status==="recycled").reduce((a,p)=>a+p.rewardPoints,0);
 return <div><div className="page-title"><div><span className="eyebrow">ADMIN CONTROL CENTER</span><h1>Operations dashboard</h1><p>Manage the RePlast recycling network.</p></div></div>
 <div className="stats-grid"><StatCard icon={Users} label="Registered users" value={users.length}/><StatCard icon={Clock3} label="Pending pickups" value={pending}/><StatCard icon={Recycle} label="Scheduled pickups" value={scheduled}/><StatCard icon={Scale} label="Plastic recycled" value={`${recycled.toFixed(1)} kg`} /></div>
 <div className="dashboard-grid"><div className="panel"><div className="panel-head"><div><h3>Pickup pipeline</h3><p>Current platform activity.</p></div><Link to="/admin/schedules">Manage <ArrowRight size={15}/></Link></div>{pickups.slice(0,7).map(p=><div className="activity-row" key={p.id}><div className="activity-icon"><Recycle size={17}/></div><div><strong>{p.plasticType}</strong><span>{p.quantity} kg · {p.address}</span></div><StatusBadge status={p.status}/></div>)}</div>
 <div className="panel impact-admin"><h3>Reward distribution</h3><div className="big-number">{points}</div><p>points distributed through completed recycling</p><div className="progress"><span style={{width:`${Math.min(100,points/30)}%`}}/></div><small>Completed recycling rewards</small></div></div>
 </div>;
}
