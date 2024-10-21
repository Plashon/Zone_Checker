import React from "react";

const ContactPage = () => {
  return (
    <div>
      {" "}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">Contact info</h1>
            <p className="py-6">
              Email : 654259011@webmail.npru.ac.th
              <br />
              Github : Plashon
              <br />
              Phone : 000-000-0000
            </p>
            <a href="/store" className="btn btn-secondary">
              Return to the store page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;