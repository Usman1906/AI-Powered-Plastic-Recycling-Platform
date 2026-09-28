import React, { useState } from "react";
import { Search, Users, Recycle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ManageUsers(){
 const {users,pickups}=useApp(); const [q,setQ]=useState("");
 const list=users.filter(u=>u.role==="user"&&(u.name+" "+u.email).toLowerCase().includes(q.toLowerCase()));
 return <div><div className="page-title"><div><span className="eyebrow">COMMUNITY</span><h1>Manage users</h1><p>View user participation, recycling activity and reward balances.</p></div></div>
 <div className="panel"><div className="toolbar"><div className="search"><Search size={18}/><input placeholder="Search by name or email..." value={q} onChange={e=>setQ(e.target.value)}/></div><span className="muted">{list.length} users</span></div>
 <div className="table-wrap"><table><thead><tr><th>User</th><th>Contact</th><th>Pickups</th><th>Recycled</th><th>Wallet</th></tr></thead><tbody>{list.map(u=>{const ps=pickups.filter(p=>p.userId===u.id);return <tr key={u.id}><td><div className="user-cell"><div className="avatar">{u.name[0]}</div><div><strong>{u.name}</strong><small>#{u.id}</small></div></div></td><td>{u.email}<br/><small>{u.phone}</small></td><td>{ps.length}</td><td>{u.recycledKg.toFixed(1)} kg</td><td><b className="points">{u.points} pts</b></td></tr>})}</tbody></table></div></div>
 </div>;
}
