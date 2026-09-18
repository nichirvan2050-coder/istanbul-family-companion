import { notFound } from "next/navigation";
import { stays, stayById } from "@/data/stays";
import { placeById } from "@/data/places";
import StayDetail from "@/components/StayDetail";

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stayById(slug);
  return s ? { title: s.name } : {};
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stay = stayById(slug);
  if (!stay) notFound();

  const nearby = stay.nearby.map((id) => placeById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return <StayDetail stay={stay} nearby={nearby} />;
}
