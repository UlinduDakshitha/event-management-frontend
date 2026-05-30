import React from "react";

interface SpeakerProps {
  name: string;
  role: string;
  company: string;
  gradient: string;
}

export default function SpeakerCard({ name, role, company, gradient }: SpeakerProps) {
  // Get speaker initials
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="speaker-card fade-in">
      <div className="speaker-image-box" style={{ background: gradient }}>
        <span className="speaker-initials">{initials}</span>
      </div>
      <div className="speaker-info">
        <h3>{name}</h3>
        <p className="speaker-role">{role}</p>
        <div className="speaker-company">{company}</div>
      </div>
    </div>
  );
}
