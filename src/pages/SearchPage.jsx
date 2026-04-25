import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import FlightCard from "../components/FlightCard";
import Footer from "../components/Footer";
import { Loader2, PlaneLanding, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();

  // Sabse pehle 10 flights fetch karne ka function
  const fetchFlights = async (searchQuery = "") => {
    setLoading(true);
    try {
      // Agar URL mein params hain (?source=...) toh search API, warna sabhi flights
      const endpoint = searchQuery
        ? `/flights/search${searchQuery}`
        : "/flights";
      const res = await api.get(endpoint);

      const data = Array.isArray(res.data) ? res.data : res.data.flights || [];

      // Strict 10 flights limit as per your instruction
      setFlights(data.slice(0, 10));
      setIsSearchActive(!!searchQuery);
    } catch (err) {
      console.error("Fetch Error:", err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights(location.search);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white selection:bg-cyan-500/30">
      <Navbar />

      {/* 1. Header & Search Bar Area */}
      <div className="pt-16 pb-24 bg-gradient-to-b from-[#121A2F]/50 to-transparent border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4"
          >
            <Sparkles size={14} /> SkyWings Discovery
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            EXPLORE THE <span className="text-blue-500">SKIES</span>
          </h1>
          <p className="text-gray-500 font-bold text-sm max-w-lg mx-auto">
            Search from our curated list of premium flights or check out our
            recommended departures below.
          </p>
        </div>

        {/* Tumhara functional SearchForm component */}
        <div className="max-w-6xl mx-auto px-4">
          <SearchForm loading={loading} />
        </div>
      </div>

      {/* 2. Results Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
            {isSearchActive ? "Search Results" : "Recommended for you"}
            <span className="ml-3 text-cyan-500 opacity-50">
              ({flights.length} Flights)
            </span>
          </h3>
          <div className="hidden md:flex gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-600 uppercase">
              Live Inventory
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-32">
            <Loader2 className="animate-spin text-blue-500 mb-6" size={48} />
            <p className="text-gray-500 font-black uppercase tracking-[0.3em] animate-pulse">
              Scanning Global Routes...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {flights.length > 0 ? (
              flights.map((f, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={f._id}
                >
                  <FlightCard flight={f} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-32 bg-[#121A2F]/20 rounded-[3rem] border border-dashed border-gray-800">
                <PlaneLanding
                  size={64}
                  className="mx-auto mb-6 text-gray-700"
                />
                <h4 className="text-2xl font-black text-white uppercase italic">
                  No Matches Found
                </h4>
                <p className="text-gray-500 font-medium mt-2">
                  Try adjusting your filters or search for another date.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
