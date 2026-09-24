"use client";

import { useState } from "react";
import Header from "../components/Header";

const backlog = [
  {
    phase: "Discovery",
    status: "Completed",
    items: [
      "Brand questionnaire & kickoff",
      "Competitor audit",
      "Audience mapping",
    ],
  },
  {
    phase: "Strategy",
    status: "Completed",
    items: [
      "Creative direction deck",
      "Moodboard & art direction",
      "Messaging framework",
    ],
  },
  {
    phase: "Design",
    status: "In Progress",
    items: [
      "Visual identity system",
      "Website wireframes",
      "UI component library",
    ],
  },
  {
    phase: "Production",
    status: "Upcoming",
    items: [
      "Photography direction",
      "Motion & video assets",
      "Development handoff",
    ],
  },
  {
    phase: "Launch",
    status: "Upcoming",
    items: [
      "Asset finalization",
      "QA & rollout",
      "Post-launch review",
    ],
  },
];

const deliverables = [
  { title: "Volley", preview: "xrAee2qlk6pzTTlp7zNjiM5c23k.webp" },
  { title: "Citrus", preview: "nXUUFc19xvtqVbYsG4qmWGrVY.webp" },
  { title: "Drift", preview: "Fp4seRLCQdUbXbtTUc5st9NKXE.webp" },
  { title: "Mojito", preview: "YddXwGEp5kLKKf6RwEWW8gmeIg8.webp" },
  { title: "Retreat", preview: "OvdPf9ABPxUWmjHjjPGtRcwszA.webp" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"blueprint" | "deliverables">(
    "blueprint"
  );

  return (
    <div className="page dashboard-page">
      <Header />

      <main className="main dashboard-main">
        <div className="dashboard-header">
          <span className="dashboard-label">Client Portal</span>
          <h1 className="dashboard-title">Project Dashboard</h1>
        </div>

        <div className="dashboard-cards">
          <button
            className={`dashboard-card${
              activeTab === "blueprint" ? " active" : ""
            }`}
            onClick={() => setActiveTab("blueprint")}
          >
            <span className="dashboard-card-number">01</span>
            <span className="dashboard-card-title">Blueprint</span>
            <span className="dashboard-card-desc">Service backlog &amp; timeline</span>
          </button>

          <button
            className={`dashboard-card${
              activeTab === "deliverables" ? " active" : ""
            }`}
            onClick={() => setActiveTab("deliverables")}
          >
            <span className="dashboard-card-number">02</span>
            <span className="dashboard-card-title">Deliverables</span>
            <span className="dashboard-card-desc">Approved creative outputs</span>
          </button>
        </div>

        {activeTab === "blueprint" && <BlueprintTimeline />}
        {activeTab === "deliverables" && <DeliverablesGrid />}
      </main>
    </div>
  );
}

function BlueprintTimeline() {
  return (
    <section className="blueprint-section">
      <div className="blueprint-header">
        <span className="blueprint-label">Service Backlog</span>
        <span className="blueprint-status">Live timeline</span>
      </div>

      <div className="timeline">
        {backlog.map((phase, i) => (
          <div className="timeline-row" key={phase.phase}>
            <div className="timeline-marker">
              <span className={`timeline-dot ${statusClass(phase.status)}`}></span>
              {i !== backlog.length - 1 && <span className="timeline-line"></span>}
            </div>
            <div className="timeline-content">
              <div className="timeline-top">
                <span className="timeline-phase">{phase.phase}</span>
                <span className={`timeline-badge ${statusClass(phase.status)}`}>
                  {phase.status}
                </span>
              </div>
              <ul className="timeline-items">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeliverablesGrid() {
  return (
    <section className="deliverables-section">
      <div className="deliverables-header">
        <span className="deliverables-label">Approved Deliverables</span>
        <span className="deliverables-count">{deliverables.length} items</span>
      </div>

      <div className="grid dashboard-grid">
        {deliverables.map((item, i) => (
          <article
            key={item.title}
            className="card appeared"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <div className="card-link">
              <div className="card-media">
                <img
                  src={`/images/${item.preview}`}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function statusClass(status: string) {
  return status.toLowerCase().replace(" ", "-");
}
