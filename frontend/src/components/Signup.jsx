import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpSchema } from "../schemas/SignUp";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const submitdatabackend = async (values) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/register`,
      values
    );

    toast.success("User create please login", {
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
    resetForm();
  };

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
      name: "",
      email: "",
      password: "",
      country: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: submitdatabackend,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
       <button
        className="absolute left-6 top-6 z-20 flex items-center gap-2 bg-slate-800 text-blue-400 border border-blue-400 px-4 py-2 rounded-lg font-bold shadow hover:bg-slate-700 hover:text-white transition-all duration-200"
        onClick={() => navigate(-1)}
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
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md flex flex-col gap-4 sm:w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <div>
          <input
            onBlur={handleBlur}
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border border-slate-300 rounded-md w-full "
          />
          {touched.name && errors.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            onBlur={handleBlur}
            type="text"
            name="country"
            value={values.country}
            onChange={handleChange}
            placeholder="Country"
            className="p-2 border border-slate-300 rounded-md w-full "
          />
          {touched.country && errors.country && (
            <p className="text-red-500">{errors.country}</p>
          )}
        </div>
        <div>
          <input
            onBlur={handleBlur}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border border-slate-300 rounded-md w-full "
          />
          {touched.email && errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            onBlur={handleBlur}
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border border-slate-300 rounded-md w-full "
          />
          {touched.password && errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          className="bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
