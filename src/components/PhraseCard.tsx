import { TurkishPhrase } from "@/data/types";
import ListenButton from "./ListenButton";
import SaveButton from "./SaveButton";

export default function PhraseCard({ phrase }: { phrase: TurkishPhrase }) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg font-semibold">{phrase.turkish}</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {phrase.english}
          </p>
        </div>
        <SaveButton kind="phrase" id={phrase.id} label={false} />
      </div>
      <p className="mt-2 text-sm italic" style={{ color: "var(--gold)" }}>
        {phrase.pronunciation}
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm" dir="rtl">
        <p>{phrase.kurdish}</p>
        <p>{phrase.arabic}</p>
      </div>
      <div className="mt-3">
        <ListenButton text={phrase.turkish} />
      </div>
    </div>
  );
}
