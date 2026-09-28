import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Signup() {
  const { signup } = useApp(); const navigate = useNavigate();
  const [form,setForm]=useState({name:"",email:"",phone:"",password:"",confirm:""});
  const [error,setError]=useState("");
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault(); if(form.password!==form.confirm){setError("Passwords do not match.");return;} const r=signup(form); if(!r.ok)setError(r.message);else navigate("/");};
  return <div className="auth-page"><div className="auth-visual"><div className="auth-brand"><Leaf/> RePlast</div><h1>Start your greener journey.</h1><p>Every bottle, container and wrapper you recycle can create measurable impact.</p><div className="eco-orbit">🌱</div></div>
    <div className="auth-card-wrap"><form className="auth-card" onSubmit={submit}><div className="auth-icon"><Leaf/></div><h2>Create account</h2><p className="muted">Join the RePlast community.</p>{error&&<div className="alert error">{error}</div>}
      <label>Full name<input name="name" value={form.name} onChange={update} required/></label>
      <label>Email<input type="email" name="email" value={form.email} onChange={update} required/></label>
      <label>Phone<input name="phone" value={form.phone} onChange={update} required/></label>
      <div className="two-col"><label>Password<input type="password" name="password" value={form.password} onChange={update} required/></label><label>Confirm<input type="password" name="confirm" value={form.confirm} onChange={update} required/></label></div>
      <button className="btn btn-primary full">Create Account</button><p className="auth-bottom">Already registered? <Link to="/login">Sign in</Link></p>
    </form></div></div>;
}
