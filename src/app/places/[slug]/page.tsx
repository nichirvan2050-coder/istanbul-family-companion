import { notFound } from "next/navigation";
import { places, placeById } from "@/data/places";
import PlaceDetail from "@/components/PlaceDetail";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = placeById(slug);
  if (!place) return {};
  return {
    title: place.name,
    description: place.summary,
    openGraph: { title: place.name, description: place.summary },
    alternates: { canonical: `/places/${place.id}` },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = placeById(slug);
  if (!place) notFound();

  const nearby = place.nearby.map((id) => placeById(id)).filter(Boolean) as typeof places;
  const withChild = (place.withChildNearby ?? []).map((id) => placeById(id)).filter(Boolean) as typeof places;

  return <PlaceDetail place={place} nearby={nearby} withChild={withChild} />;
}
