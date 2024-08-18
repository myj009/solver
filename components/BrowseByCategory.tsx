import React from "react";
import { Card } from "./ui/card";

interface CategoryType {
  title: string;
  rating: number;
}

const category: CategoryType[] = [
  {
    title: "DeFi(Decentralized Finance)",
    rating: 485,
  },
  {
    title: "Wallets",
    rating: 480,
  },
  {
    title: "NFT(Non-Fungible Tokens)",
    rating: 491,
  },
  {
    title: "DAOs",
    rating: 475,
  },
  {
    title: "Gaming",
    rating: 472,
  },
  {
    title: "Security",
    rating: 482,
  },
  {
    title: "Cross-Chain Solutions",
    rating: 485,
  },
  {
    title: "DEX(Decentralized Exchanges)",
    rating: 482,
  },
];

export default function BrowseByCategory() {
  return (
    <section className="p-8">
      <h1 className="text-4xl font-bold">Browse talent by category</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Looking for work?{" "}
        <a href="#" className="text-green-600">
          Browse jobs
        </a>
      </p>
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
        {category.map((c) => (
          <Card key={c.title} className="p-4 md:h-32 bg-gray-100">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <div className="flex items-center mt-2 space-x-2">
              <StarIcon className="text-green-600" />
              <span>{c.rating / 100}/5</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
