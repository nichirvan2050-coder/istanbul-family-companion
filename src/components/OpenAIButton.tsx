"use client";

export function openIstanbulAI(query?: string) {
  window.dispatchEvent(new CustomEvent("my-istanbul:open-ai", { detail: { query } }));
}

export default function OpenAIButton({
  query,
  children,
  className,
  style,
}: {
  query?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button type="button" onClick={() => openIstanbulAI(query)} className={className} style={style}>
      {children}
    </button>
  );
}
