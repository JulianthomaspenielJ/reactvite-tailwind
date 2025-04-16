// import React, { useState } from "react";
// import axios from 'axios';
// import { toast } from "react-toastify";

// const UploadComponent = ({ setDiseaseData }) => {
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://192.168.0.140:5000";

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         alert("Please upload a valid image file (JPG or PNG).");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size must not exceed 5 MB.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewImage(reader.result);
//         analyzeImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUploadClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   const handleRemoveImage = () => {
//     setPreviewImage(null);
//     setDiseaseData(null);
//     document.getElementById("fileInput").value = "";
//     setErrorMessage(""); // Reset error message when removing image
//   };

//   const analyzeImage = async (imageUrl) => {
//     setIsAnalyzing(true);
//     setErrorMessage(""); // Reset error message before each request
  
//     try {
//       // Prepare the image file for upload
//       const fileInput = document.getElementById("fileInput");
//       const file = fileInput.files[0];
//       const formData = new FormData();
//       formData.append("file", file);
  
//       // Send the image to the backend
//       const response = await axios.post(`${backendUrl}/predict`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       // Handle backend response
//       if (response.data.error) {
//         setErrorMessage(response.data.error);
//         toast.error(response.data.error || "An error occurred during analysis.");
//       } else {
//         const diseaseDataInfo = {
//           name: response.data.predicted_class,
//           images: [imageUrl],
//           description: "No detailed description provided.",
//         };
//         setDiseaseData(diseaseDataInfo);
//       }

//       setPreviewImage(null);
//     } catch (error) {
//       console.error("Error analyzing image:", error.response?.data || error);
//       setErrorMessage(error.response?.data?.error || "An error occurred during analysis.");
//       toast.error(error.response?.data?.error || "An error occurred during analysis.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };
  

//   return (
//     <div>
//       <h1 className="text-center text-3xl sm:text-md mt-10 font-semibold text-cyan-900">
//         Upload a New Photo
//       </h1>
//       <p className="text-center text-sm text-gray-500 mt-2 mb-4">
//         JPG and PNG files are allowed
//       </p>
//       <div
//         className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer border-2 border-dashed border-gray-300"
//         onClick={!previewImage ? handleUploadClick : undefined}
//       >
//         {!previewImage ? (
//           <div>
//             <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-8xl mb-4"></i>
//             <p className="text-gray-500">
//               Drag and drop an image here, or click to <b>browse files</b>
//             </p>
//           </div>
//         ) : (
//           <div className="relative">
//             <img
//               src={previewImage}
//               alt="Uploaded Preview"
//               className="mx-auto rounded-lg max-w-full max-h-60 object-contain shadow-md mb-6"
//             />
//             <button
//               onClick={handleRemoveImage}
//               className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-600"
//             >
//               <i className="fa-solid fa-times"></i>
//             </button>
//           </div>
//         )}
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>
//       {isAnalyzing && (
//         <p className="text-blue-500 font-semibold text-center mt-4">
//           Analyzing image...
//         </p>
//       )}
//       {errorMessage && (
//         <p className="text-red-500 font-semibold text-center mt-4">
//           Error: {errorMessage}
//         </p>
//       )}
//     </div>
//   );
// };

// export default UploadComponent;


import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const UploadComponent = ({ setDiseaseData }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://192.168.0.140:5000";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file (JPG or PNG).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must not exceed 5 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        analyzeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setDiseaseData(null);
    document.getElementById("fileInput").value = "";
    setErrorMessage(""); // Reset error message when removing image
  };

  const analyzeImage = async (imageUrl) => {
    setIsAnalyzing(true);
    setErrorMessage(""); // Reset error message before each request

    try {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${backendUrl}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        setErrorMessage(response.data.error);
        toast.error(response.data.error || "An error occurred during analysis.");
      } else {
        const diseaseDataInfo = {
          name: response.data.predicted_class,
          images: [imageUrl],
          description: "No detailed description provided.",
        };
        setDiseaseData(diseaseDataInfo);
      }

      setPreviewImage(null);
    } catch (error) {
      console.error("Error analyzing image:", error.response?.data || error);
      setErrorMessage(error.response?.data?.error || "An error occurred during analysis.");
      toast.error(error.response?.data?.error || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl sm:text-md mt-10 font-semibold text-cyan-900">
        Upload a New Photo
      </h1>
      <p className="text-center text-sm text-gray-500 mt-2 mb-4">
        JPG and PNG files are allowed
      </p>
      <div
        className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer border-2 border-dashed border-gray-300"
        onClick={!previewImage ? handleUploadClick : undefined}
      >
        {!previewImage ? (
          <div>
            <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-8xl mb-4"></i>
            <p className="text-gray-500">
              Drag and drop an image here, or click to <b>browse files</b>
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewImage}
              alt="Uploaded Preview"
              className="mx-auto rounded-lg max-w-full max-h-60 object-contain shadow-md mb-6"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-600"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {isAnalyzing && (
        <p className="text-blue-500 font-semibold text-center mt-4">
          Analyzing image...
        </p>
      )}
      {errorMessage && (
        <p className="text-red-500 font-semibold text-center mt-4">
          Error: {errorMessage}
        </p>
      )}
    </div>
  );
};

export default UploadComponent;
