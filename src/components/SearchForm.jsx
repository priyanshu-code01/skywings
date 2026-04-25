import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Search, Loader2 } from "lucide-react";

const SearchForm = ({ loading }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination || !date)
      return alert("Please fill all fields");

    // URL params ke saath search page par bhej rahe hain
    navigate(
      `/search?source=${source}&destination=${destination}&date=${date}`,
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <form
        onSubmit={handleSearch}
        className="bg-[#1E293B]/80 backdrop-blur-2xl p-4 md:p-2 rounded-[2rem] md:rounded-full border border-gray-800 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0"
      >
        {/* 1. Source Input */}
        <div className="flex-1 relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 group-focus-within:scale-110 transition-transform">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            placeholder="From where?"
            className="w-full bg-transparent text-white pl-12 pr-4 py-5 md:py-6 outline-none text-sm font-bold placeholder:text-gray-500 rounded-[1.5rem] md:rounded-l-full focus:bg-white/5 transition-all"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>

        {/* Divider Line (Desktop Only) */}
        <div className="hidden md:block w-px h-10 bg-gray-800"></div>

        {/* 2. Destination Input */}
        <div className="flex-1 relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 group-focus-within:scale-110 transition-transform">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            placeholder="Where to?"
            className="w-full bg-transparent text-white pl-12 pr-4 py-5 md:py-6 outline-none text-sm font-bold placeholder:text-gray-500 focus:bg-white/5 transition-all"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        {/* Divider Line (Desktop Only) */}
        <div className="hidden md:block w-px h-10 bg-gray-800"></div>

        {/* 3. Date Input */}
        <div className="flex-1 relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <Calendar size={18} />
          </div>
          <input
            type="date"
            className="w-full bg-transparent text-white pl-12 pr-6 py-5 md:py-6 outline-none text-sm font-bold [color-scheme:dark] focus:bg-white/5 transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* 4. Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:ml-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-5 md:py-5 rounded-[1.5rem] md:rounded-full font-black flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Search size={20} />
              <span className="md:hidden lg:inline">SEARCH</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Suggestions (Optional but looks premium) */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {["New York", "London", "Dubai", "Paris"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setDestination(city)}
            className="text-[10px] font-black text-gray-500 hover:text-cyan-400 transition-colors tracking-widest uppercase"
          >
            • {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
