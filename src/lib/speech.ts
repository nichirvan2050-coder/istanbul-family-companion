"use client";

// Thin wrapper around the browser's built-in Web Speech API. No audio files
// are bundled and no third-party voice service is called — speech synthesis
// and recognition happen entirely on-device via the browser, so nothing is
// recorded or sent anywhere. See /about for the privacy note.

export function speak(text: string, lang: string = "tr-TR") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function canListen(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

interface MinimalSpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function listen(
  onResult: (transcript: string) => void,
  onError: (err: string) => void,
  lang: string = "en-US"
): (() => void) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => MinimalSpeechRecognition;
    webkitSpeechRecognition?: new () => MinimalSpeechRecognition;
  };
  const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Recognition) {
    onError("not-supported");
    return null;
  }
  try {
    const recognition = new Recognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) onResult(transcript);
    };
    recognition.onerror = () => onError("recognition-error");
    recognition.start();
    return () => recognition.stop();
  } catch {
    onError("start-failed");
    return null;
  }
}
