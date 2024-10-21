import React from "react";

const Home = () => {
  return (
    <div>
      <div className="hero bg-base-200 bg-opacity-50 min-h-screen absolute z-10">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">
              Welcome to <span className="text-blue-800 font-bold">SE</span>{" "}
              Store
            </h1>
            <p className="py-6">
              At SE Store, we
              believe that shopping should be more than just a transaction—it
              should be an experience. Our goal is to provide you with
              high-quality products, exceptional customer service, and a
              seamless shopping journey from start to finish. Whether you're
              shopping for the latest gadgets, fashionable apparel, or everyday
              essentials, SE Store is here to meet your needs.
            </p>
            <a href="/store" className="btn btn-outline">
              Go to store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
