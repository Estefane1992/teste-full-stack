import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex max-w-[500px] flex-col ">
      <Header />
      <section className="z-10 mt-20 h-full rounded-t-3xl bg-white px-6 pt-8">
        {children}
      </section>

      <Footer />
    </main>
  );
};

export default Layout;
