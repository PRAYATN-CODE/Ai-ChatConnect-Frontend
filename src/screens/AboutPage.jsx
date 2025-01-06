import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '../assets/GitHubIcon';
import LinkedInIcon from '../assets/LinkedInIcon';
import TwitterIcon from '../assets/TwitterIcon';

const AboutPage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-blue-700">
            {/* Header Section */}
            <motion.header
                className="bg-blue-600 md:py-10 py-6 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">About AI-ChatConnect</h1>
            </motion.header>

            {/* Main Content Section */}
            <motion.main
                className="container mx-auto py-12 px-6 sm:px-10 md:px-16 space-y-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* About the Application */}
                <section>
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold border-b-4 border-blue-700 pb-4 mb-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        About the Application
                    </motion.h2>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-800">
                        AI-ChatConnect is an advanced full-stack web application designed to revolutionize how teams collaborate and code. With real-time collaboration, AI-powered assistance, and a robust coding environment, it empowers developers and teams to achieve their goals efficiently. Built with scalability and performance in mind, the platform offers a seamless user experience, making it ideal for both beginners and seasoned professionals.
                    </p>
                </section>

                {/* Key Features */}
                <section>
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold border-b-4 border-blue-700 pb-4 mb-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Key Features
                    </motion.h2>
                    <motion.ul
                        className="list-disc list-inside space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <li>
                            <strong>Visually Engaging Landing Page:</strong> Sleek animations and smooth navigation ensure a memorable first impression.
                        </li>
                        <li>
                            <strong>Secure Authentication System:</strong> Reliable login and registration with robust security measures.
                        </li>
                        <li>
                            <strong>Centralized Dashboard:</strong> Manage and access virtual rooms effortlessly through a user-friendly interface.
                        </li>
                        <li>
                            <strong>AI-Enhanced Chat:</strong> Real-time chat with persistent message history and Gemini AI integration for intelligent assistance.
                        </li>
                        <li>
                            <strong>Advanced Code Editor:</strong> Monaco Code Editor supports Python and JavaScript, live execution, and AI-assisted debugging.
                        </li>
                        <li>
                            <strong>Dynamic Room Management:</strong> Easily add or remove members to enhance team collaboration.
                        </li>
                        <li>
                            <strong>Modular Backend Architecture:</strong> Scalable design using controllers, middleware, routes, and services.
                        </li>
                        <li>
                            <strong>Fully Responsive Design:</strong> Ensures accessibility and functionality across all devices.
                        </li>
                    </motion.ul>
                </section>

                {/* About the Developer */}
                <section>
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold border-b-4 border-blue-700 pb-4 mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        About the Developer
                    </motion.h2>
                    <motion.div
                        className="bg-yellow-100 p-6 sm:p-10 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://iili.io/2gBvgOx.md.jpg"
                            alt="Developer"
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-black"
                        />
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700">Prayatn Soni</h3>
                            <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-800">
                                AI-ChatConnect is crafted by a passionate full-stack developer with expertise in cutting-edge technologies like React.js, Express.js, MongoDB, and Tailwind CSS. This developer has a strong commitment to innovation, scalability, and user-centric design, ensuring that every project exceeds expectations.
                            </p>
                            <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-800">
                                Prayatn's mission is to create solutions that empower users, streamline workflows, and foster creativity. With a deep understanding of modern development practices, they aim to bridge the gap between functionality and aesthetics.
                            </p>


                        </div>
                    </motion.div>
                </section>

            </motion.main>



            {/* Social Media Links */}
            <section className="container mx-auto pt-3 pb-12 px-6 sm:px-10 md:px-16 space-y-12">
                <div className='flex flex-col items-center justify-center'>
                    <motion.button
                        className="mx-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-800 mt-6 shadow-xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        onClick={() => navigate('/home')}
                    >
                        Immerse Yourself
                    </motion.button>
                </div>
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold border-b-4 border-blue-700 pb-4 mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Social Media
                </motion.h2>
                <motion.div
                    className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* LinkedIn */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <a
                            href="https://www.linkedin.com/in/prayatn-soni-bb512b279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            className="text-blue-600 hover:text-blue-800 p-4 rounded-full transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedInIcon className="w-12 h-12" />
                        </a>
                        <div className="text-gray-800 text-sm sm:text-base">
                            <p className="font-semibold">LinkedIn</p>
                            <p>Connect with me on LinkedIn for professional updates and networking.</p>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <a
                            href="https://github.com/PRAYATN-CODE"
                            className="text-gray-800 hover:text-gray-900 p-4 rounded-full transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon className="w-12 h-12" />
                        </a>
                        <div className="text-gray-800 text-sm sm:text-base">
                            <p className="font-semibold">GitHub</p>
                            <p>Explore my projects and contributions on GitHub.</p>
                        </div>
                    </div>

                    {/* Twitter */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <a
                            href="https://x.com/Prayatn2005?t=0n8NIqZPUw-98BdZTe3DZQ&s=09"
                            className="text-blue-400 hover:text-blue-500 p-4 rounded-full transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TwitterIcon className="w-12 h-12" />
                        </a>
                        <div className="text-gray-800 text-sm sm:text-base">
                            <p className="font-semibold">Twitter</p>
                            <p>Follow me on Twitter for updates, thoughts, and insights.</p>
                        </div>
                    </div>
                </motion.div>
            </section>


            {/* Footer Section */}
            <motion.footer
                className="bg-blue-600 py-8 text-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-base sm:text-lg">&copy; {new Date().getFullYear()} AI-ChatConnect. All Rights Reserved</p>
            </motion.footer>
        </div>
    );
};

export default AboutPage;
