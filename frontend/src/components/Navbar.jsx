import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-x-hidden">
      {/* Decorative background shapes */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-green-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          filter: "blur(80px)",
          top: "-120px",
          left: "-120px",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          filter: "blur(80px)",
          bottom: "-120px",
          right: "-120px",
        }}
      ></div>
      {/* Navbar */}
      <div className="h-16 bg-slate-900/90 px-4 flex items-center justify-between shadow-lg backdrop-blur-md sticky top-0 z-20">
        <div className="pl-4 flex items-center gap-1">
          <span className="text-green-400 text-2xl font-extrabold animate-bounce">
            &lt;
          </span>
          <span className="text-white text-2xl font-extrabold tracking-tight drop-shadow">
            Task
          </span>
          <span className="text-green-400 text-2xl font-extrabold animate-bounce">
            OP/&gt;
          </span>
        </div>
        <div className="flex gap-4 pr-4">
          <button
            className="bg-gradient-to-r from-green-400 to-green-300 text-slate-900 font-bold py-2 px-4 rounded-md shadow hover:from-green-300 hover:to-green-400 transition-all duration-200 border border-green-400"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-slate-200 text-slate-900 font-bold py-2 px-4 rounded-md shadow hover:bg-slate-400 transition-all duration-200 border border-slate-300"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>

      {/* Landing Page Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
          Organize Your Work,{" "}
          <span className="text-green-400 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent animate-gradient">
            Boost Productivity
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mb-10 font-medium">
          TaskOP is your all-in-one solution for managing projects and tasks.
          Create projects, assign tasks, track progress, and stay productive with
          a beautiful, intuitive interface.
        </p>
        <div className="flex gap-6 mb-14 flex-wrap justify-center">
          <button
            className="bg-gradient-to-r from-green-400 to-green-300 text-slate-900 font-bold px-10 py-4 rounded-xl shadow-xl hover:from-green-300 hover:to-green-400 transition-all duration-200 text-lg border-2 border-green-400 animate-pulse"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <button
            className="bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-slate-700 transition-all duration-200 border-2 border-green-400 text-lg"
            onClick={() => navigate("/login")}
          >
            Demo Login
          </button>
        </div>
        <img
          src="/vite.svg"
          alt="TaskOP Dashboard Preview"
          className="w-64 md:w-96 mx-auto rounded-2xl shadow-2xl border-4 border-green-400 bg-white bg-opacity-10 hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Features Section */}
      <div className="bg-slate-800 py-20 px-4 animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-green-400 text-center mb-14 tracking-tight drop-shadow-lg">
          Why TaskOP?
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">
              Easy Project Management
            </h3>
            <p className="text-slate-300 text-lg">
              Create up to 4 projects, each with its own set of tasks. Perfect for
              personal or team use.
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">Task Tracking</h3>
            <p className="text-slate-300 text-lg">
              Add, edit, and track tasks with status updates and completion
              timestamps. Stay on top of your work.
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">
              Modern & Responsive
            </h3>
            <p className="text-slate-300 text-lg">
              Enjoy a beautiful, responsive UI that works on any device, powered
              by React and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-8 mt-10 border-t border-slate-800 text-lg tracking-wide">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-green-400 font-bold">TaskOP</span> &mdash; Manage
        your tasks, achieve your goals.
      </footer>

      {/* Animations */}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
