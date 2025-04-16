// import React, { useState } from "react";
// import HowItWorks from "../components/HowItsWorks";
// import UploadComponent from "../components/UploadComponent";
// import DiseaseInfo from "../components/DiseaseInfo";
// import Chatbox from "../components/Chatbox";

// const UploadPage = () => {
//   const [diseaseData, setDiseaseData] = useState(null);
//   const [isChatboxOpen, setIsChatboxOpen] = useState(false);

//   const handleOpenChatbox = () => {
//     setIsChatboxOpen(true);
//   };

//   const handleCloseChatbox = () => {
//     setIsChatboxOpen(false);
//   };

//   return (
//     <div className="w-3/4 mx-auto mb-10">
//       <HowItWorks />
//       <UploadComponent setDiseaseData={setDiseaseData} />
//       { diseaseData && (
//       <DiseaseInfo
//         diseaseData={diseaseData}
//         handleOpenChatbox={handleOpenChatbox}
    
//       />
//     )}
//       <Chatbox
//         diseaseData={diseaseData}
//         isChatboxOpen={isChatboxOpen}
//         handleCloseChatbox={handleCloseChatbox}
//       />
//     </div>
//   );
// };

// export default UploadPage;


// import React, { useState } from "react";
// import HowItWorks from "../components/HowItsWorks";
// import UploadComponent from "../components/UploadComponent";
// import DiseaseInfo from "../components/DiseaseInfo";
// import Chatbox from "../components/Chatbox";

// const UploadPage = () => {
//   const [diseaseData, setDiseaseData] = useState(null);
//   const [isChatboxOpen, setIsChatboxOpen] = useState(false);

//   // Open chatbox
//   const handleOpenChatbox = () => {
//     setIsChatboxOpen(true);
//   };

//   // Close chatbox
//   const handleCloseChatbox = () => {
//     setIsChatboxOpen(false);
//   };

//   return (
//     <div className="w-3/4 mx-auto mb-10">
//       <HowItWorks />
//       <UploadComponent setDiseaseData={setDiseaseData} />

//       {/* Render DiseaseInfo only if diseaseData is available */}
//       {diseaseData && (
//         <DiseaseInfo
//           diseaseData={diseaseData}
//           handleOpenChatbox={handleOpenChatbox}
//         />
//       )}

//       {/* Render Chatbox only if diseaseData is present and chatbox is open */}
//       {diseaseData && isChatboxOpen && (
//         <Chatbox
//           diseaseData={diseaseData}
//           isChatboxOpen={isChatboxOpen}
//           handleCloseChatbox={handleCloseChatbox}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadPage;

import React, { useState } from "react";
import HowItWorks from "../components/HowItsWorks";
import UploadComponent from "../components/UploadComponent";
import DiseaseInfo from "../components/DiseaseInfo";
import Chatbox from "../components/Chatbox";

const UploadPage = () => {
  const [diseaseData, setDiseaseData] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const handleOpenChatbox = () => {
    setIsChatboxOpen(true);
  };

  const handleCloseChatbox = () => {
    setIsChatboxOpen(false);
  };

  return (
    <div className="w-3/4 mx-auto mb-10">
      <HowItWorks />
      <UploadComponent setDiseaseData={setDiseaseData} />

      {diseaseData && (
        <DiseaseInfo
          diseaseData={diseaseData}
          handleOpenChatbox={handleOpenChatbox}
        />
      )}

      {diseaseData && isChatboxOpen && (
        <Chatbox
          diseaseData={diseaseData}
          isChatboxOpen={isChatboxOpen}
          handleCloseChatbox={handleCloseChatbox}
        />
      )}
    </div>
  );
};

export default UploadPage;
