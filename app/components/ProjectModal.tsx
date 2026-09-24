"use client";

import { useEffect } from "react";
import type { Card } from "./WorkGrid";

type ProjectModalProps = {
  card: Card | null;
  onClose: () => void;
};

export default function ProjectModal({ card, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!card) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [card, onClose]);

  if (!card) return null;

  const isVideo = card.type === "Video" && card.mp4;
  const year = card.date.split("/").pop() ?? card.date;

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      onClick={onClose}
    >
      <button className="modal-back" onClick={onClose} aria-label="Back to projects">
        ← Back to all projects
      </button>

      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          Close
        </button>

        <div className="modal-hero">
          <div className="modal-meta">
            <span>Project</span>
            <span>{year}</span>
            <span>{card.type}</span>
          </div>
          <h2 className="modal-title">{card.title}</h2>
        </div>

        <div className="modal-media">
          {isVideo ? (
            <video
              src={`/videos/${card.mp4}`}
              poster={`/images/${card.preview}`}
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={`/images/${card.preview}`}
              alt={card.title}
              loading="eager"
              decoding="async"
            />
          )}
        </div>

        <div className="modal-body">
          <section className="modal-section">
            <h3>Overview</h3>
            <p className="modal-lead">
              {card.title} is a {card.type.toLowerCase()} project captured in{" "}
              {card.date}. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
          </section>

          <section className="modal-section">
            <h3>Services</h3>
            <p className="modal-services">
              {card.type === "Video"
                ? "Direction, Cinematography, Edit, Color, Sound"
                : "Photography, Art Direction, Post-Production"}
            </p>
          </section>

          <section className="modal-section">
            <h3>The Challenge</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="modal-section">
            <h3>The Solution</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
