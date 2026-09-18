import { notFound } from "next/navigation";
import { itinerary, dayByNumber } from "@/data/itinerary";
import DayDetail from "@/components/DayDetail";

export function generateStaticParams() {
  return itinerary.map((d) => ({ day: `day-${d.day}` }));
}

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = await params;
  const dayNum = parseInt(dayParam.replace("day-", ""), 10);
  const day = dayByNumber(dayNum);
  if (!day) notFound();

  const prev = dayByNumber(dayNum - 1);
  const next = dayByNumber(dayNum + 1);

  return <DayDetail day={day} prev={prev} next={next} />;
}
