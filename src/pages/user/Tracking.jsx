import React from "react";
import {
  Check,
  Circle,
  MapPin,
  Recycle,
  Truck,
  CalendarCheck,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";

const steps = [
  ["pending", "Request submitted", Circle],
  ["approved", "Approved", Check],
  ["scheduled", "Schedule confirmed", CalendarCheck],
  ["picked", "Picked up", Truck],
  ["recycled", "Recycled", Recycle],
];

const rank = {
  pending: 0,
  approved: 1,
  scheduled: 2,
  picked: 3,
  recycled: 4,
};

export default function Tracking() {
  const { userPickups } = useApp();

  return (
    <div>
      <div className="page-title">
        <div>
          <span className="eyebrow">LIVE STATUS</span>
          <h1>Track your pickups</h1>
          <p>
            Follow every request from submission to recycling.
          </p>
        </div>
      </div>

      {userPickups.length === 0 ? (
        <div className="empty-page">
          <MapPin size={48} />
          <h2>No pickup requests</h2>
          <p>
            Create a pickup request to start tracking it.
          </p>
        </div>
      ) : (
        <div className="tracking-list">
          {userPickups.map((pickup) => (
            <div className="panel tracking-card" key={pickup.id}>
              
              {/* Header */}
              <div className="tracking-head">
                <div>
                  <h3>
                    {pickup.plasticType} · {pickup.quantity} kg
                  </h3>

                  <p>{pickup.address}</p>
                </div>

                <StatusBadge status={pickup.status} />
              </div>

              {/* Timeline */}
              <div className="timeline">
                {steps.map(([key, label, Icon], index) => {
                  const active =
                    rank[pickup.status] >= index;

                  return (
                    <div
                      className={`timeline-step ${
                        active ? "done" : ""
                      }`}
                      key={key}
                    >
                      <div className="timeline-icon">
                        <Icon size={17} />
                      </div>

                      <span>{label}</span>

                      {index < steps.length - 1 && (
                        <div className="timeline-line" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Schedule information */}
              {pickup.date && (
                <div className="tracking-meta">
                  <span>📅 {pickup.date}</span>

                  <span>⏰ {pickup.slot}</span>

                  <span>
                    🏆 {pickup.rewardPoints} points
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}