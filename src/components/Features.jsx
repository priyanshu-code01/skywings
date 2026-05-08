import React from "react";
import { Wine, Globe, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header Section */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-white mb-6"
        >
          Why Fly SkyWings?
        </motion.h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* Card 1 */}
        <FeatureCard
          icon={<Wine className="text-blue-400 h-8 w-8" />}
          title="First Class Comfort"
          desc="Recline in our fully flat beds with personal minibars and designer amenity kits."
        />

        {/* Card 2 */}
        <FeatureCard
          icon={<Globe className="text-blue-400 h-8 w-8" />}
          title="Global Coverage"
          desc="Connecting you to over 150 countries with our partner network alliances."
        />

        {/* Card 3 */}
        <FeatureCard
          icon={<Headphones className="text-blue-400 h-8 w-8" />}
          title="Premium Support"
          desc="Dedicated concierge service available 24/7 to handle your every need."
        />
      </div>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -12 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-[#121A2F]/40 backdrop-blur-xl border border-gray-800 p-10 rounded-[2.5rem] text-center transition-all hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(30,58,138,0.2)]"
  >
    <div className="bg-blue-900/20 w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-inner">
      <div className="group-hover:text-white transition-colors">{icon}</div>
    </div>
    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

export default Features;
