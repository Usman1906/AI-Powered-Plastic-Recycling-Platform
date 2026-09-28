import React, { useState } from "react";
import { ShoppingCart, Plus, Search, Check } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function Shopping(){
 const {products,addToCart,user}=useApp(); const [q,setQ]=useState(""); const [added,setAdded]=useState(null);
 const list=products.filter(p=>(p.name+" "+p.description).toLowerCase().includes(q.toLowerCase()));
 return <div><div className="page-title"><div><span className="eyebrow">ECO SHOP</span><h1>Redeem your impact</h1><p>Choose useful, eco-friendly products and pay with reward points.</p></div><Link className="btn btn-secondary" to="/cart"><ShoppingCart size={17}/> Cart</Link></div>
 <div className="shop-toolbar"><div className="search"><Search size={18}/><input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)}/></div><div className="wallet-mini">Wallet: <b>{user?.points||0} pts</b></div></div>
 <div className="product-grid">{list.map(p=><div className="product-card" key={p.id}><div className="product-image">{p.emoji}</div><div className="product-body"><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><strong>{p.price} pts</strong><button className="btn btn-primary small" onClick={()=>{addToCart(p);setAdded(p.id);setTimeout(()=>setAdded(null),1200)}}>{added===p.id?<><Check size={16}/> Added</>:<><Plus size={16}/> Add</>}</button></div></div></div>)}</div>
 </div>;
}
