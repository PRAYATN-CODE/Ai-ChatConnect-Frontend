import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "../assets/AddIcon.jsx";
import DeleteIcon from "../assets/DeleteIcon.jsx";
import UserIcon from '../assets/UserIcon.jsx';
import axios from '../config/axios.js';
import UserContext from '../context/userContext.jsx';
import ProjectSkeleton from "../loaders/ProjectSkeleton.jsx";

const Home = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [project, setProject] = useState([])
    const [projectLoading, setProjectLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState(null);
    const [adminId, setAdminId] = useState(null);

    const handlelogout = () => {
        localStorage.setItem('token', '');
        localStorage.removeItem('user');
        setUser('')
        window.location.href = '/';
        window.location.reload();
        toast.success('Logged Out Successfully');
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function createProject(e) {
        e.preventDefault();
        axios.post('/projects/create', {
            name: projectName,
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            setIsModalOpen(false)
            toast.success('Project Created Successfully')
            fetchProjects();
        }).catch((err) => {
            console.log(err)
            toast.error('Error Creating Project')
        })
    }

    const fetchProjects = () => {
        setProjectLoading(true);
        axios.get('/projects/all', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            setProject(res.data.Projects);
            setProjectLoading(false);
            toast.success('Projects Loaded Successfully')
        }).catch((error) => {
            console.error("Error fetching projects:", error);
            console.log(localStorage.getItem('token'));
            setProjectLoading(false);
            toast.error('Error Loading Projects')
        });
    }

    useEffect(() => {
        if (!user && !localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (user && user._id) {
            setAdminId(user._id);
        }

        console.log("the user is", user, "and the id is ", user._id)
    }, [user]);

    const deleteProject = () => {
        axios.delete(`/projects/delete-project/${deleteProjectId}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            toast.success('Project Deleted Successfully')
            fetchProjects();
            setDeleteModal(false);
            setDeleteProjectId(null);
        }).catch((err) => {
            console.log(err)
            toast.error('Error Deleting Project')
            setDeleteModal(false);
        })
    }


    return (
        <>
            <div>
                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="relative flex w-96 flex-col rounded-xl bg-white text-gray-700 shadow-md">
                            {/* Modal Header */}
                            <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
                                <h3 className="block text-3xl font-semibold">Start Creating Now.</h3>
                            </div>

                            {/* Modal Content */}
                            <form onSubmit={createProject} className="flex flex-col gap-4 p-6">
                                {/* Email Input */}
                                <div className="relative h-11 w-full">
                                    <input
                                        onChange={(e) => setProjectName(e.target.value)}
                                        placeholder=""
                                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        type="text"
                                    />
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        Room Name
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="block w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold shadow-md hover:shadow-lg"
                                >
                                    Create
                                </button>
                            </form>

                            {/* Modal Footer */}
                            <div className="p-6 pt-0">
                                <p className=" text-center text-sm">
                                    <button onClick={handleCloseModal} className="text-[#4f46e5] font-bold">
                                        Back
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            {deleteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white flex flex-col items-center justify-around rounded-xl shadow-2xl p-6 w-[90%] max-w-[400px] h-[300px]">
                    {/* Modal Header */}
                    <div className="text-center">
                        <h2 className="text-black text-2xl font-bold">Delete Project</h2>
                        <p className="text-gray-600 mt-2 text-base leading-relaxed">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </p>
                    </div>

                    <div className="bg-gray-500 h-[2px] w-full rounded-full"></div>

                    {/* Modal Buttons */}
                    <div className="flex justify-center gap-6">
                        <button
                            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => deleteProject()}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => setDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}






            <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                {/* Navbar */}
                <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-opacity-80">
                    <motion.div
                        className="text-2xl font-bold"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        AI-ChatConnect
                    </motion.div>
                    <motion.div
                        className="hidden md:flex space-x-8"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <a href="#about" className="hover:text-yellow-400">
                            About
                        </a>
                        <a href="#features" className="hover:text-yellow-400">
                            Features
                        </a>
                        <a href="#contact" className="hover:text-yellow-400">
                            Contact
                        </a>
                    </motion.div>
                    <motion.button
                        className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        onClick={handlelogout}
                    >
                        Logout
                    </motion.button>
                </nav>

                {/* Hero Section */}
                <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16">
                    <motion.div
                        className="md:w-1/2 text-center md:text-left"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                            Welcome Back to <br />
                            <span className="text-yellow-400">AI-ChatConnect</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Create, explore, and manage rooms tailored for your projects. Work smarter with AI-driven features, chat history, and a powerful code editor – all in one place.                        </p>
                        <div className="flex flex-wrap gap-4 md:justify-start justify-center">
                            <button onClick={handleOpenModal} className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 flex items-center justify-center space-x-2 transition duration-300">
                                <span>New Room</span>
                                <AddIcon width={20} height={20} />
                            </button>
                            <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
                                Learn More
                            </button>
                        </div>

                    </motion.div>

                    <motion.div
                        className="md:w-1/2 mt-10 md:mt-0"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/chat-bot-illustration-download-in-svg-png-gif-file-formats--support-chatbot-mobile-robotic-message-man-daily-chores-pack-business-illustrations-5868133.png?f=webp"
                            alt="Chat illustration"
                            className="rounded-lg"
                        />
                    </motion.div>
                </header>


                {/* Project Section */}
                <section id="projects" className="pb-12 pt-8 bg-white text-white">
                    <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col items-center justify-center">
                        <motion.h2
                            className="text-3xl md:text-4xl text-black font-bold text-center mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            All Rooms
                        </motion.h2>
                        {/* Scrollable container */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto md:max-h-96 max-h-[30rem] p-6 rounded-xl shadow-lg"
                        >
                            {project && project.length > 0 ? (
                                project.map((project, index) => (
                                    <motion.div

                                        key={project._id}
                                        className="min-h-40 h-fit p-6 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg"
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.1 * index }}
                                    >
                                        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                                        <p key={index} className="text-white">
                                            <span className="font-mono">Click to Start Working with Your Team and AI to Create Something Amazing!</span>
                                        </p>
                                        <p className="text-white flex items-center space-x-2 mt-3">
                                            <UserIcon />
                                            <span>{project.users.length}</span>
                                        </p>
                                        <div className="flex items-end justify-start gap-3 pt-4">
                                            <button
                                                onClick={() => {
                                                    navigate(`/project`, {
                                                        state: {
                                                            project,
                                                        },
                                                    })
                                                }}
                                                className="bg-yellow-400 text-black w-[90px] h-[45px] text-xl font-semibold rounded-lg hover:bg-yellow-500 hover:shadow-lg hover:scale-110 transition duration-500">Join</button>
                                            {project.admin === adminId && <button
                                                onClick={() => {
                                                    setDeleteProjectId(project._id)
                                                    setDeleteModal(true)
                                                }}
                                                className="bg-transparent border border-white w-[90px] h-[45px] rounded-lg hover:bg-blue-700 hover:shadow-lg hover:scale-110 transition duration-500 flex items-center justify-center">
                                                <DeleteIcon />
                                            </button>}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                !projectLoading &&
                                <div className="p-6 text-yellow-700 text-center sm:w-[24rem] w-[67vw]">
                                    <p className="text-lg font-semibold">
                                        No projects available. Please click on <span className="text-blue-500" >Load Room</span> or create a new project, otherwise wait for other users to contribute one.
                                    </p>
                                </div>
                            )}

                            {projectLoading && <ProjectSkeleton />}

                        </div>
                        {!project || (Array.isArray(project) && project.length === 0) || (typeof project === 'object' && Object.keys(project).length === 0) ? (
                            <motion.button
                                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-800 mt-6 shadow-xl"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                onClick={fetchProjects}
                            >
                                Load Room
                            </motion.button>
                        ) : null}

                    </div>
                </section>







                {/* Features Section */}
                <section id="features" className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500 text-gray-800">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <motion.h2
                            className="text-3xl md:text-4xl text-white font-bold text-center mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Features You'll Love
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Instant Messaging</h3>
                                <p>
                                    Enjoy real-time messaging with zero delays. Your conversations are always a step ahead.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Custom Emojis</h3>
                                <p>
                                    Express yourself better with custom emojis designed to make your chats more fun.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Secure Conversations</h3>
                                <p>
                                    Your data is safe with us. Experience end-to-end encrypted chats for total peace of mind.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                    <motion.div
                        className="max-w-6xl mx-auto text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">About AI-ChatConnect</h2>
                        <p className="text-lg md:text-xl">
                            AI-ChatConnect is a modern communication platform designed to simplify and secure your online interactions. Whether you're chatting with friends, collaborating with a team, or connecting with family, we've got you covered.
                        </p>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="bg-indigo-800 py-6 text-center text-white">
                    © 2024 AI-ChatConnect. All rights reserved.
                </footer>
            </div>
        </>
    );
};

export default Home;
