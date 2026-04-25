import React from "react";
import { Star } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "New York, USA",
    price: "450",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    rating: "4.9 (2k+ Reviews)",
  },
  {
    id: 2,
    name: "Paris, France",
    price: "620",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    rating: "4.8 (1.5k+ Reviews)",
  },
  {
    id: 3,
    name: "Dubai, UAE",
    price: "580",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    rating: "4.9 (3k+ Reviews)",
  },
];

const Destinations = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Popular Destinations
          </h2>
          <p className="text-gray-500">
            Explore our most booked locations this month.
          </p>
        </div>
        <button className="text-blue-400 font-bold hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="group relative rounded-[2rem] overflow-hidden border border-gray-800 transition-all hover:border-blue-500/30"
          >
            <img
              src={dest.img}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              alt={dest.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80"></div>

            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
              from ${dest.price}
            </div>

            <div className="absolute bottom-8 left-8">
              <div className="flex items-center text-yellow-500 text-[10px] font-bold mb-2">
                <Star size={12} fill="currentColor" className="mr-1" />{" "}
                {dest.rating}
              </div>
              <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
              <p className="text-gray-400 text-sm">Direct Flights available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
