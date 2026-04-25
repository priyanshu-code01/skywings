import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import {
  Plane,
  LogOut,
  Home as HomeIcon,
  Search,
  LayoutDashboard,
  Menu,
  X,
  User,
} from "lucide-react";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-gray-800 bg-[#0B1120]/90 backdrop-blur-xl sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl group-hover:rotate-12 transition-all">
            <Plane className="text-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white">
            SkyWings
          </h1>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" icon={HomeIcon} active={isActive("/")}>
            HOME
          </NavLink>
          <NavLink to="/search" icon={Search} active={isActive("/search")}>
            SEARCH
          </NavLink>
          <NavLink
            to="/dashboard"
            icon={LayoutDashboard}
            active={isActive("/dashboard")}
          >
            DASHBOARD
          </NavLink>
        </div>

        {/* Right: Auth (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 bg-red-500/10 p-2 rounded-lg hover:bg-red-500/20 transition-all border border-red-500/20"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-black bg-white px-6 py-2.5 rounded-xl text-black hover:bg-cyan-400 hover:text-white transition-all"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <div
          className="md:hidden text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0B1120] border-t border-gray-800 p-6 space-y-4 flex flex-col text-center">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 font-bold"
          >
            HOME
          </Link>
          <Link
            to="/search"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 font-bold"
          >
            SEARCH
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-300 font-bold"
          >
            DASHBOARD
          </Link>
          {user ? (
            <button onClick={handleLogout} className="text-red-400 font-bold">
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black py-3 rounded-xl font-black"
            >
              LOGIN
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon: Icon, children, active }) => (
  <Link
    to={to}
    className={`flex items-center text-[11px] font-black tracking-widest px-5 py-2 rounded-xl transition-all ${active ? "bg-cyan-500/10 text-cyan-400 shadow-inner" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
  >
    <Icon className="h-4 w-4 mr-2" /> {children}
  </Link>
);

export default Navbar;
