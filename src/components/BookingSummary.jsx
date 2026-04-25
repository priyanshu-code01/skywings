import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import { CheckCircle2, MapPin, Calendar, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const BookingSummary = () => {
  const { selectedFlight, selectedSeat, seatClass } =
    useContext(BookingContext);

  // Formatting date for better look
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121A2F]/40 backdrop-blur-2xl border border-gray-800 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-stretch"
    >
      {/* 1. Trip Details Section */}
      <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-[0_0_15px_rgba(147,51,234,0.4)]">
            2
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Trip Summary
          </h3>
        </div>

        <div className="space-y-5">
          <DetailRow
            icon={<MapPin size={16} className="text-gray-500" />}
            label="Flight Route"
            value={`${selectedFlight?.source || "---"} ➔ ${selectedFlight?.destination || "---"}`}
          />
          <DetailRow
            icon={<Calendar size={16} className="text-gray-500" />}
            label="Date"
            value={today}
          />
          <DetailRow
            icon={<CreditCard size={16} className="text-gray-500" />}
            label="Seat Class"
            value={seatClass}
          />

          <div className="pt-4 mt-2 border-t border-gray-800 flex justify-between items-center">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Selected Seat
            </span>
            <span
              className={`text-2xl font-black transition-all ${selectedSeat ? "text-cyan-400" : "text-gray-700"}`}
            >
              {selectedSeat || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Total & Confirm Section */}
      <div className="md:w-[280px] bg-blue-600/5 p-8 md:p-10 flex flex-col justify-between items-center md:items-start text-center md:text-left">
        <div>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">
            Total Payable
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-blue-400">$</span>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              {selectedFlight
                ? seatClass === "Business"
                  ? selectedFlight.businessPrice
                  : selectedFlight.economyPrice
                : "0"}
            </h2>
          </div>
          <p className="text-[10px] text-gray-500 mt-2 font-medium">
            Inc. all taxes & fees
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-10 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <CheckCircle2 size={20} className="mr-2" /> Confirm
        </motion.button>
      </div>
    </motion.div>
  );
};

// Reusable Detail Row Component
const DetailRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
    </div>
    <span className="text-sm font-black text-white uppercase group-hover:text-blue-400 transition-colors">
      {value}
    </span>
  </div>
);

export default BookingSummary;
