import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { BoxesContainer } from "./ui/background-boxes";

export default function HeroSection() {
  return (
    <section className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-2xl">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <BoxesContainer />
      <div className="container px-4 text-white md:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Find Your Next Solana Developer
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Connect with top Solana talent or get hired for your project
          </p>
          <div className="flex items-center bg-white rounded-md shadow-lg">
            <Input
              type="search"
              placeholder="Search for developers or jobs"
              className="flex-1 px-4 py-3 rounded-l-md focus:outline-none bg-white"
            />
            <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-r-sm">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
