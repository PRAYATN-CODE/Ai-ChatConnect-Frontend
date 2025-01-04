import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const LandingPage = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)
    const handlenavigation = () => {
        navigate("/register");
    }

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            navigate('/home')
        }

    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
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
                <motion.button
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onClick={handlenavigation}
                >
                    Get Started
                </motion.button>
            </nav>

            {/* Hero Section */}
            <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16">
                {/* Left Content */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Welcome to Your  <br />
                        <span className="text-yellow-400">Collaborative </span>
                        Workspace
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Experience seamless real-time collaboration with AI-powered assistance. Manage rooms, chat with team members, and execute code in our integrated editor. Designed for developers and teams who value productivity and innovation.
                    </p>
                    <div className="space-x-4">
                        <Link to='/register'
                            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500">
                            Sign Up
                        </Link>
                        <Link to='/login' className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
                            Login
                        </Link>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="md:w-1/2 mt-10 md:mt-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/chatting-illustration-download-in-svg-png-gif-file-formats--messenger-logo-like-online-communication-meetup-pack-people-illustrations-4912113.png?f=webp"
                        alt="Chat illustration"
                        className="rounded-lg"
                    />
                </motion.div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white text-gray-800">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Why Choose Us?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold mb-3">Smart AI Chatbot</h3>
                            <p>
                                Harness the power of AI for real-time, intuitive communication that adapts to your needs.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <h3 className="text-xl font-bold mb-3">Real-Time Messaging</h3>
                            <p>
                                Chat without delays or interruptions, powered by lightning-fast servers.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h3 className="text-xl font-bold mb-3">Advanced Security</h3>
                            <p>
                                Protect your data with state-of-the-art encryption technology for every conversation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-16 bg-indigo-600 text-white text-center"
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    What Our Users Say
                </motion.h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                    <motion.div
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <p>
                            "AI-ChatConnect has transformed how I communicate with my team. It's fast, intuitive, and secure."
                        </p>
                        <span className="block mt-4 font-bold">- Anshul Kankane</span>
                    </motion.div>
                    <motion.div
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p>
                            "The AI chatbot feature is a game-changer. It saves so much time!"
                        </p>
                        <span className="block mt-4 font-bold">- Anupras Sharma</span>
                    </motion.div>
                    <motion.div
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            "Highly recommended for anyone looking for secure and efficient communication."
                        </p>
                        <span className="block mt-4 font-bold">- Rashika Jain</span>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-indigo-800 py-6 text-center text-white">
                All rights reserved © AI ChatConnect @Prayatn Soni
            </footer>
        </div>
    );
};

export default LandingPage;
