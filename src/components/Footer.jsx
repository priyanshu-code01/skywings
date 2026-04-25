import React from "react";
import { Plane, Mail, Annoyed, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl">
              <Plane className="text-white h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              SkyWings
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience the future of travel with SkyWings. Luxury, comfort, and
            reliability in every journey. Elevate your experience.
          </p>
          <div className="flex space-x-4">
            <Annoyed
              className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
              size={20}
            />
            <Annoyed
              className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors"
              size={20}
            />
            <Annoyed
              className="text-gray-500 hover:text-pink-500 cursor-pointer transition-colors"
              size={20}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Quick Links
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Book Flight
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-cyan-400 transition-colors"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Support
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">
              FAQs
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
            Stay Connected
          </h4>
          <p className="text-gray-400 text-sm mb-6">
            Subscribe for exclusive deals and updates.
          </p>
          <div className="flex bg-[#121A2F] border border-gray-800 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-all">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-white px-4 py-3 w-full outline-none text-sm"
            />
            <button className="bg-blue-600 px-5 text-white hover:bg-blue-500 transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50 max-w-7xl mx-auto mt-8 pt-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          © 2026 SkyWings Airlines. All rights reserved.
        </p>
        <div className="flex space-x-6 text-xs text-gray-500">
          <span className="hover:text-gray-300 cursor-pointer">Terms</span>
          <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
