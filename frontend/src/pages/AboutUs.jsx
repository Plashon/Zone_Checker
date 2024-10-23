import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">About us!</h1>
            <p className="py-6">
              Hi I'm Phubate, the developer of this project. I'm 3rd year
              student of Nakhon Pathom Rajabhat University.
              <br />
            </p>
            <a href="/" className="btn btn-secondary">
              Return to the home page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;