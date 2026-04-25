import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { User, Mail, FileText, CheckCircle, Plane, Globe } from "lucide-react";

const BookFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const flight = location.state?.flight;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatClass, setSeatClass] = useState("Economy");

  if (!flight)
    return (
      <div className="text-white text-center mt-20">
        Please select a flight first.
      </div>
    );

  const handleSeatClick = (seatId, row) => {
    if (flight.bookedSeats?.includes(seatId)) return;

    // Row 1-2 are Business
    const currentClass = row <= 2 ? "Business" : "Economy";
    setSeatClass(currentClass);

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length < 4) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert("Max 4 seats allowed.");
      }
    }
  };

  const totalPrice = selectedSeats.reduce((acc, seat) => {
    const row = parseInt(seat);
    return acc + (row <= 2 ? flight.businessPrice : flight.economyPrice);
  }, 0);

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return alert("Select a seat first.");

    setLoading(true);
    try {
      const bookingData = {
        flightId: flight._id,
        flightClass: seatClass,
        seatNumbers: selectedSeats,
        totalAmount: totalPrice,
      };
      const res = await api.post("/bookings/book", bookingData);
      alert(`Booking Successful! PNR: ${res.data.pnr}`);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12">
        {/* LEFT: SEAT MAP (As per Screenshot 5) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-[450px] bg-[#121A2F]/40 border border-gray-800 rounded-[3.5rem] p-10 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-10 border border-gray-700">
            <Plane className="text-blue-500 opacity-40 rotate-45" size={32} />
          </div>

          <div className="w-full space-y-4">
            {/* Legend */}
            <div className="grid grid-cols-7 gap-2 mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div className="col-span-3 flex justify-around">
                <span>A</span>
                <span>B</span>
                <span>C</span>
              </div>
              <div className="text-center italic opacity-50">AISLE</div>
              <div className="col-span-3 flex justify-around">
                <span>D</span>
                <span>E</span>
                <span>F</span>
              </div>
            </div>

            {rows.map((row) => (
              <div key={row} className="grid grid-cols-7 gap-2 items-center">
                <div className="col-span-3 flex justify-between">
                  {["A", "B", "C"].map((col) => {
                    const seatId = `${row}${col}`;
                    const isBooked = flight.bookedSeats?.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId, row)}
                        disabled={isBooked}
                        className={`w-9 h-11 md:w-10 md:h-12 rounded-xl border-2 transition-all 
                          ${
                            isBooked
                              ? "bg-gray-800 border-gray-900 opacity-30"
                              : isSelected
                                ? "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                : row <= 2
                                  ? "border-yellow-500/40 hover:bg-yellow-500/10"
                                  : "border-blue-500/40 hover:bg-blue-500/10"
                          }`}
                      />
                    );
                  })}
                </div>
                <div className="text-center text-xs font-black text-gray-700">
                  {row}
                </div>
                <div className="col-span-3 flex justify-between">
                  {["D", "E", "F"].map((col) => {
                    const seatId = `${row}${col}`;
                    const isBooked = flight.bookedSeats?.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId, row)}
                        disabled={isBooked}
                        className={`w-9 h-11 md:w-10 md:h-12 rounded-xl border-2 transition-all 
                          ${
                            isBooked
                              ? "bg-gray-800 border-gray-900 opacity-30"
                              : isSelected
                                ? "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                : row <= 2
                                  ? "border-yellow-500/40 hover:bg-yellow-500/10"
                                  : "border-blue-500/40 hover:bg-blue-500/10"
                          }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12 text-[9px] font-bold uppercase">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-800 rounded-sm"></div> Taken
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-blue-500 rounded-sm"></div>{" "}
              Economy
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-yellow-500 rounded-sm"></div>{" "}
              Business
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div> Yours
            </div>
          </div>
        </motion.div>

        {/* RIGHT: DETAILS & SUMMARY */}
        <div className="flex-1 space-y-8">
          {/* Passenger Details */}
          <div className="bg-[#121A2F]/40 border border-gray-800 rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 text-gray-800 opacity-10">
              <Globe size={150} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold">Passenger Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                icon={<User />}
                placeholder="Full Name"
                value={user?.name}
                disabled
              />
              <Input
                icon={<Mail />}
                placeholder="Email"
                value={user?.email}
                disabled
              />
              <div className="md:col-span-2">
                <Input
                  icon={<FileText />}
                  placeholder="Passport Number (Optional)"
                />
              </div>
            </div>
          </div>

          {/* Trip Summary Card */}
          <div className="bg-[#121A2F]/40 border border-gray-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold">Trip Summary</h3>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-gray-500">Route</span>
                  <span className="uppercase">
                    {flight.source} ➔ {flight.destination}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Class</span>
                  <span>{seatClass}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-4">
                  <span className="text-gray-500">Selected Seats</span>
                  <span className="text-cyan-400 font-black text-xl">
                    {selectedSeats.join(", ") || "None"}
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-[250px] bg-blue-600/10 rounded-3xl p-8 flex flex-col justify-between border border-blue-500/20">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Total Payable
                </p>
                <h2 className="text-5xl font-black mt-2">${totalPrice}</h2>
              </div>
              <button
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0 || loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle size={18} /> Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Input Component
const Input = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
      {icon}
    </div>
    <input
      {...props}
      className="w-full bg-[#0B1120] border border-gray-800 rounded-2xl p-4 pl-12 outline-none focus:border-blue-500 transition-all disabled:opacity-50"
    />
  </div>
);

export default BookFlight;
