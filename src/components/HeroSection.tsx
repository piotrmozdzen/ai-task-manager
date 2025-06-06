import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-4">Hello</h1>
      <p className="text-lg mb-8">Login to view content.</p>
      <Link
        href="/auth"
        className="px-6 py-3 bg-inherit hover:bg-blue-700 rounded-full transition-colors duration-300"
      >
        Log in
      </Link>
    </div>
  );
};
export default HeroSection;
