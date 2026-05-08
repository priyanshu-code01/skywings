import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import { motion } from "framer-motion";

const SeatMap = () => {
  const { selectedSeat, setSelectedSeat, seatClass, setSeatClass } =
    useContext(BookingContext);

  // Rows and Columns 
  const rows = [1, 2, 3, 4, 5, 6];
  const leftCols = ["A", "B", "C"];
  const rightCols = ["D", "E", "F"];

  // Dummy logic: Seat color based on class and selection
  const getSeatColor = (row, col) => {
    const seatId = `${row}${col}`;
    if (selectedSeat === seatId)
      return "bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]";
    if (row <= 2) return "border-yellow-500/50 hover:bg-yellow-500/20"; // Business Rows
    return "border-blue-500/50 hover:bg-blue-500/20"; // Economy Rows
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:w-[450px] w-full bg-[#121A2F]/40 backdrop-blur-2xl border border-gray-800 rounded-[3.5rem] p-8 md:p-12 flex flex-col items-center"
    >
      {/* Plane Nose / Icon */}
      <div className="w-24 h-24 bg-[#0B1120] rounded-full border border-gray-800 flex items-center justify-center mb-12 shadow-inner">
        <div className="opacity-20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="w-full space-y-5">
        {/* Column Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2 px-2">
          <div className="col-span-3 flex justify-around text-[10px] font-black text-gray-600 tracking-widest uppercase">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>
          <div className="text-center text-[10px] font-black text-gray-700">
            AISLE
          </div>
          <div className="col-span-3 flex justify-around text-[10px] font-black text-gray-600 tracking-widest uppercase">
            <span>D</span>
            <span>E</span>
            <span>F</span>
          </div>
        </div>

        {rows.map((row) => (
          <div key={row} className="grid grid-cols-7 gap-2 items-center">
            {/* Left Column (A, B, C) */}
            <div className="col-span-3 flex justify-between">
              {leftCols.map((col) => (
                <button
                  key={col}
                  onClick={() => {
                    setSelectedSeat(`${row}${col}`);
                    setSeatClass(row <= 2 ? "Business" : "Economy");
                  }}
                  className={`w-9 h-11 md:w-10 md:h-12 rounded-xl border-2 transition-all duration-300 ${getSeatColor(row, col)}`}
                />
              ))}
            </div>

            {/* Aisle Number */}
            <div className="text-center text-xs font-black text-gray-700">
              {row}
            </div>

            {/* Right Column (D, E, F) */}
            <div className="col-span-3 flex justify-between">
              {rightCols.map((col) => (
                <button
                  key={col}
                  onClick={() => {
                    setSelectedSeat(`${row}${col}`);
                    setSeatClass(row <= 2 ? "Business" : "Economy");
                  }}
                  className={`w-9 h-11 md:w-10 md:h-12 rounded-xl border-2 transition-all duration-300 ${getSeatColor(row, col)}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-16 w-full px-4">
        <LegendItem color="bg-gray-800" label="Taken" />
        <LegendItem color="border border-blue-500" label="Economy" />
        <LegendItem color="border border-yellow-500" label="Business" />
        <LegendItem color="bg-cyan-400" label="Yours" />
      </div>
    </motion.div>
  );
};

// Sub-component for Legend
const LegendItem = ({ color, label }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-3 h-3 rounded-sm ${color}`}></div>
    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default SeatMap;
