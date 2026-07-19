import { ClientProfile } from "@/components/coach/client-profile";
import { seedClients } from "@/lib/store/seed";

// Derived from the seed rather than a hand-written list, so a client added there
// gets a page without anyone remembering to come back here.
export function generateStaticParams() {
  return seedClients.map((c) => ({ id: c.id }));
}

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientProfile clientId={id} />;
}
