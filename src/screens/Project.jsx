import Editor from "@monaco-editor/react";
import { motion } from 'framer-motion';
import "highlight.js/styles/github-dark.css";
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ArrowIcon from '../assets/ArrowIcon';
import CopyIcon from '../assets/CopyIcon.jsx';
import CustomIcon from '../assets/CustomIcon.jsx';
import GroupIcon from '../assets/GroupIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SendMessageIcon from '../assets/SendMessageIcon';
import UserIconWithAdd from '../assets/UserIconWithAdd';
import UserRemoveIcon from "../assets/UserRemoveIcon.jsx";
import axios from '../config/axios.js';
import { disconnectSocket, initializeSocket, reciveMessage, sendMessage } from '../config/socket.js';
import UserContext from '../context/userContext.jsx';
import ChatSkeleton from "../loaders/ChatSkeleton.jsx";
import MarkdownRenderer from './MarkdownRenderer.jsx';


const Project = () => {

    const location = useLocation();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState(location.state.project);
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [copied, setCopied] = useState(false);
    const [fileTree, setFileTree] = useState({});
    const [currentFile, setCurrentFile] = useState(null)
    const [openFiles, setOpenFiles] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const { user, setUser } = useContext(UserContext);
    const messageBox = React.createRef()
    const navigate = useNavigate();
    const [code, setCode] = useState("// Start coding here...\n");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [codeOutput, setCodeOutput] = useState("");
    const [codeOutputLoading, setCodeOutputLoading] = useState(false);
    const [chatHistoryLoading, setChatHistoryLoading] = useState(false);
    const [activeUserId, setActiveUserId] = useState(null);
    const ProjectUser = JSON.parse(localStorage.getItem('user'))

    const handleRemoveClick = (userId) => {
        if (activeUserId === userId) {
            setActiveUserId(null);
        } else {
            setActiveUserId(userId);
        }
    };

    const deleteUserFromProject = (userId, userName) => {
        axios.put('/projects/delete-user', {
            projectId: location.state.project._id,
            userId: userId
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            getProjectById()
            getAllUsers();
            toast.success(`${userName} Removed Successfully`)
        }).catch((err) => {
            console.error(err);
            toast.error(`Failed to Remove User: ${err.response?.data?.message || err.message}`);
        });
    }

    function addCollaborator() {

        if (!project.admin === ProjectUser._id) {
            toast.warning('Only Admin can add users')
            return
        }

        axios.put('/projects/add-user', {
            projectId: location.state.project._id,
            users: [selectedUserId],
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            setIsModalOpen(false)
            setSelectedUserId([])
            getProjectById()
            getAllUsers();
            toast.success('User Added Successfully')
        }).catch((err) => {
            console.log(err)
            if (err.response.data.error === 'Only the Project Admin can add users') {
                toast.error('Only the Project Admin can add users')
            } else {
                toast.error('Failed to Add User')
            }
        })
    }

    const getProjectById = () => {
        axios.get(`/projects/get-project/${location.state.project._id}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            setProject(res.data.project)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllUsers = () => {
        axios.get('/users/all', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            }
        }).then((res) => {
            setUsers(res.data.users)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        getProjectById();
    }, []);

    useEffect(() => {
        const socket = initializeSocket(project._id);

        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                toast.error("You have been Removed by Admin");
                navigate("/home");
            } else if (reason === "transport close") {
                toast.error("Connection lost. Please check your internet connection.");
            } else {
                toast.error("Disconnected unexpectedly.");
            }
        });

        return () => {
            disconnectSocket();
        }
    }, [project._id, navigate])

    useEffect(() => {
        reciveMessage('project-message', data => {
            appendIncomingMessage(data);
        });
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (user && user._id) {
            getChatHistory();
        }
    }, [user]);

    const getChatHistory = async () => {
        setChatHistoryLoading(true);
        try {
            const res = await axios.get(`/chat/history/${location.state.project._id}`);
            const history = res.data;
            const formattedMessages = history.map(msg => ({
                text: msg.text,
                senderName: msg.sender.id.name,
                senderId: msg.sender.id._id,
                timestamp: msg.timestamp,
                isOutgoing: msg.sender.id._id === user._id,
            }));

            setMessages(formattedMessages);
            setChatHistoryLoading(false);
        } catch (err) {
            console.error('Error fetching chat history:', err);
            setChatHistoryLoading(false);
        }
    };

    const send = () => {
        if (message.trim() === "") return;

        sendMessage('project-message', {
            message,
            sender: user
        });
        appendOutgoingMessage({ message, sender: user });
        toast.success('Message Sent');
        setMessage('');
    };

    const appendIncomingMessage = (messageObject) => {
        if (!messageObject.sender || !messageObject.sender._id) {
            console.error("Message sender or sender _id is missing:", messageObject);
            return;
        }

        setMessages(prevMessages => [
            ...prevMessages,
            {
                text: messageObject.message,
                senderName: messageObject.sender.name,
                senderId: messageObject.sender._id,
                timestamp: messageObject.timestamp,
                isOutgoing: false,
            },
        ]);

        scrollToBottom();
    };

    const appendOutgoingMessage = (messageObject) => {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                text: messageObject.message,
                senderName: user.name,
                senderId: user._id,
                timestamp: new Date().toISOString(),
                isOutgoing: true,
            },
        ]);

        scrollToBottom();
    };

    const scrollToBottom = () => {
        if (!messageBox.current) return;
        messageBox.current.scrollTo({
            top: messageBox.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success('Copied to clipboard');
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy to clipboard');
        }
    };

    const convertToIndianTime = (isoTimestamp) => {
        try {
            const date = new Date(isoTimestamp);
            // Check if the date is valid
            if (isNaN(date)) {
                throw new Error('Invalid Date');
            }

            const indianTime = date.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true,
            });
            return indianTime;
        } catch (error) {
            // If invalid date, return the current date in IST
            const currentDate = new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true,
            });
            return currentDate;
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleCodeChange = (value) => {
        setCode(value);
    };

    const executeCode = async () => {
        setCodeOutput('');
        setCodeOutputLoading(true);
        try {
            const res = await axios.post('/code/execute', {
                code,
                language,
            });
            setCodeOutput(res.data.output);
            setCodeOutputLoading(false);
            toast.success('Code executed successfully');
        } catch (err) {
            console.error(err);
            setCodeOutput(`Error: IN ${code}`);
            setCodeOutputLoading(false);
            toast.error('Failed to execute code');
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (
        <>
            <main className="h-screen flex flex-wrap">

                <section className="left h-full w-full lg:w-[480px] bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 flex flex-col ">
                    {/* Header */}
                    <header className="flex justify-between items-center p-2 px-4 w-full bg-blue-800 shadow-md">
                        <motion.button
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            onClick={() => setIsModalOpen(true)}
                            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                        >
                            <UserIconWithAdd />
                        </motion.button>
                        <motion.h1
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="text-white text-base text-center font-light font-mono px-3"
                        >
                            {project.name}
                        </motion.h1>

                        <motion.button
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                        >
                            <GroupIcon className="text-white" />
                        </motion.button>
                    </header>

                    {/* Conversation Area */}
                    <div className="conversation-area flex-grow flex flex-col justify-between h-[75%]">
                        {/* Message Box */}
                        <div ref={messageBox} className="message-box flex-grow p-4 overflow-y-auto bg-blue-100 rounded-t-lg w-full space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 hover:scrollbar-thumb-blue-700 scrollbar-thumb-rounded-lg">
                            {chatHistoryLoading ? <ChatSkeleton /> : (
                                messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className={`flex mt-4 ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex flex-col ${msg.isOutgoing ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-2 text-gray-600 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>
                                                {msg.senderName}
                                            </div>
                                            <div className={`p-2 rounded-lg ${msg.isOutgoing ? 'bg-blue-600 text-white' : 'bg-blue-200 text-black'} sm:max-w-[22rem] max-w-64 text-lg`}>
                                                {msg.senderName === 'J.A.R.V.I.S' ? (
                                                    <div className="relative px-[0.5em] overflow-x-scroll rounded-md scrollbar-none">
                                                        <MarkdownRenderer content={msg.text} />
                                                        {msg.senderName === "J.A.R.V.I.S" && (
                                                            <button onClick={() => { copyToClipboard(msg.text) }} className="mt-4 mb-3 flex justify-center items-center space-x-1 px-3 py-1 bg-gray-900/75 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800">
                                                                <CopyIcon />
                                                                <span className='text-base font-light'>{copied ? 'Copied!' : 'Copy'}</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div >{msg.text}</div>
                                                )}
                                            </div>
                                            <small className={`p-2 text-gray-600 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>{convertToIndianTime(msg.timestamp)}</small>
                                        </div>

                                    </motion.div>
                                ))
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="inputfield flex items-center w-full px-3 py-4 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 shadow-lg border-b-8 border-t-8 border-blue-900"
                        >
                            <motion.input
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="py-4 px-6 flex-grow border-none rounded-xl outline-none bg-blue-50 placeholder-gray-700 focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="Type a Message"
                            />
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                onClick={send}
                                className="p-2 ml-3 rounded-full bg-blue-800 hover:bg-blue-900 border-4 border-blue-400 text-white transition duration-300"
                            >
                                <SendMessageIcon />
                            </motion.button>
                        </motion.div>
                    </div>

                    <div className={`sidepanel w-full lg:w-[480px] h-full bg-blue-500 absolute lg:-left-[480px] -left-full top-0 transform ${isSidePanelOpen ? 'lg:translate-x-[480px] translate-x-full opacity-100' : 'opacity-70'} transition-transform duration-300`}>
                        <header className="flex justify-between items-center p-2 px-4 w-full bg-blue-800 shadow-md">
                            <h1 className='text-white text-xl font-bold'>Collaborators Members</h1>
                            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300">
                                <ArrowIcon className="text-white" />
                            </button>
                        </header>

                        {/* Users */}
                        <div className="users flex flex-col gap-6 p-4 bg-blue-500 rounded-lg w-full">
                            {project &&
                                Array.isArray(project.users) &&
                                project.users.map((user, index) => (
                                    <motion.div
                                        key={index}
                                        className="user relative flex items-center justify-between gap-4 bg-blue-800 rounded-lg px-4 py-2 shadow-md hover:shadow-lg hover:bg-blue-900 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center gap-4">
                                            <div
                                                className={`aspect-square p-3 flex justify-center items-center rounded-full w-fit h-fit bg-blue-800`}
                                            >
                                                <ProfileIcon />
                                            </div>
                                            <h1 className="text-white font-semibold text-lg">{user.name}</h1>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            {project.admin === user._id ? (
                                                <h1 className="text-white font-light text-sm bg-blue-600 px-3 py-1 rounded-3xl">
                                                    Admin
                                                </h1>
                                            ) : (project.admin === ProjectUser._id ? (
                                                <button
                                                    onClick={() => handleRemoveClick(user._id)}
                                                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300"
                                                >
                                                    <UserRemoveIcon />
                                                </button>
                                            ) : (
                                                <h1 className="text-white font-light text-sm bg-blue-600 px-3 py-1 rounded-3xl">
                                                    Member
                                                </h1>
                                            ))}
                                        </div>

                                        {/* Conditional Popup for Delete Confirmation */}
                                        {activeUserId === user._id && (
                                            <div className="absolute top-full mt-2 right-0 bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg shadow-xl w-56 text-center z-10">
                                                <p className="text-white text-sm mb-4 font-medium">
                                                    Are you sure you want to remove <span className="font-semibold">{user.name}</span>?
                                                </p>
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        className="bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow hover:bg-red-500 hover:shadow-lg transition-all duration-300 ease-in-out"
                                                        onClick={() => {
                                                            deleteUserFromProject(user._id, user.name);
                                                            setActiveUserId(null); // Close popup after deletion
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                    <button
                                                        className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-md shadow hover:bg-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out"
                                                        onClick={() => setActiveUserId(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </section>

                <section className="right  bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 flex-grow w-full lg:w-[480px] h-full overflow-hidden lg:overflow-x-hidden">
                    <header className="flex justify-between items-center sm:p-4 p-2  w-full bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 shadow-md ">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="text-xl font-mono text-white">
                                Monaco Code Editor
                            </motion.h1>
                        </div>

                        <div className="flex justify-center md:items-center items-end gap-4 md:flex-row flex-col ">
                            <motion.form
                                initial={{ opacity: 0, x: 100 }} // Start position off to the right
                                animate={{ opacity: 1, x: 0 }}   // End position in its natural place
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex w-full max-w-fit justify-center gap-2 items-center"
                            >
                                <label htmlFor="theme" className="block text-xl font-medium text-white font-mono mb-1">Theme:</label>
                                <div className="relative">
                                    <select
                                        id="theme"
                                        name="theme"
                                        className="block w-full font-mono appearance-none bg-blue-100 border border-gray-300 rounded-lg py-2 pl-3 pr-6 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        onChange={(e) => setTheme(e.target.value)}
                                    >
                                        <option value="vs-dark">Dark</option>
                                        <option value="vs-light">Light</option>
                                        <option value="hc-black">Hc-Black</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.form>

                            <motion.form
                                initial={{ opacity: 0, x: 100 }} // Start position off to the right
                                animate={{ opacity: 1, x: 0 }}   // End position in its natural place
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex w-full max-w-fit justify-center gap-2 items-center"
                            >
                                <label htmlFor="language" className="block text-xl font-medium text-white font-mono mb-1">Language:</label>
                                <div className="relative">
                                    <select
                                        id="language"
                                        name="language"
                                        className="block w-full font-mono appearance-none bg-blue-100 border border-gray-300 rounded-lg py-2 pl-3 pr-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.form>
                        </div>
                    </header>

                    <div className="text-white w-full h-full sm:p-6 p-4 text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-thumb-rounded-lg">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                            className="px-3 py-2 flex items-center bg-transparent rounded-lg sm:mb-4 mb-2 border-2 border-blue-400 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <h1>Code It, Run It</h1>
                            <button
                                onClick={executeCode}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg ml-auto transition duration-300">
                                Run
                            </button>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                            className="w-full h-[50vh] border-2 border-blue-400 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        >

                            <Editor

                                height="100%"
                                width="100%"
                                language={language}
                                theme={theme}
                                value={`${language === 'javascript' ? "// Start Learning Javascript...\n" : '# Start Learning Python...\n'}`}
                                onChange={handleCodeChange}
                                options={{
                                    fontSize: 14,
                                    fontFamily: "Fira Code, monospace",
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                }}
                            />
                        </motion.div>

                        <div className=" output sm:mt-4 mt-2">
                            <p className="font-mono text-white mb-2">Output:</p>
                            <motion.pre
                                value={codeOutput}
                                className="relative w-full h-[140px] overflow-y-scroll bg-black text-white border-2 border-blue-400 rounded-lg sm:p-4 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-white placeholder:font-mono"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                            >
                                {/* {codeOutputLoading && <SlideBar/>} */}
                                {`${codeOutput ? codeOutput : codeOutputLoading ? "Compiling..." : "Output will be displayed here..."}`}
                            </motion.pre>
                        </div>
                    </div>
                </section>

            </main >

            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl md:p-8 p-4 md:max-w-lg relative mx-4">
                            <h2 className="md:text-3xl text-2xl font-bold text-blue-700 md:mb-6 mb-4 text-center">
                                Recruit User
                            </h2>
                            <div className="relative h-11 w-[80%] mx-auto mb-6">
                                <input
                                    placeholder=""
                                    className="peer h-full w-full rounded-lg border border-blue-gray-200 bg-transparent px-2 py-6 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <label
                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1 flex h-full w-full select-none text-[12px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                    Search User
                                </label>
                            </div>
                            <ul className=" p-1 rounded-md space-y-4 md:h-72 h-60 overflow-y-scroll overflow-x-hidden scrollbar-none">
                                {users
                                    .filter(
                                        (user) =>
                                            !project.users.some((projectUser) => projectUser._id === user._id) &&
                                            user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) // Use debounced term
                                    )
                                    .map((user) => (
                                        <motion.li
                                            key={user._id}
                                            className={`md:p-4 p-1 rounded-lg flex items-center justify-between cursor-pointer transition-all transform hover:shadow-lg ${selectedUserId === user._id
                                                ? "bg-blue-300 border border-blue-800"
                                                : "bg-blue-50"
                                                }`}
                                            onClick={() => setSelectedUserId(user._id)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className={`aspect-square p-3 flex justify-center items-center rounded-full w-fit h-fit bg-blue-600`}
                                                >
                                                    <ProfileIcon />
                                                </div>
                                                <span className="text-gray-800 font-semibold md:text-lg text-base">
                                                    {user.name}
                                                </span>
                                            </div>
                                            {selectedUserId === user._id && (
                                                <span className="font-bold text-sm bg-blue-600 py-1 px-2 rounded-full text-white">
                                                    <CustomIcon />
                                                </span>
                                            )}
                                        </motion.li>
                                    ))
                                }
                            </ul>
                            <div className="md:mt-8 mt-4 flex justify-between items-center">
                                <button
                                    className="md:px-6 md:py-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform transform"
                                    onClick={addCollaborator}
                                >
                                    Add User
                                </button>
                                <button
                                    className="md:px-6 md:py-3 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-transform transform"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Back
                                </button>
                            </div>
                            {/* Add a close button in the top-right corner */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    </div >
                )
            }
        </>
    )
}

export default Project
