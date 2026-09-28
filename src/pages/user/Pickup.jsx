import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { ImagePlus, MapPin, Upload, Recycle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import SuccessModal from "../../components/SuccessModal";

function Picker({ position, setPosition }) {
  useMapEvents({ click(e){ setPosition([e.latlng.lat,e.latlng.lng]); }});
  return position ? <Marker position={position}/> : null;
}

export default function Pickup() {
  const { addPickup } = useApp();
  const [form,setForm]=useState({plasticType:"PET Bottles",quantity:"",description:"",address:""});
  const [position,setPosition]=useState([17.2473,80.1514]);
  const [image,setImage]=useState("");
  const [open,setOpen]=useState(false);
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const imageChange=e=>{const file=e.target.files?.[0]; if(file){const reader=new FileReader(); reader.onload=()=>setImage(reader.result);reader.readAsDataURL(file);}};
  const submit=e=>{e.preventDefault(); addPickup({...form,quantity:Number(form.quantity),image,lat:position[0],lng:position[1]}); setForm({plasticType:"PET Bottles",quantity:"",description:"",address:""});setImage("");setOpen(true);};
  return <div><div className="page-title"><div><span className="eyebrow">RECYCLE RESPONSIBLY</span><h1>Request a pickup</h1><p>Tell us what you have and where we should collect it.</p></div><div className="title-icon"><Recycle/></div></div>
    <form className="form-panel" onSubmit={submit}><div className="form-grid">
      <label>Plastic type<select name="plasticType" value={form.plasticType} onChange={update}><option>PET Bottles</option><option>HDPE</option><option>LDPE</option><option>PP</option><option>Mixed Plastic</option></select></label>
      <label>Quantity (kg)<input type="number" min="0.1" step="0.1" name="quantity" value={form.quantity} onChange={update} placeholder="e.g. 5" required/></label>
      <label className="full-span">Description<textarea name="description" value={form.description} onChange={update} placeholder="Describe the plastic waste, condition, approximate count, etc." rows="4" required/></label>
      <label className="full-span">Pickup address<input name="address" value={form.address} onChange={update} placeholder="House no., street, area, city" required/></label>
      <div className="full-span"><label>Pin location on map</label><div className="map-wrap"><MapContainer center={position} zoom={13} scrollWheelZoom><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Picker position={position} setPosition={setPosition}/></MapContainer></div><small className="map-help"><MapPin size={14}/> Click anywhere on the map to move the pickup pin.</small></div>
      <div className="full-span upload-box"><label className="upload-label"><ImagePlus size={28}/><strong>Upload plastic images</strong><span>JPG, PNG · one image is enough for verification</span><input type="file" accept="image/*" onChange={imageChange}/></label>{image&&<img className="upload-preview" src={image} alt="Plastic preview"/>}</div>
    </div><div className="form-footer"><span>📍 Coordinates: {position[0].toFixed(5)}, {position[1].toFixed(5)}</span><button className="btn btn-primary"><Upload size={17}/>Submit pickup request</button></div></form>
    <SuccessModal open={open} title="Request successfully sent" message="Your pickup request is now waiting for recycling-center approval." onClose={()=>setOpen(false)}/>
  </div>;
}
