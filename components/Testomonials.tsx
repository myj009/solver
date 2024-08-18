import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface testimonial {
  image: (props: any) => React.ReactNode;
  title: string;
  description: string;
  author: string;
  resultTitle: string;
  resultDesc: string;
  bgColor: string;
}

const testimonials: testimonial[] = [
  {
    image: MetamaskIcon,
    title: "MetaMask",
    description: `“Upwork enables us to differentiate ourselves from our competitors and produce content at a higher caliber.”`,
    author: "Jon Snow, Chief Digital Officer",
    resultTitle: "50% Faster",
    resultDesc: "launch of projects",
    bgColor: "bg-[#13544E]",
  },
  {
    image: SolanaIcon,
    title: "Solana",
    description: `“Upwork enables us to differentiate ourselves from our competitors and produce content at a higher caliber.”`,
    author: "Robb Stark, Chief Digital Officer",
    resultTitle: "50% Faster",
    resultDesc: "launch of projects",
    bgColor: "bg-[#121212]",
  },
  {
    image: SolanaIcon,
    title: "Solana",
    description: `“Upwork enables us to differentiate ourselves from our competitors and produce content at a higher caliber.”`,
    author: "Robb Stark, Chief Digital Officer",
    resultTitle: "50% Faster",
    resultDesc: "launch of projects",
    bgColor: "bg-[#121212]",
  },
];

export default function Testomonials() {
  return (
    <section className="w-full px-2 flex flex-col gap-10">
      <div className="text-5xl lg:text-7xl">
        Trusted by leading <br /> brands and startups
      </div>
      <Carousel>
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem
              key={t.title}
              className="basis:1 md:basis-5/6 lg:basis-4/6"
            >
              <Card
                className={cn(
                  `w-full md:h-96 flex flex-col text-white justify-between p-6`,
                  t.bgColor
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <t.image className="h-10 w-10" />
                    <div className="text-4xl font-bold">{t.title}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-xl">{t.description}</div>
                    <div className="text-gray-200">{t.author}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-gray-200">Results</div>
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                  <div className="text-2xl font-bold">{t.resultTitle}</div>
                  <div className="text-gray-200">{t.resultDesc}</div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

function SolanaIcon(props: any) {
  return (
    <svg
      width="45"
      height="40"
      viewBox="0 0 101 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100.48 69.3817L83.8068 86.8015C83.4444 87.1799 83.0058 87.4816 82.5185 87.6878C82.0312 87.894 81.5055 88.0003 80.9743 88H1.93563C1.55849 88 1.18957 87.8926 0.874202 87.6912C0.558829 87.4897 0.31074 87.2029 0.160416 86.8659C0.0100923 86.529 -0.0359181 86.1566 0.0280382 85.7945C0.0919944 85.4324 0.263131 85.0964 0.520422 84.8278L17.2061 67.408C17.5676 67.0306 18.0047 66.7295 18.4904 66.5234C18.9762 66.3172 19.5002 66.2104 20.0301 66.2095H99.0644C99.4415 66.2095 99.8104 66.3169 100.126 66.5183C100.441 66.7198 100.689 67.0067 100.84 67.3436C100.99 67.6806 101.036 68.0529 100.972 68.415C100.908 68.7771 100.737 69.1131 100.48 69.3817ZM83.8068 34.3032C83.4444 33.9248 83.0058 33.6231 82.5185 33.4169C82.0312 33.2108 81.5055 33.1045 80.9743 33.1048H1.93563C1.55849 33.1048 1.18957 33.2121 0.874202 33.4136C0.558829 33.6151 0.31074 33.9019 0.160416 34.2388C0.0100923 34.5758 -0.0359181 34.9482 0.0280382 35.3103C0.0919944 35.6723 0.263131 36.0083 0.520422 36.277L17.2061 53.6968C17.5676 54.0742 18.0047 54.3752 18.4904 54.5814C18.9762 54.7875 19.5002 54.8944 20.0301 54.8952H99.0644C99.4415 54.8952 99.8104 54.7879 100.126 54.5864C100.441 54.3849 100.689 54.0981 100.84 53.7612C100.99 53.4242 101.036 53.0518 100.972 52.6897C100.908 52.3277 100.737 51.9917 100.48 51.723L83.8068 34.3032ZM1.93563 21.7905H80.9743C81.5055 21.7907 82.0312 21.6845 82.5185 21.4783C83.0058 21.2721 83.4444 20.9704 83.8068 20.592L100.48 3.17219C100.737 2.90357 100.908 2.56758 100.972 2.2055C101.036 1.84342 100.99 1.47103 100.84 1.13408C100.689 0.79713 100.441 0.510296 100.126 0.308823C99.8104 0.107349 99.4415 1.24074e-05 99.0644 0L20.0301 0C19.5002 0.000878397 18.9762 0.107699 18.4904 0.313848C18.0047 0.519998 17.5676 0.821087 17.2061 1.19848L0.524723 18.6183C0.267681 18.8866 0.0966198 19.2223 0.0325185 19.5839C-0.0315829 19.9456 0.0140624 20.3177 0.163856 20.6545C0.31365 20.9913 0.561081 21.2781 0.875804 21.4799C1.19053 21.6817 1.55886 21.7896 1.93563 21.7905Z"
        fill="url(#paint0_linear_174_4403)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_174_4403"
          x1="8.52558"
          y1="90.0973"
          x2="88.9933"
          y2="-3.01622"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.08" stopColor="#9945FF" />
          <stop offset="0.3" stopColor="#8752F3" />
          <stop offset="0.5" stopColor="#5497D5" />
          <stop offset="0.6" stopColor="#43B4CA" />
          <stop offset="0.72" stopColor="#28E0B9" />
          <stop offset="0.97" stopColor="#19FB9B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MetamaskIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="212"
      height="189"
      viewBox="0 0 212 189"
      id="metamask"
    >
      <g fill="none" fillRule="evenodd">
        <polygon
          fill="#CDBDB2"
          points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
        ></polygon>
        <polygon
          fill="#CDBDB2"
          points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
          transform="matrix(-1 0 0 1 256.5 0)"
        ></polygon>
        <polygon
          fill="#393939"
          points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
        ></polygon>
        <polygon
          fill="#F89C35"
          points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"
        ></polygon>
        <polygon
          fill="#F89D35"
          points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
        ></polygon>
        <polygon
          fill="#D87C30"
          points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
        ></polygon>
        <polygon
          fill="#EA8D3A"
          points="46.125 101.813 65.25 119.813 65.25 137.813"
        ></polygon>
        <polygon
          fill="#F89D35"
          points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
        ></polygon>
        <polygon
          fill="#EB8F35"
          points="65.25 138.375 60.75 173.25 90.563 152.438"
        ></polygon>
        <polygon
          fill="#EA8E3A"
          points="92.25 102.375 95.063 150.188 86.625 125.719"
        ></polygon>
        <polygon
          fill="#D87C30"
          points="39.375 138.938 65.25 138.375 60.75 173.25"
        ></polygon>
        <polygon
          fill="#EB8F35"
          points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
        ></polygon>
        <polygon
          fill="#E8821E"
          points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
        ></polygon>
        <polygon
          fill="#DFCEC3"
          points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"
        ></polygon>
        <polygon
          fill="#DFCEC3"
          points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
          transform="matrix(-1 0 0 1 272.25 0)"
        ></polygon>
        <polygon
          fill="#393939"
          points="70.313 112.5 64.125 125.438 86.063 119.813"
          transform="matrix(-1 0 0 1 150.188 0)"
        ></polygon>
        <polygon
          fill="#E88F35"
          points="12.375 .563 88.875 58.5 75.938 27"
        ></polygon>
        <path
          fill="#8E5A30"
          d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
        ></path>
        <g transform="matrix(-1 0 0 1 211.5 0)">
          <polygon
            fill="#F89D35"
            points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
          ></polygon>
          <polygon
            fill="#D87C30"
            points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
          ></polygon>
          <polygon
            fill="#EA8D3A"
            points="46.125 101.813 65.25 119.813 65.25 137.813"
          ></polygon>
          <polygon
            fill="#F89D35"
            points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
          ></polygon>
          <polygon
            fill="#EB8F35"
            points="65.25 138.375 60.75 173.25 90 153"
          ></polygon>
          <polygon
            fill="#EA8E3A"
            points="92.25 102.375 95.063 150.188 86.625 125.719"
          ></polygon>
          <polygon
            fill="#D87C30"
            points="39.375 138.938 65.25 138.375 60.75 173.25"
          ></polygon>
          <polygon
            fill="#EB8F35"
            points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
          ></polygon>
          <polygon
            fill="#E8821E"
            points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
          ></polygon>
          <polygon
            fill="#393939"
            points="70.313 112.5 64.125 125.438 86.063 119.813"
            transform="matrix(-1 0 0 1 150.188 0)"
          ></polygon>
          <polygon
            fill="#E88F35"
            points="12.375 .563 88.875 58.5 75.938 27"
          ></polygon>
          <path
            fill="#8E5A30"
            d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
          ></path>
        </g>
      </g>
    </svg>
  );
}
