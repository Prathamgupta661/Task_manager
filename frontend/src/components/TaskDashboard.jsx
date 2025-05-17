import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getallTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      alert("Server Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallTasks();
  }, []);

  // Create or update task
  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (form.status === "Completed") {
        const completedby = new Date();
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/`,
          {
            title: form.title,
            description: form.description,
            status: form.status,
            completedby,
            taskid: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        toast.success("Task Updated", {
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
      } else {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/`,
          {
            title: form.title,
            description: form.description,
            status: form.status,
            taskid: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        toast.success("Task Updated", {
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
    } catch (error) {
      toast.error("Error updating task", {
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

      console.log(error);
    }
    setEditingId(null);

    setForm({ title: "", description: "", status: "Pending" });
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      return await handleUpdate(editingId);
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        {
          title: form.title,
          description: form.description,
          status: form.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatetask = [...tasks, response.data];
      setTasks(updatetask);
      toast.success("Task Created", {
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
      alert("Server Error");
      console.log(error);
    }

    setForm({ title: "", description: "", status: "Pending" });
    setLoading(false);
  };

  // Edit task
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setEditingId(task._id);
  };

  // Delete task
  const handleDelete = async (id) => {
    let cnfrm = confirm("Are you sure you want to delete this task?");
    if (cnfrm) {
      setLoading(true);
      try {
        const updatask = tasks.filter((task) => task._id !== id);
        setTasks(updatask);
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Task Deleted", {
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
        console.error(error);
        toast.error("Error deleting task", {
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center py-10 relative overflow-x-hidden">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40">
          <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Back Button */}
      <button
        className="absolute cursor-pointer left-6 top-6 z-20 flex items-center gap-2 bg-slate-800 text-blue-400 border border-blue-400 px-4 py-2 rounded-lg font-bold shadow hover:bg-slate-700 hover:text-white transition-all duration-200"
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

      
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          filter: "blur(80px)",
          top: "-120px",
          left: "-120px",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 bg-opacity-10 rounded-full blur-3xl -z-10 animate-pulse"
        style={{
          filter: "blur(80px)",
          bottom: "-120px",
          right: "-120px",
        }}
      ></div>
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
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 animate-fade-in-up">
        {/* Left: Form */}
        <div className="md:w-1/3 w-full bg-slate-900/80 rounded-2xl shadow-xl p-8 border border-slate-700 flex flex-col justify-start mb-8 md:mb-0">
          <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
            {editingId ? "Update Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full border border-blue-400 bg-slate-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg placeholder:text-slate-400"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="w-full border border-blue-400 bg-slate-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg placeholder:text-slate-400"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-blue-400 bg-slate-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex gap-4 mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-blue-400 hover:to-blue-500 transition-all duration-200 text-lg border border-blue-400 cursor-pointer"
              >
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", description: "", status: "Pending" });
                  }}
                  className=" cursor-pointer px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-slate-900 font-bold border border-gray-400 transition-all duration-200 text-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Right: Tasks Grid */}
        <div className="md:w-2/3 w-full flex flex-col">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-blue-400 rounded-2xl p-6 shadow-xl flex flex-col gap-2 bg-slate-900/80 hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-2xl text-white drop-shadow">
                      {task.title}
                    </h3>
                    <div>
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-400 cursor-pointer hover:underline mr-4 font-semibold text-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-400 cursor-pointer hover:underline font-semibold text-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-200 text-lg mb-2 break-words max-h-32 overflow-y-auto pr-2">
                    {task.description}
                  </p>
                  <div className="flex gap-6 text-md text-slate-400 flex-wrap">
                    <span>
                      Status:{" "}
                      <b
                        className={
                          task.status === "Completed"
                            ? "text-green-400"
                            : task.status === "In Progress"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }
                      >
                        {task.status}
                      </b>
                    </span>
                    <span>
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </span>
                    {task.completedAt && (
                      <span>
                        Completed: {new Date(task.completedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center font-bold text-2xl text-slate-300 col-span-full">
                No Task here
              </h1>
            )}
          </div>
        </div>
      </div>
      <style>{`
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

export default TaskDashboard;
