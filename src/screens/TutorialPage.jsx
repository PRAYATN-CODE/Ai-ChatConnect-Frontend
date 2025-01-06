import { motion } from 'framer-motion';
import React from 'react';


const TutorialPage = () => {

    const fullScreenScroll = () => {
        window.scrollTo({
            top: 400,
            behavior: "smooth",
        });
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10">
                <motion.h1
                    className="text-4xl font-bold text-blue-600 text-center mb-10"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    Welcome to Ai-ChatConnect Tutorial
                </motion.h1>

                <div className="space-y-14">
                    {/* Section 1 */}
                    <motion.div
                        className="space-y-4 border-2 border-blue-300 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Step 1: Sign In</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Sign in or log in to the website using your email address. After logging in, you’ll be directed to the homepage, where you can begin interacting with other users and explore the features of the platform.
                        </p>
                        <div className="mt-6">
                            <motion.img
                                src="https://i.imgur.com/OFzPp7m.png"
                                alt="Sign In"
                                className="w-full max-w-2xl h-auto rounded-lg shadow-xl mx-auto"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        className="space-y-4 border-2 border-blue-300 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Step 2: Load or Create a Room</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            After logging in, click on the "Load Room" button to load an existing room. If no room exists, you can create a new room by clicking the "New Room" button at the top. Enter the name of the room and click on "Create". Once the room appears, click on "Join" to enter the room.
                        </p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <img
                                    src="https://iili.io/2g20ICF.jpg"
                                    alt="Load Room"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                <img
                                    src="https://iili.io/2g2VQ49.md.jpg"
                                    alt="Create Room"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <img
                                    src="https://iili.io/2g2jdCl.md.jpg"
                                    alt="Enter Room"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            >
                                <img
                                    src="https://iili.io/2g2wBKN.md.jpg"
                                    alt="Join Room"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        className="space-y-4 border-2 border-blue-300 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Step 3: Chat & Manage Users</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Inside the room, you can add or remove users as needed. You can also chat with other users in real-time, and the message history will be saved to provide a persistent conversation.
                        </p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <img
                                    src="https://iili.io/2g2gION.md.jpg"
                                    alt="Manage Users"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                <img
                                    src="https://iili.io/2g2gw0b.md.jpg"
                                    alt="Real-time Chat"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                <img
                                    src="https://iili.io/2g2gbII.md.jpg"
                                    alt="Message History"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div
                        className="space-y-4 border-2 border-blue-300 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Step 4: AI Assistance</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            You can interact with our AI, "J.A.R.V.I.S", by typing @ai followed by your prompt. The AI will respond to your queries and assist with code-related tasks, making it easy to work within the platform.
                        </p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <img
                                    src="https://iili.io/2g2irle.md.jpg"
                                    alt="AI Chat"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                <img
                                    src="https://iili.io/2g2sBft.md.jpg"
                                    alt="AI Response"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div
                        className="space-y-4 border-2 border-blue-300 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Step 5: Test and Debug</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            You can use the Monaco code editor to test and debug your code in real-time. The editor supports Python and JavaScript, and you can execute your code to see immediate results, all within the chat room.
                        </p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <img
                                    src="https://iili.io/2g2pfl2.md.jpg"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                <img
                                    src="https://iili.io/2g2p0Dg.md.jpg"
                                    className="w-full max-w-xs h-auto rounded-lg shadow-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>






    );
};

export default TutorialPage;