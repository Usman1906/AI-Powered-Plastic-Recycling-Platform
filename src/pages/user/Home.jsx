import React from "react";
import { Link } from "react-router-dom";
import { Recycle, Scale, Trophy, TreePine, ArrowRight, Clock3 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function Home() {
  const { user, userPickups } = useApp();
  const recycled = userPickups.filter(p=>p.status==="recycled").reduce((a,p)=>a+Number(p.quantity),0);
  const data = ["Apr","May","Jun","Jul","Aug","Sep"].map((month,i)=>({month, kg: Math.max(0, Math.round((recycled/6)*i*10)/10)}));
  return <div>
    <div className="hero-card"><div><span className="eyebrow">WELCOME BACK, {user?.name?.split(" ")[0]?.toUpperCase()}</span><h1>Make every piece of plastic count. 🌱</h1><p>Schedule a pickup, earn reward points, and see the difference you are making.</p><Link className="btn btn-light" to="/pickup">Start Recycling <ArrowRight size={17}/></Link></div><div className="hero-art">♻️</div></div>
    <div className="section-heading"><div><h2>Your impact</h2><p>Live stats from your recycling activity.</p></div></div>
    <div className="stats-grid"><StatCard icon={Recycle} label="Total Pickups" value={userPickups.length}/><StatCard icon={Scale} label="Plastic Recycled" value={`${(user?.recycledKg||recycled).toFixed(1)} kg`}/><StatCard icon={Trophy} label="Eco Wallet" value={`${user?.points||0} pts`}/><StatCard icon={TreePine} label="Impact Score" value={`${Math.round((user?.recycledKg||recycled)*2.1)}`} hint="estimated points"/></div>
    <div className="dashboard-grid"><div className="panel chart-panel"><div className="panel-head"><div><h3>Recycling trend</h3><p>Plastic recycled over time</p></div></div><div className="chart"><ResponsiveContainer width="100%" height={260}><AreaChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="kg" stroke="#15803d" fill="#bbf7d0" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></div>
      <div className="panel"><div className="panel-head"><div><h3>Recent activity</h3><p>Your latest requests</p></div><Link to="/tracking">View all</Link></div>{userPickups.slice(0,4).map(p=><div className="activity-row" key={p.id}><div className="activity-icon"><Recycle size={17}/></div><div><strong>{p.plasticType}</strong><span>{p.quantity} kg · {p.address}</span></div><StatusBadge status={p.status}/></div>)}{!userPickups.length&&<p className="empty">No pickups yet. Start your first one!</p>}</div></div>
    <div className="tip-card"><Clock3 size={20}/><div><strong>Quick tip</strong><span>Rinse and separate plastic before pickup. Cleaner material has a higher chance of being recycled efficiently.</span></div></div>
  </div>;
}
