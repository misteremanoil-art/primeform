export function PortalHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {children && <p className="mt-1.5 text-muted">{children}</p>}
    </div>
  );
}
