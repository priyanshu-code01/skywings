import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative pt-20 pb-16 flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      <div className="text-center px-6 mb-20 max-w-4xl">
        <div className="inline-flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
          <Sparkles size={14} className="mr-2 text-cyan-400" /> World's Best
          Airline 2026
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
          FLY BEYOND
        </h1>
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none tracking-tighter mb-10">
          BOUNDARIES
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
          Experience the pinnacle of luxury travel. AI-driven schedules,
          world-class comfort, and destinations that inspire.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate("/search")}
            className="bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center justify-center hover:bg-cyan-400 hover:text-white transition-all shadow-xl"
          >
            Book Your Flight <ArrowRight size={20} className="ml-2" />
          </button>
          <button
            onClick={() => navigate("/search")}
            className="border-2 border-gray-800 text-white px-10 py-5 rounded-2xl font-black hover:bg-white/5 transition-all"
          >
            Explore Deals
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto border-y border-gray-800/50 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-gray-800">
        <StatItem num="150+" label="Destinations" />
        <StatItem num="2.5k" label="Daily Flights" />
        <StatItem num="10M+" label="Happy Travelers" />
        <StatItem num="24/7" label="Support" />
      </div>
    </div>
  );
};

const StatItem = ({ num, label }) => (
  <div className="px-4 group cursor-default">
    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">
      {num}
    </h2>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
      {label}
    </p>
  </div>
);

export default Hero;
