import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "../assets/AddIcon.jsx";
import DeleteIcon from "../assets/DeleteIcon.jsx";
import ProfileImageIcon from "../assets/ProfileImageIcon.jsx";
import UserIcon from '../assets/UserIcon.jsx';
import axios from '../config/axios.js';
import UserContext from '../context/userContext.jsx';
import ProjectSkeleton from "../loaders/ProjectSkeleton.jsx";
import SlideBar from "../loaders/SlideBar.jsx";
import TutorialPage from "./TutorialPage.jsx";

const Home = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [project, setProject] = useState([])
    const [projectLoading, setProjectLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState(null);
    const [adminId, setAdminId] = useState(localStorage.getItem('user'));
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    const [userProfileDetail, setUserProfileDetail] = useState('')
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadModal, setUploadModal] = useState(false)
    const [uploadProfileImageLoader, setUploadProfileImageLoader] = useState(false)


    const handlelogout = () => {
        localStorage.setItem('token', '');
        localStorage.removeItem('user');
        toast.success('Logged Out Successfully');
        setUser('')
        window.location.href = '/';
        window.location.reload();
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
            setProjectLoading(false);
            toast.error('Error Loading Projects')
        });
    }

    useEffect(() => {
        if (!user && !localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

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

    const getUserProfile = async () => {
        axios.get('/users/profile', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setUserProfileDetail(res.data.user)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files && e.target.files[0]; // Ensure a file is selected

        if (selectedFile) {
            setFile(selectedFile);

            // Generate a preview of the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.error("No file selected");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploadProfileImageLoader(true)
        if (!file) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await axios.post('/profile/upload-profile-image',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                }
            );

            setUploadStatus("Image uploaded successfully!");
            console.log(response.data);
            setUploadModal(false)
            setUploadProfileImageLoader(false)
            toast.success('Image Uploaded Successfully')
            getUserProfile()
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadStatus("Error uploading image. Please try again.");
            setUploadModal(false)
            setUploadProfileImageLoader(false)
            getProjectById()
            toast.error('Something went Wrong')
        }
    };

    const handleTutorialScroll = () => {
        window.scrollTo({
            top: 1800,
            behavior: "smooth",
        });
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="bg-white flex flex-col items-center justify-around rounded-xl shadow-2xl p-6 w-[90%] max-w-[400px] h-[300px]">
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
                </motion.div>
            </div>}


            {uploadModal &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute overflow-hidden bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                        {/* Modal Header */}
                        {uploadProfileImageLoader && <SlideBar />}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Upload a File
                            </h2>
                            <button
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => setUploadModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Upload Component */}
                        <div className="h-auto w-full rounded-lg shadow-lg flex flex-col items-center justify-between p-4 gap-4 bg-blue-100">
                            {/* Preview Section */}
                            {preview ? (
                                <div className="flex-1 w-full rounded-lg overflow-hidden border-2 border-blue-500">
                                    <img
                                        src={preview}
                                        alt="Selected File"
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 w-full border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-24"
                                    >
                                        <path
                                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                                            stroke="#000000"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                    <p className="text-center text-black">
                                        Browse file to upload!
                                    </p>
                                </div>
                            )}

                            {/* File Input Section */}
                            <label
                                htmlFor="file"
                                className="bg-blue-50 w-full h-10 px-2 rounded-lg cursor-pointer flex items-center justify-between text-black border-none"
                            >
                                <svg
                                    fill="#000000"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 fill-blue-500 bg-gray-200 rounded-full p-0.5 shadow-md cursor-pointer"
                                >
                                    <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                                    <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                                </svg>
                                <p className="flex-1 text-center">
                                    {file ? file.name : "No file selected"}
                                </p>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6"
                                >
                                    <path
                                        d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                                        stroke="#000000"
                                        strokeWidth="2"
                                    ></path>
                                    <path
                                        d="M19.5 5H4.5"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    ></path>
                                    <path
                                        d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                                        stroke="#000000"
                                        strokeWidth="2"
                                    ></path>
                                </svg>
                            </label>

                            <input
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-4 flex justify-around items-center">
                            <button
                                disabled={uploadProfileImageLoader}
                                onClick={handleUpload}
                                className={`${file ? '' : 'opacity-50 disabled:cursor-not-allowed'} ${uploadProfileImageLoader ? 'opacity-50 disabled:cursor-not-allowed' : ''} md:px-6 md:py-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform`}
                            >
                                Upload
                            </button>
                            <button
                                disabled={uploadProfileImageLoader}
                                onClick={() => {
                                    setUploadModal(false)
                                    setFile(null)
                                    setPreview(null)
                                }}
                                className={`${uploadProfileImageLoader ? 'opacity-50 disabled:cursor-not-allowed' : ''} md:px-6 md:py-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600`}
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            }

            <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                {/* Navbar */}
                <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-opacity-80">
                    <motion.div
                        className="md:text-2xl text-xl font-bold  flex items-center justify-center gap-2"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <button
                            onClick={() => setUploadModal(true)}
                            className="cursor-pointer"
                        >
                            {
                                userProfileDetail.profileImage ? (
                                    <img
                                        src={userProfileDetail.profileImage} // URL or base64 string of the profile image
                                        alt="Profile"
                                        className="rounded-full w-12 h-12 aspect-square object-cover"
                                    />
                                ) : (
                                    <ProfileImageIcon />
                                )
                            }
                        </button>
                        AI-ChatConnect
                    </motion.div>
                    <motion.div
                        className="hidden md:flex space-x-8"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <button
                            onClick={handleTutorialScroll}
                            className="hover:text-yellow-400">
                            Tutorial
                        </button>

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
                                            {project?.admin === loggedInUser?._id && (
                                                <button
                                                    onClick={() => {
                                                        setDeleteProjectId(project._id);
                                                        setDeleteModal(true);
                                                    }}
                                                    className="bg-transparent border border-white w-[90px] h-[45px] rounded-lg hover:bg-blue-700 hover:shadow-lg hover:scale-110 transition duration-500 flex items-center justify-center"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            )}

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
                                <h3 className="text-xl font-bold mb-3">Real-Time Collaboration</h3>
                                <p>
                                    Collaborate with others in virtual rooms, sharing ideas, messages, and code instantly in a seamless environment.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <h3 className="text-xl font-bold mb-3">AI-Powered Assistance</h3>
                                <p>
                                    Get real-time help from Gemini AI, whether it's answering questions, assisting with coding tasks, or automating workflows.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Multi-Language Code Editor</h3>
                                <p>
                                    Work in multiple languages (Python and JavaScript) with a fully-featured Monaco code editor, complete with live execution and theme customization.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <motion.div
                                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Seamless Room Management</h3>
                                <p>
                                    Easily create, load, and join rooms with dynamic user management, so you can interact with members and manage your collaborative space effortlessly.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Encrypted Communication</h3>
                                <p>
                                    Rest assured knowing your messages and data are fully encrypted, providing a secure communication environment for you and your team.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-lg shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.1 }}
                            >
                                <h3 className="text-xl font-bold mb-3">Customizable UI</h3>
                                <p>
                                    Tailor your experience by customizing the Monaco code editor's theme and other UI elements to suit your preferences.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                </section>

                <TutorialPage />

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
