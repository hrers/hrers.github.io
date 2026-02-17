"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

const cursorKeyframes = `
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [started, displayed, text, speed]);

  return (
    <span>
      <style dangerouslySetInnerHTML={{ __html: cursorKeyframes }} />
      {displayed}
      <span
        className="inline-block"
        style={{ animation: "cursor-blink 1s step-end infinite" }}
      >
        █
      </span>
    </span>
  );
}
