import React from "react";
const labels = { pending:"Pending", approved:"Approved", scheduled:"Scheduled", picked:"Picked Up", recycled:"Recycled", rejected:"Rejected" };
export default function StatusBadge({ status }) { return <span className={`status-badge ${status}`}>{labels[status] || status}</span>; }
