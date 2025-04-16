// import axios from "axios";
// import React, { useState, useEffect, useRef } from "react";
// import { toast } from "react-toastify";

// const Chatbox = ({ diseaseData, isChatboxOpen, handleCloseChatbox }) => {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const chatContainerRef = useRef(null);
//   const textAreaRef = useRef(null);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://192.168.0.140:5000";

//   useEffect(() => {
//     if (isChatboxOpen && diseaseData) {
//       const initialMessage = {
//         question: `Explain about ${diseaseData.name}?`,
//         answer: "Loading...",
//       };
//       setChatMessages([initialMessage]);

//       const fetchDiseaseInfo = async () => {
//         try {
//           setIsLoading(true);
//           const formData = new FormData();
//           formData.append("query", initialMessage.question);

//           const response = await axios.post(`${backendUrl}/ask`, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           setChatMessages([{ question: initialMessage.question, answer: response.data.response || "No detailed description available." }]);
//         } catch (error) {
//           console.error("Error fetching disease info:", error);
//           toast.error("An error occurred while fetching disease information.");
//           setChatMessages([{ question: initialMessage.question, answer: "Failed to load information." }]);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchDiseaseInfo();
//     }
//   }, [isChatboxOpen, diseaseData]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const handleSendMessage = async (message) => {
//     if (message.trim() === "") return;

//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("query", message);

//       const response = await axios.post(`${backendUrl}/ask`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { question: message, answer: response.data.response || "No answer available" },
//       ]);

//       setCurrentMessage("");
//     } catch (error) {
//       console.error("Error during chat:", error);
//       toast.error("Error occurred while fetching the answer.");
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { question: message, answer: "Error occurred while fetching the answer." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(currentMessage);
//     }
//   };

//   const handleVoiceInput = async () => {
//     setIsListening(true);
//     try {
//       const response = await axios.get(`${backendUrl}/start`);
//       setCurrentMessage(response.data.text);
//     } catch (error) {
//       console.error("Voice recognition error:", error);
//       toast.error("Voice recognition failed.");
//     } finally {
//       setIsListening(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {isChatboxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseChatbox}
//             >
//               <i className="fa-solid fa-times"></i>
//             </button>

//             <h2 className="text-xl font-bold text-cyan-800 mb-4">
//               Chat about {diseaseData?.name || "Unknown Disease"}
//             </h2>

//             <div ref={chatContainerRef} className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto mb-4">
//               {chatMessages.map((message, index) => (
//                 <div key={index} className="mb-5">
//                   <p className="text-black bg-gray-200 rounded-md text-sm p-2 mb-2 ms-10 text-end">
//                     <strong>Question:</strong> {message.question}
//                   </p>
//                   <p className="text-gray-700 text-sm bg-gray-300 p-2 me-10 rounded-md">
//                     <strong>Answer:</strong> {message.answer}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center bg-white p-4 rounded-lg">
//               <textarea
//                 ref={textAreaRef}
//                 value={currentMessage}
//                 onChange={(e) => {
//                   setCurrentMessage(e.target.value);
//                   textAreaRef.current.style.height = "auto";
//                   textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
//                 }}
//                 onKeyDown={handleKeyPress}
//                 placeholder="Something about this ..."
//                 className="flex-1 border-b focus:outline-none px-2 py-2 placeholder-gray-500 bg-white resize-none overflow-hidden"
//                 rows={1}
//               />
//               <button
//                 onClick={() => handleSendMessage(currentMessage)}
//                 className="text-black px-5 py-2 border-b hover:text-cyan-700 hover:scale-110 rounded-md transition"
//               >
//                 <i className="fa-regular fa-paper-plane fa-lg"></i>
//               </button>
//               <button
//                 onClick={handleVoiceInput}
//                 className={`text-black px-5 py-2 border-b rounded-full transition ${
//                   isListening ? "bg-red-500 text-white animate-pulse" : "hover:text-cyan-700 hover:scale-110"
//                 }`}
//               >
//                 <i className="fa-solid fa-microphone"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbox;

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";

const Chatbox = ({ diseaseData, isChatboxOpen, handleCloseChatbox }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true); // Show questions initially
  const [questionsShown, setQuestionsShown] = useState(false); // Track if questions were shown
  const chatContainerRef = useRef(null);
  const textAreaRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://192.168.0.140:5000";

  const predefinedQuestions = [
    "What are the symptoms?",
    "What is the treatment?",
    "How is it diagnosed?",
  ];

  useEffect(() => {
    if (isChatboxOpen && diseaseData) {
      const initialMessage = {
        question: `Explain about ${diseaseData.name}?`,
        answer: "Loading...",
      };
      setChatMessages([initialMessage]);

      const fetchDiseaseInfo = async () => {
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("query", initialMessage.question);

          const response = await axios.post(`${backendUrl}/ask`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          setChatMessages([{ question: initialMessage.question, answer: response.data.response || "No detailed description available." }]);
        } catch (error) {
          console.error("Error fetching disease info:", error);
          toast.error("An error occurred while fetching disease information.");
          setChatMessages([{ question: initialMessage.question, answer: "Failed to load information." }]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDiseaseInfo();
    }
  }, [isChatboxOpen, diseaseData]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    setShowQuestions(false); // Hide questions when user sends a message
    setQuestionsShown(true); // Ensure they don't appear again

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("query", message);

      const response = await axios.post(`${backendUrl}/ask`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { question: message, answer: response.data.response || "No answer available" },
      ]);

      setCurrentMessage("");
    } catch (error) {
      console.error("Error during chat:", error);
      toast.error("Error occurred while fetching the answer.");
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { question: message, answer: "Error occurred while fetching the answer." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(currentMessage);
    }
  };

  const handleVoiceInput = async () => {
    setIsListening(true);
    try {
      const response = await axios.get(`${backendUrl}/start`);
      setCurrentMessage(response.data.text);
      setShowQuestions(false); // Hide questions after voice input
      setQuestionsShown(true);
    } catch (error) {
      console.error("Voice recognition error:", error);
      toast.error("Voice recognition failed.");
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {isChatboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleCloseChatbox}
            >
              <i className="fa-solid fa-times"></i>
            </button>

            <h2 className="text-xl font-bold text-cyan-800 mb-4">
              Chat about {diseaseData?.name || "Unknown Disease"}
            </h2>

            <div ref={chatContainerRef} className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto mb-4">
              {chatMessages.map((message, index) => (
                <div key={index} className="mb-5">
                  <p className="text-black bg-gray-200 rounded-md text-sm p-2 mb-2 ms-10 text-end">
                    <strong>Question:</strong> {message.question}
                  </p>
                  <p className="text-gray-700 text-sm bg-gray-300 p-2 me-10 rounded-md">
                    <strong>Answer:</strong> {message.answer}
                  </p>
                </div>
              ))}

              {showQuestions && !questionsShown &&
                predefinedQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentMessage(question);
                      handleSendMessage(question);
                    }}
                    className="cursor-pointer text-black bg-gray-100 text-sm p-2 rounded-md mb-2 hover:bg-gray-200 transition"
                  >
                    <strong>Question:</strong> {question}
                  </div>
                ))}
            </div>

            <div className="flex items-center border bg-white p-4 rounded-lg">
              <textarea
                ref={textAreaRef}
                value={currentMessage}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                  textAreaRef.current.style.height = "auto";
                  textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";

                  if (e.target.value.trim() !== "") {
                    setShowQuestions(false);
                  }
                }}
                onFocus={() => {
                  if (!questionsShown) {
                    setShowQuestions(true);
                  }
                }}
                onBlur={() => setShowQuestions(false)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 focus:outline-none px-2 py-2 placeholder-gray-500 bg-white resize-none overflow-hidden"
                rows={1}
              />
              <button onClick={() => handleSendMessage(currentMessage)} className="text-black text-lg px-5 py-2 border-b hover:text-cyan-700 hover:scale-110 rounded-md transition">
              <IoMdSend />
              </button>
              <button onClick={handleVoiceInput} className={`text-black px-5 py-2 border-b rounded-full transition ${isListening ? "bg-red-500 text-white animate-pulse" : "hover:text-cyan-700 hover:scale-110"}`}>
                <i className="fa-solid fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
