"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, LoaderCircle, SendHorizontal, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { cn } from "@/lib/utils";

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function Assistant() {
  const t = useTranslations("assistant");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { locale },
      }),
    [locale],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, busy, open]);

  const suggestions = [
    t("suggestions.skills"),
    t("suggestions.projects"),
    t("suggestions.contact"),
  ];

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  function askSuggestion(text: string) {
    if (busy) return;
    void sendMessage({ text });
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] inline-flex h-14 items-center gap-2 rounded-full border border-border bg-foreground px-4 text-sm font-semibold text-background shadow-[var(--shadow)] transition hover:-translate-y-0.5 md:right-6 md:bottom-6",
          open && "scale-95",
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Bot className="size-5" aria-hidden />
        )}
        <span className="hidden sm:inline">{open ? t("close") : t("label")}</span>
      </button>

      {open ? (
        <section
          aria-label={t("title")}
          className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-[60] flex h-[min(34rem,calc(100svh-7.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-[var(--shadow)] md:right-6 md:bottom-24"
        >
          <header className="border-b border-border bg-[linear-gradient(165deg,var(--surface)_0%,var(--surface-elevated)_100%)] px-4 py-3.5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background">
                <Sparkles className="size-4 text-accent" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-[-0.02em] text-foreground">
                  {t("title")}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {t("subtitle")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setInput("");
                }}
                className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-medium text-muted transition hover:text-foreground"
              >
                {t("reset")}
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4"
          >
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-border bg-surface-elevated p-4">
                <p className="text-sm leading-relaxed text-foreground">
                  {t("welcome")}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => askSuggestion(item)}
                      className="rounded-xl border border-border bg-surface px-3 py-2 text-left text-xs leading-relaxed text-muted transition hover:border-foreground/25 hover:text-foreground"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text) return null;
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    isUser
                      ? "ml-auto bg-foreground text-background"
                      : "mr-auto border border-border bg-surface-elevated text-foreground",
                  )}
                >
                  {text}
                </div>
              );
            })}

            {busy ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-elevated px-3 py-2 text-xs text-muted">
                <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                {t("thinking")}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-red-700 dark:text-red-300">
                {error.message || t("error")}
              </div>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="border-t border-border bg-surface p-3"
          >
            <div className="flex items-end gap-2">
              <label className="sr-only" htmlFor="assistant-input">
                {t("placeholder")}
              </label>
              <textarea
                id="assistant-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void onSubmit(event);
                  }
                }}
                rows={1}
                placeholder={t("placeholder")}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={t("send")}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
              >
                <SendHorizontal className="size-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 text-[0.68rem] leading-relaxed text-muted">
              {t("disclaimer")}
            </p>
          </form>
        </section>
      ) : null}
    </>
  );
}
