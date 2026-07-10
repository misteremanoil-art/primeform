import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { MobileCta } from "@/components/site/mobile-cta";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <MobileCta />
    </>
  );
}
