"use client";

import { useEffect, useState } from "react";

type CircleCursorProps = {
  dotSize?: number;
  dotColor?: string;
  ringSize?: number;
  ringColor?: string;
  ringBorderWidth?: number;
  hoverScale?: number;
  clickScale?: number;
  animationDuration?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  opacity?: number;
  hideOnMobile?: boolean;
};

export default function CircleCursor({
  dotSize = 6,
  dotColor = "#ffffff",
  ringSize = 32,
  ringColor = "#ffffff",
  ringBorderWidth = 1,
  hoverScale = 1.5,
  clickScale = 0.75,
  animationDuration = 200,
  blendMode = "difference",
  opacity = 1,
  hideOnMobile = true,
}: CircleCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && hideOnMobile) return;

    document.body.style.cursor = "none";
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(styleElement);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const updateLinkHover = () => {
      document
        .querySelectorAll(
          'a, button, [data-framer-name*="button"], [role="button"]'
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", onLinkEnter);
          el.removeEventListener("mouseleave", onLinkLeave);
          el.addEventListener("mouseenter", onLinkEnter);
          el.addEventListener("mouseleave", onLinkLeave);
        });
    };

    function onLinkEnter() {
      setLinkHovered(true);
    }
    function onLinkLeave() {
      setLinkHovered(false);
    }

    updateLinkHover();
    const observer = new MutationObserver(updateLinkHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
      document.querySelectorAll(
        'a, button, [data-framer-name*="button"], [role="button"]'
      ).forEach((el) => {
        el.removeEventListener("mouseenter", onLinkEnter);
        el.removeEventListener("mouseleave", onLinkLeave);
      });
      document.body.style.cursor = "auto";
      styleElement.remove();
    };
  }, [hideOnMobile]);

  if (!mounted || typeof window === "undefined") return null;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile && hideOnMobile) return null;

  const currentScale = linkHovered
    ? hoverScale
    : clicked
    ? clickScale
    : 1;
  const transitionSpeed = `${animationDuration}ms`;

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          borderRadius: "50%",
          transform: `translate(${position.x - dotSize / 2}px, ${
            position.y - dotSize / 2
          }px)`,
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: blendMode,
          opacity: hidden ? 0 : opacity,
          transition: `opacity ${transitionSpeed} ease`,
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `${ringBorderWidth}px solid ${ringColor}`,
          borderRadius: "50%",
          transform: `translate(${position.x - ringSize / 2}px, ${
            position.y - ringSize / 2
          }px) scale(${currentScale})`,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: blendMode,
          opacity: hidden ? 0 : opacity,
          transition: `all ${transitionSpeed} ease`,
          backgroundColor: "transparent",
        }}
      />
    </>
  );
}
