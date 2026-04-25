import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, User, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch, loading, error } = useContext(AuthContext);
  const [customError, setCustomError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setCustomError("");

    if (password !== confirmPassword) {
      return setCustomError("Passwords do not match!");
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] px-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1E293B]/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-800"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-cyan-500/20">
            <UserPlus className="text-white h-7 w-7" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm font-medium text-center">
            Join SkyWings for a premium travel experience
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-3.5 pl-12 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                placeholder="Priyanshu Singh"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-3.5 pl-12 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
                placeholder="hello@skywings.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-3.5 pl-12 outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Confirm
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0B1120]/50 text-white border border-gray-700 rounded-2xl p-3.5 pl-12 outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {(error || customError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] p-3 rounded-xl text-center font-bold"
            >
              {customError || error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 mt-2
              ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] active:scale-[0.98]"
              }`}
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Sign Up <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="mt-6 text-center border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors ml-1 underline decoration-cyan-400/30 underline-offset-4"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
