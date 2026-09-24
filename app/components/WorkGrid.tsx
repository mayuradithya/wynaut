"use client";

import { useEffect, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";

export type Card = {
  slug: string;
  title: string;
  date: string;
  type: "Video" | "Image";
  preview: string;
  mp4: string | null;
};

export default function WorkGrid({ cards }: { cards: Card[] }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Card | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "all"
      ? cards
      : cards.filter((c) =>
          filter === "active"
            ? Number(c.date.split("/").pop() ?? "0") >= 2025
            : Number(c.date.split("/").pop() ?? "0") < 2025
        );

  useEffect(() => {
    if (!gridRef.current) return;
    const observed = gridRef.current.querySelectorAll(".card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appeared");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <>
      <div
        className="filter-bar appear appeared"
        data-appear-delay="0.1"
      >
        <span className="filter-label">Selected Works</span>
        <CategoryDropdown value={filter} onChange={setFilter} />
      </div>

      <div className="grid" id="work-grid" ref={gridRef}>
        {filtered.map((card, i) => (
          <CardItem
            key={card.slug}
            card={card}
            index={i}
            onClick={() => setSelected(card)}
          />
        ))}
      </div>

      <ProjectModal card={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function CategoryDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const options = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div className={`category-dropdown${open ? " open" : ""}`}>
      <button
        className="category-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <span>
          {options.find((o) => o.value === value)?.label ?? "Choose Category"}
        </span>
        <svg
          className="chevron"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul
        className="category-list"
        role="listbox"
        aria-hidden={!open}
      >
        {options.map((option) => (
          <li
            key={option.value}
            role="option"
            className={option.value === value ? "active" : ""}
            onClick={(e) => {
              e.stopPropagation();
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardItem({
  card,
  index,
  onClick,
}: {
  card: Card;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = card.type === "Video" && card.mp4;

  return (
    <article
      className="card"
      style={{ transitionDelay: `${index * 0.05}s` }}
      data-type={card.type.toLowerCase()}
    >
      <button
        className="card-link"
        aria-label={card.title}
        onClick={onClick}
      >
        <div className="card-media">
          <img
            src={`/images/${card.preview}`}
            alt={card.title}
            loading="lazy"
            decoding="async"
          />
          {isVideo && (
            <video
              ref={videoRef}
              src={`/videos/${card.mp4}`}
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
            />
          )}
        </div>
        <div className="card-overlay"></div>
        <div className="card-info">
          <h3 className="card-title">{card.title}</h3>
          <span className="card-date">{card.date}</span>
        </div>
      </button>
      {isVideo && <VideoHover videoRef={videoRef} />}
    </article>
  );
}

function VideoHover({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}): null {
  useEffect(() => {
    const video = videoRef.current;
    const article = video?.closest(".card");
    if (!article || !video) return;

    function enter() {
      video.style.opacity = "1";
      video.play().catch(() => {});
    }
    function leave() {
      video.pause();
      video.currentTime = 0;
      video.style.opacity = "0";
    }

    article.addEventListener("mouseenter", enter);
    article.addEventListener("mouseleave", leave);
    return () => {
      article.removeEventListener("mouseenter", enter);
      article.removeEventListener("mouseleave", leave);
    };
  }, [videoRef]);

  return null;
}
