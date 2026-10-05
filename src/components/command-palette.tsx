"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  Bot,
  Code2,
  Mail,
  MoonStar,
  Search,
  Sparkles,
  ArrowUpRight,
  CornerDownLeft,
  UserRound,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  group: "navigate" | "actions" | "links";
  label: string;
  hint?: string;
  keywords: string;
  run: () => void;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
  }
}

export function CommandPalette() {
  const t = useTranslations("command");
  const tNav = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [modKey, setModKey] = useState("⌘");

  useEffect(() => {
    const mac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
    setModKey(mac ? "⌘" : "Ctrl");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActive(0);
  }, []);

  const items = useMemo<CommandItem[]>(
    () => [
      {
        id: "home",
        group: "navigate",
        label: t("items.home"),
        hint: "#top",
        keywords: "home top start",
        run: () => scrollToHash("#top"),
      },
      {
        id: "about",
        group: "navigate",
        label: t("items.about"),
        hint: "#about",
        keywords: `about ${tNav("about")}`,
        run: () => scrollToHash("#about"),
      },
      {
        id: "work",
        group: "navigate",
        label: t("items.work"),
        hint: "#work",
        keywords: `work ${tNav("work")}`,
        run: () => scrollToHash("#work"),
      },
      {
        id: "stack",
        group: "navigate",
        label: t("items.stack"),
        hint: "#stack",
        keywords: "stack tech technology explode frontend backend",
        run: () => scrollToHash("#stack"),
      },
      {
        id: "projects",
        group: "navigate",
        label: t("items.projects"),
        hint: "#projects",
        keywords: `projects ${tNav("projects")}`,
        run: () => scrollToHash("#projects"),
      },
      {
        id: "github-section",
        group: "navigate",
        label: t("items.githubSection"),
        hint: "#github",
        keywords: `github repos ${tNav("github")}`,
        run: () => scrollToHash("#github"),
      },
      {
        id: "contact",
        group: "navigate",
        label: t("items.contact"),
        hint: "#contact",
        keywords: `contact email ${tNav("contact")}`,
        run: () => scrollToHash("#contact"),
      },
      {
        id: "assistant",
        group: "actions",
        label: t("items.assistant"),
        hint: "KJ",
        keywords: "assistant ask kj chat robot help",
        run: () => {
          window.dispatchEvent(new CustomEvent("portfolio:open-assistant"));
        },
      },
      {
        id: "theme",
        group: "actions",
        label: t("items.theme"),
        hint: resolvedTheme === "dark" ? "light" : "dark",
        keywords: "theme dark light mode toggle",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "easter",
        group: "actions",
        label: t("items.easter"),
        hint: "↑↑↓↓←→←→BA",
        keywords: "hire me konami matrix easter egg secret",
        run: () => {
          window.dispatchEvent(new CustomEvent("portfolio:easter-egg"));
        },
      },
      {
        id: "github",
        group: "links",
        label: t("items.github"),
        hint: "@xeyal9032",
        keywords: "github profile code",
        run: () => window.open(siteConfig.githubUrl, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        group: "links",
        label: t("items.linkedin"),
        hint: "in",
        keywords: "linkedin social",
        run: () =>
          window.open(siteConfig.linkedinUrl, "_blank", "noopener,noreferrer"),
      },
      {
        id: "email",
        group: "links",
        label: t("items.email"),
        hint: siteConfig.email,
        keywords: "email mail contact write",
        run: () => {
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "govmate",
        group: "links",
        label: t("items.govmate"),
        hint: "live",
        keywords: "govmate ai product live",
        run: () =>
          window.open("https://govmateai.com", "_blank", "noopener,noreferrer"),
      },
    ],
    [resolvedTheme, setTheme, t, tNav],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const hay = `${item.label} ${item.hint ?? ""} ${item.keywords}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const groups = useMemo(() => {
    const order: CommandItem["group"][] = ["navigate", "actions", "links"];
    return order
      .map((group) => ({
        group,
        items: filtered.filter((item) => item.group === group),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        setQuery("");
        setActive(0);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) =>
          filtered.length === 0 ? 0 : (value + 1) % filtered.length,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) =>
          filtered.length === 0
            ? 0
            : (value - 1 + filtered.length) % filtered.length,
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const item = filtered[active];
        if (!item) return;
        close();
        window.setTimeout(() => item.run(), 40);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, close, filtered, open]);

  useEffect(() => {
    function onOpen() {
      openPalette();
    }
    window.addEventListener("portfolio:open-command", onOpen);
    return () => window.removeEventListener("portfolio:open-command", onOpen);
  }, [openPalette]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [open]);

  function iconFor(id: string) {
    switch (id) {
      case "assistant":
        return Bot;
      case "theme":
        return MoonStar;
      case "github":
      case "github-section":
        return Code2;
      case "linkedin":
        return UserRound;
      case "email":
        return Mail;
      case "govmate":
        return Sparkles;
      default:
        return ArrowUpRight;
    }
  }

  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((item, index) => map.set(item.id, index));
    return map;
  }, [filtered]);

  if (!open) return null;

  return (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[min(18vh,8rem)]"
          role="presentation"
        >
          <button
            type="button"
            aria-label={t("close")}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            className={cn(
              "relative w-full max-w-xl overflow-hidden rounded-[22px]",
              "border border-white/12 bg-[#0d1014] text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
            )}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate font-mono text-[0.72rem] tracking-[0.08em] text-white/40">
                {t("title")} — {modKey}K
              </span>
            </div>

            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="size-4 shrink-0 text-[#8ec4d6]" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("placeholder")}
                aria-controls={listId}
                aria-autocomplete="list"
                className="w-full bg-transparent font-mono text-[0.95rem] text-white outline-none placeholder:text-white/35"
                onKeyDown={(event) => {
                  if (isEditableTarget(event.target) && event.key === "Escape") {
                    event.stopPropagation();
                    close();
                  }
                }}
              />
              <kbd className="hidden rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[0.65rem] text-white/45 sm:inline">
                esc
              </kbd>
            </div>

            <div
              id={listId}
              role="listbox"
              className="max-h-[min(24rem,52vh)] overflow-y-auto p-2"
            >
              {groups.length === 0 ? (
                <p className="px-3 py-8 text-center font-mono text-sm text-white/45">
                  {t("empty")}
                </p>
              ) : (
                groups.map((group) => (
                  <div key={group.group} className="mb-2">
                    <p className="px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.16em] text-white/35 uppercase">
                      {t(`groups.${group.group}`)}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        const index = indexById.get(item.id) ?? 0;
                        const Icon = iconFor(item.id);
                        const selected = index === active;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={selected}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                                selected
                                  ? "bg-white/10 text-white"
                                  : "text-white/75 hover:bg-white/[0.06] hover:text-white",
                              )}
                              onMouseEnter={() => setActive(index)}
                              onClick={() => {
                                close();
                                window.setTimeout(() => item.run(), 40);
                              }}
                            >
                              <span
                                className={cn(
                                  "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border",
                                  selected
                                    ? "border-[#8ec4d6]/40 bg-[#8ec4d6]/12 text-[#8ec4d6]"
                                    : "border-white/10 bg-white/[0.04] text-white/55",
                                )}
                              >
                                <Icon className="size-3.5" strokeWidth={1.8} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">
                                  {item.label}
                                </span>
                                {item.hint ? (
                                  <span className="mt-0.5 block truncate font-mono text-[0.68rem] text-white/35">
                                    {item.hint}
                                  </span>
                                ) : null}
                              </span>
                              {selected ? (
                                <CornerDownLeft
                                  className="size-3.5 shrink-0 text-[#f0c674]"
                                  aria-hidden
                                />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 font-mono text-[0.65rem] text-white/35">
              <span>{t("hint")}</span>
              <span className="hidden sm:inline">{modKey}K</span>
            </div>
          </div>
        </div>
  );
}
