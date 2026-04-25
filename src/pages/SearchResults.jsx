import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { Wifi, Utensils, Luggage, ArrowRight } from "lucide-react";

const SearchResults = ({ flights }) => {
  const { setSelectedFlight } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleSelect = (flight) => {
    setSelectedFlight(flight);
    navigate("/checkout"); // Seat selection page par bhej do
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header Info */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Flights from <span className="text-blue-400">New York</span> to{" "}
          <span className="text-blue-400">London</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Showing {flights.length} results based on your preferences
        </p>
      </div>

      {/* Flight Card (Screenshot 4 Style) */}
      <div className="space-y-6">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-[#121A2F]/50 backdrop-blur-xl border border-gray-800 rounded-[2rem] overflow-hidden flex flex-col md:flex-row group transition-all hover:border-blue-500/50"
          >
            {/* Left: Image */}
            <div className="md:w-1/3 relative overflow-hidden">
              <img
                src={flight.image}
                alt="dest"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                SkyWings
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-12">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white uppercase">
                      {flight.source}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">10:00 AM</p>
                  </div>

                  {/* Flight Path Line */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-500 font-bold mb-1">
                      7H 30M
                    </span>
                    <div className="w-24 h-[1px] bg-gray-700 relative flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 absolute left-0"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 absolute right-0"></div>
                      <span className="text-[10px] text-blue-400 font-bold bg-[#0B1120] px-2">
                        DIRECT
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white uppercase">
                      {flight.destination}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">05:30 PM</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Starting from
                  </p>
                  <h4 className="text-4xl font-bold text-blue-400 mt-1">
                    ${flight.economyPrice}
                  </h4>
                </div>
              </div>

              {/* Bottom: Perks & Button */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800/50">
                <div className="flex space-x-6">
                  <div className="flex items-center text-gray-400 text-xs bg-gray-800/30 px-3 py-2 rounded-xl">
                    <Wifi size={14} className="mr-2" /> Fast WiFi
                  </div>
                  <div className="flex items-center text-gray-400 text-xs bg-gray-800/30 px-3 py-2 rounded-xl">
                    <Utensils size={14} className="mr-2" /> Meals
                  </div>
                  <div className="flex items-center text-gray-400 text-xs bg-gray-800/30 px-3 py-2 rounded-xl">
                    <Luggage size={14} className="mr-2" /> 20kg
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(flight)}
                  className="bg-white text-black px-10 py-3 rounded-xl font-bold flex items-center hover:bg-blue-400 hover:text-white transition-all shadow-xl shadow-white/5"
                >
                  Select Flight <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
