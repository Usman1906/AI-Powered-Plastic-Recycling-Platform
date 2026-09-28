import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);
  const [error,setError] = useState("");
  const submit = e => { e.preventDefault(); const r = login(email,password); if(!r.ok) setError(r.message); else navigate(r.user.role === "admin" ? "/admin" : "/"); };
  return <div className="auth-page">
    <div className="auth-visual"><div className="auth-brand"><Leaf/> RePlast</div><h1>Turn plastic waste into positive change.</h1><p>Recycle responsibly, earn rewards, and track your environmental impact.</p><div className="eco-orbit">♻️</div></div>
    <div className="auth-card-wrap"><form className="auth-card" onSubmit={submit}>
      <div className="auth-icon"><Leaf/></div><h2>Welcome back</h2><p className="muted">Sign in to continue to your RePlast dashboard.</p>
      {error && <div className="alert error">{error}</div>}
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label>
      <label>Password<div className="password-field"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
      <button className="btn btn-primary full">Login</button>
      <div className="demo-note"><ShieldCheck size={16}/><span>Admin: <b>admin@123</b> / <b>123789</b></span></div>
      <p className="auth-bottom">New to RePlast? <Link to="/signup">Create an account</Link></p>
    </form></div>
  </div>;
}
