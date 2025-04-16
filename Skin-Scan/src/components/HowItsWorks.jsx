import React from "react";

const HowItsWorks = () => {
  return (
    <section id="overview" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-900">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md hover:translate-y-4 hover:shadow-inner ">
            <div className="text-cyan-500 text-4xl mb-4">
              <i className="fa-solid fa-qrcode"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
            <p>Upload an image of the skin condition.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:translate-y-4 hover:shadow-inner">
            <div className="text-cyan-500 text-4xl mb-4">
              <i className="fa-brands fa-searchengin"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
            <p>View instant identification results.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:translate-y-4 hover:shadow-inner">
            <div className="text-cyan-500 text-4xl mb-4">
              <i className="fa-regular fa-message"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Step 3</h3>
            <p>Get detailed information in the chatbox.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItsWorks;
