import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom"; // 1. Link import kiya
import { Plane, Mail, Lock, ArrowRight } from "lucide-react"; // Icons add kiye
import { motion } from "framer-motion"; // Animation ke liye

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch, loading, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api.post("/users/login", { email, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E293B]/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-800"
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
            <Plane className="text-white h-8 w-8 rotate-45" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            Sign in to your SkyWings account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors"
                size={18}
              />
              <input
                type="email"
                required
                className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-4 pl-12 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                placeholder="priyanshu@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors"
                size={18}
              />
              <input
                type="password"
                required
                className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-4 pl-12 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-2xl text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] active:scale-[0.98]"
              }`}
          >
            {loading ? (
              "Authenticating..."
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* 👇 SIGNUP LINK SECTION 👇 */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors ml-1 underline decoration-cyan-400/30 underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
