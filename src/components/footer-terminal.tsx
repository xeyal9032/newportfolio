"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Token = {
  text: string;
  tone: "prompt" | "cmd" | "flag" | "path" | "str" | "ok" | "dim" | "accent";
};

type Line = {
  id: string;
  tokens: Token[];
};

const SCRIPT: Line[] = [
  {
    id: "1",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~/workspace", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "whoami", tone: "cmd" },
    ],
  },
  {
    id: "2",
    tokens: [{ text: "Khayal Jamilli — Web · AI · Automation", tone: "ok" }],
  },
  {
    id: "3",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~/workspace", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "npx", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: "next", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: "build", tone: "flag" },
    ],
  },
  {
    id: "4",
    tokens: [
      { text: "✓ Compiled successfully in 1.8s", tone: "ok" },
    ],
  },
  {
    id: "5",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~/govmate-ai", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "git", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: "push", tone: "flag" },
      { text: " ", tone: "dim" },
      { text: "origin", tone: "str" },
      { text: " ", tone: "dim" },
      { text: "main", tone: "path" },
    ],
  },
  {
    id: "6",
    tokens: [{ text: "→ Deployed to production · govmateai.com", tone: "ok" }],
  },
  {
    id: "7",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~/ostwind", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "pnpm", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: "dev", tone: "flag" },
      { text: " ", tone: "dim" },
      { text: "--turbo", tone: "flag" },
    ],
  },
  {
    id: "8",
    tokens: [
      { text: "▲ Ready on http://localhost:3000", tone: "accent" },
    ],
  },
  {
    id: "9",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~/belegpair", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "python", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: "compare.py", tone: "path" },
      { text: " ", tone: "dim" },
      { text: "--locale", tone: "flag" },
      { text: " ", tone: "dim" },
      { text: "tr,ru", tone: "str" },
    ],
  },
  {
    id: "10",
    tokens: [{ text: "✓ Excel report generated · DATEV match complete", tone: "ok" }],
  },
  {
    id: "11",
    tokens: [
      { text: "khayal@portfolio", tone: "accent" },
      { text: ":", tone: "dim" },
      { text: "~", tone: "path" },
      { text: " $ ", tone: "prompt" },
      { text: "echo", tone: "cmd" },
      { text: " ", tone: "dim" },
      { text: '"ship useful systems"', tone: "str" },
    ],
  },
  {
    id: "12",
    tokens: [{ text: "ship useful systems", tone: "ok" }],
  },
];

const toneClass: Record<Token["tone"], string> = {
  prompt: "text-[#8b949e]",
  cmd: "text-[#79c0ff]",
  flag: "text-[#d2a8ff]",
  path: "text-[#ffa657]",
  str: "text-[#a5d6ff]",
  ok: "text-[#3fb950]",
  dim: "text-[#6e7681]",
  accent: "text-[#7ee787]",
};

function lineText(line: Line) {
  return line.tokens.map((token) => token.text).join("");
}

export function FooterTerminal() {
  const reduce = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [history, setHistory] = useState<Line[]>([]);
  const [blink, setBlink] = useState(true);

  const current = SCRIPT[lineIndex % SCRIPT.length];
  const full = useMemo(() => lineText(current), [current]);

  useEffect(() => {
    if (reduce) {
      setHistory(SCRIPT.slice(-6));
      setCharIndex(full.length);
      return;
    }

    const blinkTimer = window.setInterval(() => {
      setBlink((value) => !value);
    }, 520);

    return () => window.clearInterval(blinkTimer);
  }, [reduce, full.length]);

  useEffect(() => {
    if (reduce) return;

    if (charIndex < full.length) {
      const speed = current.tokens[0]?.tone === "ok" || current.tokens[0]?.tone === "accent"
        ? 12
        : 28 + Math.random() * 24;
      const timer = window.setTimeout(() => {
        setCharIndex((value) => value + 1);
      }, speed);
      return () => window.clearTimeout(timer);
    }

    const pause = window.setTimeout(() => {
      setHistory((prev) => {
        const next = [...prev, current];
        return next.slice(-7);
      });
      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, current.id === "12" ? 1600 : 700);

    return () => window.clearTimeout(pause);
  }, [charIndex, current, full.length, reduce]);

  const visibleTokens = useMemo(() => {
    let remaining = charIndex;
    const parts: Token[] = [];
    for (const token of current.tokens) {
      if (remaining <= 0) break;
      const slice = token.text.slice(0, remaining);
      parts.push({ ...token, text: slice });
      remaining -= token.text.length;
    }
    return parts;
  }, [charIndex, current.tokens]);

  return (
    <div
      className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0b0f14] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[0.68rem] tracking-[0.08em] text-white/40 uppercase">
          khayal — zsh — 80×24
        </span>
      </div>

      <div className="relative min-h-[168px] px-3 py-3 font-mono text-[0.72rem] leading-6 sm:min-h-[180px] sm:px-4 sm:text-[0.78rem] sm:leading-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(126,231,135,0.04),transparent_30%)]" />
        <div className="relative space-y-0.5">
          {history.map((line) => (
            <p key={`${line.id}-${lineText(line)}`} className="break-all">
              {line.tokens.map((token, index) => (
                <span key={`${line.id}-${index}`} className={toneClass[token.tone]}>
                  {token.text}
                </span>
              ))}
            </p>
          ))}

          <p className="break-all">
            {visibleTokens.map((token, index) => (
              <span key={`live-${index}`} className={toneClass[token.tone]}>
                {token.text}
              </span>
            ))}
            <span
              className={cn(
                "ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] bg-[#7ee787]",
                blink || reduce ? "opacity-100" : "opacity-0",
              )}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
