import { notFound } from "next/navigation";
import { activities, activityById } from "@/data/activities";
import ActivityDetail from "@/components/ActivityDetail";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = activityById(slug);
  return a ? { title: a.name } : {};
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activityById(slug);
  if (!activity) notFound();

  return <ActivityDetail activity={activity} />;
}
