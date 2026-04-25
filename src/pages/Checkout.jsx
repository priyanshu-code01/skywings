import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../context/BookingContext";
import { AuthContext } from "../context/AuthContext"; // User details ke liye
import {
  Globe,
  User,
  Mail,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const {
    selectedFlight,
    selectedSeat,
    setSelectedSeat,
    seatClass,
    setSeatClass,
  } = useContext(BookingContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passport, setPassport] = useState("");

  // Agar direct access kiya bina flight select kiye
  useEffect(() => {
    if (!selectedFlight) {
      navigate("/");
    }
  }, [selectedFlight, navigate]);

  // Pricing Logic: Business class mahangi hogi
  const currentPrice =
    seatClass === "Business"
      ? selectedFlight?.businessPrice
      : selectedFlight?.economyPrice;

  // Seat Selection Logic (Row 1-2 Business, baki Economy)
  const handleSeatClick = (row, col) => {
    const seatId = `${row}${col}`;
    setSelectedSeat(seatId);
    setSeatClass(row <= 2 ? "Business" : "Economy");
  };

  // Final Booking API Call
  const handleBooking = async () => {
    if (!selectedSeat) return alert("Bhai, seat toh select kar lo!");

    setLoading(true);
    try {
      const bookingData = {
        flightId: selectedFlight._id,
        flightClass: seatClass,
        seatNumbers: [selectedSeat],
        totalAmount: currentPrice,
      };

      const res = await api.post("/bookings/book", bookingData);
      alert(`Mubarak ho! Ticket book ho gayi. PNR: ${res.data.pnr}`);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  const rows = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-12 flex flex-col lg:flex-row gap-10">
        {/* LEFT: SEAT SELECTION */}
        <div className="lg:w-[450px] bg-[#121A2F]/40 border border-gray-800 rounded-[3rem] p-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-10 border border-gray-700/50 shadow-inner">
            <Globe
              className="text-blue-500 opacity-40 animate-pulse"
              size={32}
            />
          </div>

          <div className="grid grid-cols-7 gap-4 items-center w-full">
            <span className="text-[10px] text-gray-500 font-bold text-center">
              ABC
            </span>
            <div className="col-span-1"></div>
            <div className="col-span-3"></div>
            <span className="text-[10px] text-gray-500 font-bold text-center">
              AISLE
            </span>
            <span className="text-[10px] text-gray-500 font-bold text-center">
              DEF
            </span>

            {rows.map((row) => (
              <React.Fragment key={row}>
                <div className="flex space-x-2">
                  {["A", "B", "C"].map((c) => (
                    <button
                      key={c}
                      onClick={() => handleSeatClick(row, c)}
                      className={`w-10 h-12 rounded-xl border-2 transition-all duration-300 ${
                        selectedSeat === `${row}${c}`
                          ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                          : row <= 2
                            ? "border-yellow-500/30 hover:border-yellow-500"
                            : "border-gray-700 hover:border-blue-400"
                      }`}
                    ></button>
                  ))}
                </div>

                <div className="text-gray-600 text-xs font-black text-center">
                  {row}
                </div>

                <div className="flex space-x-2">
                  {["D", "E", "F"].map((c) => (
                    <button
                      key={c}
                      onClick={() => handleSeatClick(row, c)}
                      className={`w-10 h-12 rounded-xl border-2 transition-all duration-300 ${
                        selectedSeat === `${row}${c}`
                          ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                          : row <= 2
                            ? "border-yellow-500/30 hover:border-yellow-500"
                            : "border-gray-700 hover:border-blue-400"
                      }`}
                    ></button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mt-12 text-[10px] font-bold uppercase tracking-widest w-full">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-700 rounded mr-2"></div> Taken
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border border-blue-400 rounded mr-2"></div>{" "}
              Economy
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border border-yellow-400 rounded mr-2"></div>{" "}
              Business
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded mr-2"></div> Yours
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS & SUMMARY */}
        <div className="flex-1 space-y-8">
          {/* 1. Passenger Details (Auto-filled from Auth) */}
          <div className="bg-[#121A2F]/40 border border-gray-800 rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute top-8 right-8 text-gray-800 opacity-20">
              <Globe size={80} />
            </div>
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold">Passenger Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailInput
                icon={<User />}
                value={user?.name || ""}
                label="Full Name"
                readOnly
              />
              <DetailInput
                icon={<Mail />}
                value={user?.email || ""}
                label="Email"
                readOnly
              />
              <div className="md:col-span-2">
                <DetailInput
                  icon={<FileText />}
                  placeholder="Passport Number (Optional)"
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 2. Trip Summary & Final Action */}
          <div className="bg-[#121A2F]/40 border border-gray-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 w-full">
              <div className="flex items-center space-x-4 mb-8">
                <div className="bg-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold">Trip Summary</h3>
              </div>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px]">
                    Flight Route
                  </span>
                  <span className="font-bold uppercase text-blue-400">
                    {selectedFlight?.source} ➔ {selectedFlight?.destination}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px]">
                    Class
                  </span>
                  <span
                    className={`font-bold ${seatClass === "Business" ? "text-yellow-500" : "text-gray-200"}`}
                  >
                    {seatClass}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px]">
                    Selected Seat
                  </span>
                  <span className="font-black text-cyan-400 text-2xl drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                    {selectedSeat || "---"}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Confirm */}
            <div className="md:w-1/3 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] w-full text-center md:text-left">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Total Payable
                </p>
                <h2 className="text-5xl font-black mt-2 text-white">
                  ${currentPrice || 0}
                </h2>
                <p className="text-[10px] text-gray-500 mt-1">Tax Included</p>
              </div>

              <button
                onClick={handleBooking}
                disabled={loading || !selectedSeat}
                className="mt-8 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 transition-all active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={18} className="mr-2" /> Confirm Booking
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

// Reusable Input Component
const DetailInput = ({ icon, label, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input
      {...props}
      className="w-full bg-[#0B1120] border border-gray-800 rounded-2xl p-4 pl-12 outline-none focus:border-blue-500 transition-all text-sm disabled:text-gray-400"
    />
  </div>
);

export default Checkout;
