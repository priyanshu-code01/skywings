import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import {
  Plane,
  Calendar,
  CreditCard,
  Ticket,
  LayoutDashboard,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pb-20 selection:bg-cyan-500/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
              {getGreeting()},{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                {user?.name}
              </span>
            </h1>
            <p className="text-gray-400 font-medium flex items-center">
              <LayoutDashboard size={18} className="mr-2 text-blue-500" />
              Manage your flights and view your travel history.
            </p>
          </motion.div>

          <Link
            to="/"
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Book New Trip <Plane size={18} className="ml-2 rotate-45" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={<Ticket />}
            color="blue"
          />
          <StatCard
            title="Confirmed"
            value={bookings.filter((b) => b.status === "Confirmed").length}
            icon={<CheckCircle />}
            color="green"
          />
          <StatCard
            title="Spent"
            value={`$${bookings.reduce((acc, curr) => acc + curr.totalAmount, 0)}`}
            icon={<CreditCard />}
            color="purple"
          />
          <StatCard
            title="Upcoming"
            value={bookings.filter((b) => b.status === "Booked").length}
            icon={<Clock />}
            color="cyan"
          />
        </div>

        {/* Main Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121A2F]/40 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] overflow-hidden"
        >
          <div className="p-8 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-2xl font-bold">Recent Journey History</h3>
            <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">
              Live Data
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/20 text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase border-b border-gray-800">
                  <th className="p-8">PNR Number</th>
                  <th className="p-8">Flight Details</th>
                  <th className="p-8">Class & Seats</th>
                  <th className="p-8">Date</th>
                  <th className="p-8">Amount</th>
                  <th className="p-8">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr className="animate-pulse">
                    <td
                      colSpan="6"
                      className="p-20 text-center text-gray-500 font-bold"
                    >
                      Loading your flight deck...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-20 text-center">
                      <p className="text-gray-500 text-lg mb-4">
                        No adventures found yet.
                      </p>
                      <Link
                        to="/"
                        className="text-cyan-400 hover:underline font-bold"
                      >
                        Start your first booking ➔
                      </Link>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-blue-500/5 transition-colors group"
                    >
                      <td className="p-8">
                        <span className="font-black text-cyan-400 text-lg bg-cyan-400/5 px-3 py-1 rounded-lg border border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                          {booking.pnrNumber}
                        </span>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-800 p-3 rounded-xl group-hover:bg-blue-600 transition-colors">
                            <Plane className="h-5 w-5 text-blue-400 group-hover:text-white" />
                          </div>
                          <div>
                            <p className="font-black text-white text-lg">
                              {booking.flight?.source} ➔{" "}
                              {booking.flight?.destination}
                            </p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                              {booking.flight?.airlineName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <p
                          className={`font-bold ${booking.flightClass === "Business" ? "text-yellow-500" : "text-gray-300"}`}
                        >
                          {booking.flightClass}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {booking.seatNumbers.map((seat) => (
                            <span
                              key={seat}
                              className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 font-bold"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center text-gray-300 font-bold">
                          <Calendar size={14} className="mr-2 text-gray-500" />
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </div>
                      </td>
                      <td className="p-8 font-black text-2xl text-white">
                        <span className="text-xs text-gray-500 mr-1">$</span>
                        {booking.totalAmount}
                      </td>
                      <td className="p-8">
                        <span
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper components & logic
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#121A2F]/40 border border-gray-800 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-gray-700 transition-all">
    <div
      className={`bg-${color}-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
    >
      {React.cloneElement(icon, { className: `text-${color}-400` })}
    </div>
    <h3 className="text-4xl font-black mb-1">{value}</h3>
    <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
      {title}
    </p>
    <div
      className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-500 to-transparent opacity-30`}
    ></div>
  </div>
);

const CheckCircle = (props) => (
  <svg
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const getStatusStyles = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
    case "Booked":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

export default Dashboard;
