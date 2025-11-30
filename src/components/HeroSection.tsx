import React from "react";

interface Props {
  data: any;
  onCTAClick?: () => void;
}

export default function HeroSection({ data, onCTAClick }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {data?.title || "Melody Labs"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {data?.subtitle || "Academia de música con tecnología de vanguardia"}
        </p>
        <button
          onClick={onCTAClick}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {data?.ctaText || "Comenzar"}
        </button>
      </div>
    </div>
  );
}
