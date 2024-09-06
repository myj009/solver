import BrowseByCategory from "@/components/BrowseByCategory";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Testomonials from "@/components/Testomonials";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return redirect("/jobs");
  }

  return (
    <main className="container flex min-h-screen flex-col items-center gap-16 pb-4 md:pb-4 lg:pb-4 p-12 md:p-20 lg:p-24">
      <section className="flex flex-col md:flex-row gap-6 justify-between w-full">
        <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/2">
          <div className="text-5xl md:text-5xl lg:text-7xl">
            How work should work
          </div>
          <div className="text-lg md:text-xl text-center md:text-left font-bold text-gray-500">
            Forget the old rules. You can have the best people. Right now. Right
            here.
          </div>
          <Button className="bg-green-600 w-36">Get Started</Button>
        </div>
        <div className="flex md:block my-auto justify-center items-center">
          <Image src="/talent.png" alt="talent" width={400} height={400} />
        </div>
      </section>
      <BrowseByCategory />
      <HeroSection />
      <Testomonials />
      <Footer />
    </main>
  );
}
