"use client";
import { useSmoothScroll } from "@/lib/lenis";
import { Header } from "@/components/site/header";
import { LandingHeader } from "@/components/site/landing-header";
import { Footer } from "@/components/site/footer";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/site/cart-drawer";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { PromotionalPopup } from "@/components/ui/promotional-popup";
import type { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  useSmoothScroll();
  const pathname = usePathname();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      {pathname === "/" ? <LandingHeader /> : <Header />}
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <PromotionalPopup />
    </>
  );
}
