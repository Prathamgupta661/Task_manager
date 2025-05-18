import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast,Bounce } from "react-toastify";

const ProjectDashboard = ({setloggedIn}) => {
  const [showModal, setShowModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projects, setprojects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getallprojects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setprojects(response.data);
    } catch (error) {
      toast.error("Error fetching projects", {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallprojects();
  }, []);

  const handleNewProjectClick = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
    setProjectTitle("");
  };

  const handleDelete = async(id) => {
    setLoading(true);
    const updateproject = projects.filter((item) => item._id !== id);
    setprojects(updateproject);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/projects/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getallprojects();
      toast.success("Project Deleted", {
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
    } catch (error) {
      console.log("Error deleting project:", error);
      toast.error("Error deleting project", {
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projects.length < 4) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/projects/create`,
          {
            title: projectTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await getallprojects();
        setProjectTitle("");
        toast.success("Project Created", {
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
      } catch (error) {
        toast.error("Error creating project", {
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
        console.log("Error creating project:", error);
      } finally {
        setLoading(false);
      }
    } else if (projects.length >= 4) {
      alert("You can only create 4 projects");
    }
    handleClose();
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Success", {
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
    setloggedIn(false)
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col relative overflow-x-hidden">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40">
          <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse" style={{filter:'blur(80px)',top:'-120px',left:'-120px'}}></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse" style={{filter:'blur(80px)',bottom:'-120px',right:'-120px'}}></div>
      <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-5 h-20 shadow-md bg-slate-900/90 sticky top-0 z-20 gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow text-center w-full sm:w-auto">👋 Hello User</h1>
        <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
          <button onClick={handlelogout} className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 px-4 sm:px-6 rounded-md font-bold shadow hover:from-blue-400 hover:to-blue-500 transition-all duration-200 border border-blue-400 cursor-pointer text-sm sm:text-base">
            Logout
          </button>
          <button onClick={()=>alert('comming soon')} className="bg-slate-200 text-slate-900 py-2 px-4 sm:px-6 rounded-md font-bold shadow hover:bg-slate-400 transition-all duration-200 border border-slate-300 cursor-pointer text-sm sm:text-base">
            Profile
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-6xl mx-auto mt-8 mb-2 px-2 sm:px-4">
        <h2 className="font-semibold text-base sm:text-lg text-blue-300 mb-2 md:mb-0">Create Upto 4 Projects</h2>
        <button
          className="border border-blue-500 text-blue-500 p-2 rounded-full cursor-pointer font-bold bg-slate-900/80 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow text-sm sm:text-base"
          onClick={handleNewProjectClick}
          disabled={projects.length >= 4}
        >
          New Project +
        </button>
      </div>
      {/* project section */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-black/40 flex items-center justify-center z-50 animate-fade-in-up px-2">
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md border-2 border-blue-400 mx-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-500">New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                className="border-2 border-blue-400 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg placeholder:text-slate-400"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 sm:px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold border border-gray-400 transition-all duration-200 text-base sm:text-lg cursor-pointer"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg font-bold hover:from-blue-400 hover:to-blue-500 border border-blue-400 transition-all duration-200 text-base sm:text-lg cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-full flex-1 p-2 sm:p-4 mx-auto animate-fade-in-up">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-slate-900/80 shadow-xl rounded-2xl p-3 xs:p-4 sm:p-8 flex flex-col justify-between border-2 border-blue-400 hover:scale-[1.02] transition-transform duration-200 min-h-[180px] w-full"
              >
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 text-white break-words max-h-20 overflow-y-auto pr-2">{project.title}</h3>
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg font-bold hover:from-blue-400 hover:to-blue-500 border border-blue-400 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                    onClick={() => navigate(`/user/project/${project._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 border border-red-400 transition-all duration-200 mt-2 cursor-pointer text-sm sm:text-base"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center font-bold text-xl sm:text-2xl text-slate-300">No Project here</h2>
        )}
      </div>
      {/* Animations */}
      <style>{`
        @media (max-width: 640px) {
          .xs\:p-4 { padding: 1rem !important; }
          .xs\:text-xl { font-size: 1.25rem !important; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProjectDashboard;
