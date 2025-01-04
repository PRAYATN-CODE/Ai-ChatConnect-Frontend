import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../config/axios.js";
import UserContext from "../context/userContext.jsx";
import SlideBar from "../loaders/SlideBar.jsx";
import AnimatedGridPattern from "./AnimatedGridPattern.jsx";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [slideLoading, setSlideLoading] = useState(false);
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    function RegisterFormSubmitHandle(e) {
        setSlideLoading(true);
        e.preventDefault();
        axios.post('/users/register', {
            name,
            email,
            password
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user)
            setSlideLoading(false)
            toast.success('Sign Up Successfully')
            navigate('/home')
        }).catch((err) => {
            console.log(err)
            setSlideLoading(false)
            toast.error('Invalid Credentials, Something went wrong');
        })
    }

    return (
        <div className="bg-transparent min-h-screen flex items-center justify-center px-4">
            <AnimatedGridPattern />
            <div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row items-cente rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
                {slideLoading && <SlideBar />}
                <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="md:w-1/2 flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 px-6">

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to <span className="text-yellow-400">AI-ChatConnect</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="text-sm md:text-lg mb-6">
                        Experience the power of real-time conversations infused with{" "}
                        <span className="text-yellow-400 font-semibold">
                            cutting-edge AI intelligence.
                        </span>
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                        className="flex space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/login"
                                className={`bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 ${slideLoading ? "pointer-events-none opacity-50" : ""
                                    }`}
                            >
                                Login
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/"
                                className="bg-transparent border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
                            >
                                Back
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`md:w-1/2 bg-white py-10 px-8 ${slideLoading ? "pointer-events-none " : ""
                        }`}
                >
                    {/* {slideLoading && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-700 animate-slide"></div>
                    )} */}
                    <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                    <form onSubmit={RegisterFormSubmitHandle}>
                        <motion.label
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            htmlFor="name"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            Name
                        </motion.label>
                        <motion.input
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            disabled={slideLoading}
                            className="border rounded-xl px-4 py-4 w-full mb-4 disabled:opacity-50"
                            placeholder="Enter your Name"
                        />
                        <motion.label
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            htmlFor="email"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            E-mail
                        </motion.label>
                        <motion.input
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            disabled={slideLoading}
                            className="border rounded-xl px-4 py-4 w-full mb-4 disabled:opacity-50"
                            placeholder="Enter your email"
                        />
                        <motion.label
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            htmlFor="password"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            Password
                        </motion.label>
                        <motion.input
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            disabled={slideLoading}
                            className="border rounded-xl px-4 py-4 w-full mb-8 focus:ring-1 disabled:opacity-50"
                            placeholder="Enter your password"
                        />
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            type="submit"
                            disabled={slideLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        >
                            {slideLoading ? "Signing Up..." : "Sign Up"}
                        </motion.button>
                    </form>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 2 }}
                        className="flex items-center justify-between mt-4">
                        <span className="w-1/3 border-b border-black"></span>
                        <Link
                            to="/login"
                            className={`text-sm text-black hover:underline ${slideLoading ? "pointer-events-none opacity-50" : ""
                                }`}
                        >
                            or Login
                        </Link>
                        <span className="w-1/3 border-b border-black"></span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
