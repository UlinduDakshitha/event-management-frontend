import React from "react";

interface AgendaItem {
  time: string;
  title: string;
  speaker?: string;
  subSpeaker?: string;
}

const agendaData: AgendaItem[] = [
  {
    time: "09:30 AM - 10:00 AM",
    title: "Registrations",
  },
  {
    time: "10:00 AM - 10:10 AM",
    title: "Welcome Note",
    speaker: "Richard Buxton (VP EMEA, Accelalpha)",
    subSpeaker: "Rohan Chitnis (Sales Director Applications, Oracle)",
  },
  {
    time: "10:10 AM - 10:40 AM",
    title: "Industry Keynote (Outlook & Challenges on Digital Logistics & Supply Chain)",
    speaker: "Srivatsav Sarvepalli (Regional Director, Supply Chain Solutions, ECEMEA, Oracle)",
  },
  {
    time: "10:40 AM - 11:10 AM",
    title: "A Practical Guide to Successful Implementation",
    speaker: "Joe Spear (Partner, Accelalpha)",
  },
  {
    time: "11:10 AM - 11:30 AM",
    title: "The Resilient Supply Chain & SCM Innovations",
    speaker: "Ujjwal Kumar (Principal Domain Lead, ECEMEA, Oracle)",
  },
  {
    time: "11:30 AM - 11:50 AM",
    title: "Coffee Break",
  },
  {
    time: "11:50 AM - 12:10 PM",
    title: "Insights from Digital Evolution",
    speaker: "Dr. Raman Kumar (CEO, Al-Futtaim Logistics)",
  },
  {
    time: "12:10 PM - 12:40 PM",
    title: "Strategies in Action: Insights from Industry Leaders Panel Discussion",
    speaker: "David Moono (Global Logistics Manager, Weatherford)",
    subSpeaker: "Tamer Hamed (CIO, Dubai Cable Company)",
  },
  {
    time: "12:40 PM - 01:00 PM",
    title: "Q&A and Closing Remarks",
    speaker: "Hosted by Accelalpha Team",
  },
  {
    time: "01:00 PM - Onwards",
    title: "Lunch & Networking",
  },
];

export default function AgendaTimeline() {
  return (
    <div className="agenda-timeline">
      {agendaData.map((item, idx) => (
        <div key={idx} className="timeline-item fade-in">
          <div className="timeline-time-box">
            <span className="timeline-time">{item.time}</span>
          </div>
          <div className="timeline-connector">
            <div className="timeline-dot"></div>
            {idx < agendaData.length - 1 && <div className="timeline-line"></div>}
          </div>
          <div className="timeline-content-card">
            <h3>{item.title}</h3>
            {item.speaker && (
              <div className="timeline-speakers">
                <span className="by-label">Presented by:</span>
                <div className="timeline-speaker-item">{item.speaker}</div>
                {item.subSpeaker && (
                  <div className="timeline-speaker-item">{item.subSpeaker}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
