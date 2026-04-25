import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import FlightCard from "../components/FlightCard";
import Footer from "../components/Footer";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/flights");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.flights || [];
        setFeatured(data.slice(0, 3)); // Hard limit of 3 for Home
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />
      <Hero />
      <Features />

      {/* Featured Deals Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">
              Featured <span className="text-cyan-400">Deals</span>
            </h2>
            <p className="text-gray-500 font-bold italic uppercase tracking-widest text-[10px]">
              Handpicked premium routes for you
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/search")}
            className="text-blue-400 font-black hover:tracking-widest transition-all"
          >
            VIEW ALL FLIGHTS ➔
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {featured.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
