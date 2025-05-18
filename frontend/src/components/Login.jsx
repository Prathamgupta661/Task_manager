import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/Login";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";

const Login = ({ setloggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleChange,
    resetForm,
    values,
    errors,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: submitdata,
  });

  async function submitdata(values) {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        values
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setloggedIn(true);
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/user/dashboard");
      }
      if (response.data.error) {
        alert(response.data.error);
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {}
    resetForm();
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 relative">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40">
          <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Back Button */}
      <button
        className="absolute left-6 top-6 z-20 flex items-center gap-2 bg-slate-800 text-blue-400 border border-blue-400 px-4 py-2 rounded-lg font-bold shadow hover:bg-slate-700 hover:text-white transition-all duration-200"
        onClick={() => navigate('/')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <form
        action=""
        className="bg-white p-8 rounded-md shadow-md flex flex-col gap-4 sm:w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 border border-slate-300 rounded-md w-full"
          />
          {touched.email && errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 border border-slate-300 rounded-md w-full"
          />
          {touched.password && errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700"
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
