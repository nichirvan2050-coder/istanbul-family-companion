import { notFound } from "next/navigation";
import { areas, areaById } from "@/data/areas";
import { placeById } from "@/data/places";
import AreaDetail from "@/components/AreaDetail";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaById(slug);
  return area ? { title: area.name, description: area.whyFamilies } : {};
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaById(slug);
  if (!area) notFound();

  const attractions = area.attractions.map((id) => placeById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return <AreaDetail area={area} attractions={attractions} />;
}
