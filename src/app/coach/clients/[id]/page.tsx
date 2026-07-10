import { ClientProfile } from "@/components/coach/client-profile";

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientProfile clientId={id} />;
}
