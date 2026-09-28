import React from "react";
import { Award, Recycle, WalletCards, Leaf, PackageCheck } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function HistoryRewards(){
 const {user,userPickups,orders}=useApp();
 const recycled=userPickups.filter(p=>p.status==="recycled");
 const data=recycled.length?recycled.slice(-6).map((p,i)=>({name:`#${i+1}`,points:p.rewardPoints,kg:p.quantity})): [{name:"Start",points:0,kg:0}];
 const badges=[["🌱","First Recycler",userPickups.length>=1],["♻️","Plastic Warrior",(user?.recycledKg||0)>=25],["🏆","Green Champion",(user?.recycledKg||0)>=50],["🌍","Earth Saver",userPickups.length>=20]];
 return <div><div className="page-title"><div><span className="eyebrow">ECO WALLET</span><h1>History & Rewards</h1><p>Every recycled kilogram builds your impact.</p></div></div>
 <div className="wallet-hero"><WalletCards size={34}/><div><span>Available reward balance</span><strong>{user?.points||0} points</strong><small>Use points in the RePlast Eco Shop.</small></div></div>
 <div className="stats-grid"><StatCard icon={Recycle} label="Recycled pickups" value={recycled.length}/><StatCard icon={Leaf} label="Plastic recycled" value={`${(user?.recycledKg||0).toFixed(1)} kg`}/><StatCard icon={Award} label="Points earned" value={recycled.reduce((a,p)=>a+p.rewardPoints,0)}/><StatCard icon={PackageCheck} label="Orders redeemed" value={orders.filter(o=>o.userId===user?.id).length}/></div>
 <div className="dashboard-grid"><div className="panel chart-panel"><div className="panel-head"><div><h3>Rewards activity</h3><p>Points awarded by recycled pickup</p></div></div><ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="points" fill="#15803d" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div>
 <div className="panel"><div className="panel-head"><div><h3>Achievement badges</h3><p>Unlock badges through action.</p></div></div><div className="badge-grid">{badges.map(([emoji,name,unlocked])=><div className={`badge ${unlocked?"unlocked":""}`} key={name}><span>{emoji}</span><strong>{name}</strong><small>{unlocked?"Unlocked":"Keep recycling"}</small></div>)}</div></div></div>
 <div className="panel"><div className="panel-head"><div><h3>Recycling history</h3><p>Your completed recycling activity.</p></div></div><div className="table-wrap"><table><thead><tr><th>Type</th><th>Quantity</th><th>Date</th><th>Points</th><th>Status</th></tr></thead><tbody>{recycled.map(p=><tr key={p.id}><td>{p.plasticType}</td><td>{p.quantity} kg</td><td>{p.date||p.createdAt}</td><td>{p.rewardPoints}</td><td><StatusBadge status={p.status}/></td></tr>)}</tbody></table></div></div>
 </div>;
}
