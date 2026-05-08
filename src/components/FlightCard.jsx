import React from "react";
import { Plane, Wifi, Utensils, Luggage, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#121A2F]/50 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row group transition-all hover:border-blue-500/50 mb-6">
      {/* Flight Image Section */}
      <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
        <img
          src={flight.image}
          alt={flight.airlineName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
          SkyWings
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Route Info */}
          <div className="flex items-center space-x-6 md:space-x-12 w-full md:w-auto justify-between md:justify-start">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
                {flight.source}
              </h3>
              <p className="text-gray-500 text-xs mt-1">10:00 AM</p>
            </div>

            {/* Flight Path Line */}
            <div className="flex flex-col items-center flex-1 md:flex-none">
              <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-tighter">
                7H 30M
              </span>
              <div className="w-full md:w-24 h-[1px] bg-gray-700 relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute left-0"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute right-0"></div>
                <Plane
                  size={12}
                  className="text-blue-400 bg-[#0B1120] px-0.5 rotate-90"
                />
              </div>
              <span className="text-[10px] text-blue-400 font-bold mt-1 tracking-widest">
                DIRECT
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase">
                {flight.destination}
              </h3>
              <p className="text-gray-500 text-xs mt-1">05:30 PM</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-left md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-none border-gray-800">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              Starting from
            </p>
            <h4 className="text-3xl md:text-4xl font-black text-cyan-400 mt-1">
              ${flight.economyPrice}
            </h4>
          </div>
        </div>

        {/* Perks & Action Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-800/50 gap-4">
          <div className="flex space-x-4 md:space-x-6">
            <div className="flex items-center text-gray-400 text-[10px] bg-white/5 px-3 py-2 rounded-xl border border-white/5">
              <Wifi size={14} className="mr-2 text-blue-400" /> WiFi
            </div>
            <div className="flex items-center text-gray-400 text-[10px] bg-white/5 px-3 py-2 rounded-xl border border-white/5">
              <Utensils size={14} className="mr-2 text-blue-400" /> Meals
            </div>
            <div className="flex items-center text-gray-400 text-[10px] bg-white/5 px-3 py-2 rounded-xl border border-white/5">
              <Luggage size={14} className="mr-2 text-blue-400" /> 20kg
            </div>
          </div>

          <button
            onClick={() =>
              navigate(`/book/${flight._id}`, { state: { flight } })
            }
            className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Select Flight <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
