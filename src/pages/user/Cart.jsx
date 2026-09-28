import React from "react";
import { Minus, Plus, Trash2, ShoppingBag, WalletCards } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SuccessModal from "../../components/SuccessModal";

export default function Cart(){
 const {cart,removeFromCart,changeQty,user,redeem,clearCart}=useApp(); const [open,setOpen]=React.useState(false); const [message,setMessage]=React.useState("");
 const total=cart.reduce((a,p)=>a+p.price*p.quantity,0);
 const checkout=()=>{if(!cart.length)return; if(cart.length===1){const r=redeem(cart[0],cart[0].quantity);if(!r.ok){setMessage(r.message);setOpen(true);return;}} else { if((user?.points||0)<total){setMessage("Insufficient reward points.");setOpen(true);return;} cart.forEach(p=>redeem(p,p.quantity)); } clearCart(); setMessage(`Order placed successfully for ${total} points.`);setOpen(true);};
 return <div><div className="page-title"><div><span className="eyebrow">YOUR CART</span><h1>Eco Shop cart</h1><p>Redeem your earned points for sustainable products.</p></div></div>
 {cart.length?<div className="cart-layout"><div className="panel">{cart.map(p=><div className="cart-row" key={p.cartId}><div className="cart-product-icon">{p.emoji}</div><div className="cart-info"><strong>{p.name}</strong><span>{p.price} points each</span></div><div className="qty"><button onClick={()=>changeQty(p.cartId,p.quantity-1)}><Minus size={15}/></button><b>{p.quantity}</b><button onClick={()=>changeQty(p.cartId,p.quantity+1)}><Plus size={15}/></button></div><strong>{p.price*p.quantity} pts</strong><button className="icon-btn danger" onClick={()=>removeFromCart(p.cartId)}><Trash2 size={17}/></button></div>)}</div>
 <div className="panel checkout"><WalletCards size={30}/><span>Eco Wallet</span><strong>{user?.points||0} pts</strong><div className="checkout-line"><span>Cart total</span><b>{total} pts</b></div><button className="btn btn-primary full" onClick={checkout}>Redeem & purchase</button><small>Points are deducted from your Eco Wallet after successful redemption.</small></div></div>:<div className="empty-page"><ShoppingBag size={48}/><h2>Your cart is empty</h2><p>Explore the Eco Shop and add a product to redeem.</p></div>}
 <SuccessModal open={open} title={message.startsWith("Order")?"Purchase successful":"Checkout"} message={message} onClose={()=>setOpen(false)}/>
 </div>;
}
