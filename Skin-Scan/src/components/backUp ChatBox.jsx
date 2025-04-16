// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// const Chatbox = ({ diseaseData, isChatboxOpen, handleCloseChatbox }) => {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(false);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://192.168.0.140:5000";

//   // Voice recognition state
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   // Predefined questions
//   const predefinedQuestions = [
//     "What are the symptoms?",
//     "What is the treatment?",
//     "How is it diagnosed?",
//   ];

//   useEffect(() => {
//     if (isChatboxOpen && diseaseData) {
//       setChatMessages([{
//         question: `Explain about ${diseaseData.name}?`,
//         answer: "Loading...",
//       }]);

//       const fetchDiseaseInfo = async () => {
//         try {
//           setIsLoading(true);
//           const formData = new FormData();
//           formData.append("query", `Explain about ${diseaseData.name}?`);

//           const response = await axios.post(`${backendUrl}/ask`, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           setChatMessages((prevMessages) => {
//             const updatedMessages = [...prevMessages];
//             updatedMessages[0].answer = response.data.response || "No detailed description available.";
//             return updatedMessages;
//           });
//         } catch (error) {
//           console.error("Error fetching disease info:", error);
//           toast.error("An error occurred while fetching disease information.");
//           setChatMessages((prevMessages) => {
//             const updatedMessages = [...prevMessages];
//             updatedMessages[0].answer = "Failed to load information.";
//             return updatedMessages;
//           });
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchDiseaseInfo();
//     }
//   }, [isChatboxOpen, diseaseData]);

//   const handleSendMessage = async (message) => {
//     if (message.trim()) {
//       try {
//         setIsLoading(true);
//         const formData = new FormData();
//         formData.append("query", message);

//         const response = await axios.post(`${backendUrl}/ask`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         setChatMessages((prevMessages) => [
//           ...prevMessages,
//           { question: message, answer: response.data.response || "No answer available" },
//         ]);
//         setCurrentMessage("");
//         resetTranscript(); // Reset the transcript after sending the message
//       } catch (error) {
//         console.error("Error during chat:", error.response || error.message);
//         toast.error(error.response?.data?.response || error.message);
//         setChatMessages((prevMessages) => [
//           ...prevMessages,
//           { question: message, answer: "Error occurred while fetching the answer." },
//         ]);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleVoiceInput = () => {
//     if (!browserSupportsSpeechRecognition) {
//       toast.error("Your browser does not support speech recognition.");
//       return;
//     }

//     if (listening) {
//       SpeechRecognition.stopListening();
//       handleSendMessage(transcript); // Send the recorded message
//     } else {
//       resetTranscript(); // Clear previous transcript
//       SpeechRecognition.startListening({ continuous: true }); // Start listening
//     }
//   };

//   const handlePredefinedQuestionClick = async (question) => {
//     try {
//       setShowPredefinedQuestions(false); // Hide predefined questions after selection
  
//       // Send the predefined question
//       await handleSendMessage(question);
//     } catch (error) {
//       console.error("Error during predefined question click:", error);
//     }
//   };

//   const handleInputFocus = () => {
//     setShowPredefinedQuestions(true); // Show the predefined questions when input is focused
//   };

//   const handleInputChange = (e) => {
//     setCurrentMessage(e.target.value);
//     if (e.target.value.trim()) {
//       setShowPredefinedQuestions(false); // Hide questions if typing
//     }
//   };

//   const handleInputBlur = () => {
//     // Delay hiding the predefined questions to allow click event to trigger
//     setTimeout(() => {
//       if (!currentMessage.trim()) {
//         setShowPredefinedQuestions(false);
//       }
//     }, 200);
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {isChatboxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative transform transition-all duration-300 scale-100 opacity-100">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseChatbox}
//             >
//               <i className="fa-solid fa-times"></i>
//             </button>

//             <h2 className="text-xl font-bold text-cyan-800 mb-4">
//               Chat about {diseaseData?.name || "Unknown Disease"}
//             </h2>

//             <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto mb-12">
//               {chatMessages.map((message, index) => (
//                 <div key={index} className="mb-5">
//                   <p className="text-black bg-gray-200 rounded-md text-sm p-2 mb-4 ms-10 text-end">
//                     <strong>Question:</strong> {message.question}
//                   </p>
//                   <p className="text-gray-700 mt-2 text-sm text-gray-400 bg-gray-300 p-2 mb-5 me-10 rounded-md">
//                     <strong>Answer:</strong> {message.answer}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Predefined Questions Section */}
//             {showPredefinedQuestions && (
//               <div className="bg-gray-100 p-4 rounded-lg mb-4 absolute bottom-20 left-6 right-6">
//                 <h3 className="font-semibold text-gray-700 mb-2 text-sm">Predefined Questions:</h3>
//                 <ul className="flex flex-col space-y-3">
//                   {predefinedQuestions.map((question, index) => (
//                     <li
//                       key={index}
//                       className="text-blue-500 cursor-pointer hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm transition-colors"
//                       onClick={() => handlePredefinedQuestionClick(question)}
//                     >
//                       {question}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Input, Submit, and Voice Section */}
//             <div className="flex items-center mx-10 fixed bottom-0 left-0 right-0 bg-white p-4">
//               <input
//                 type="text"
//                 value={currentMessage}
//                 onChange={handleInputChange}
//                 onFocus={handleInputFocus}  // Show predefined questions when input is focused
//                 onBlur={handleInputBlur}    // Hide predefined questions when input loses focus
//                 placeholder="Clear your doubts..."
//                 className="flex-1 border-b focus:outline-none focus-within:border-cyan-500 px-2 py-2 placeholder-gray-500 bg-white"
//               />
//               <button
//                 onClick={() => handleSendMessage(currentMessage)}
//                 className="text-black px-5 py-2 border-b hover:text-cyan-700 hover:scale-110 rounded-md transition"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <i className="fa-solid fa-spinner animate-spin"></i>
//                 ) : (
//                   <i className="fa-regular fa-paper-plane fa-lg"></i>
//                 )}
//               </button>
//               <button
//                 onClick={handleVoiceInput}
//                 className={`text-black px-5 py-2 border-b hover:text-cyan-700 hover:scale-110 rounded-md transition ${listening ? "text-red-500" : ""}`}
//               >
//                 <i className={`fa-solid ${listening ? "fa-microphone-slash" : "fa-microphone"}`}></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbox;




