"use client";

import { useState, useEffect } from "react";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Client Login", href: "/login" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest(".header") || e.target.closest(".menu-overlay")) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo" aria-label="Wynaut home">
            <span className="rolling-text">
              <span className="rolling-text-word">Wynaut</span>
              <span className="rolling-text-word">Wynaut</span>
            </span>
            <sup className="logo-sup">®</sup>
          </a>

          <button
            className={`menu-toggle${open ? " active" : ""}`}
            aria-label="Open menu"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen((v) => !v);
            }}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </header>

      <div
        className={`menu-overlay${open ? " menu-open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-overlay-inner">
          <div className="menu-links">
            {menuLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="menu-link"
                style={{ transitionDelay: `${i * 0.04}s` }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
