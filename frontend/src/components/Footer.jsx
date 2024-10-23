import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center text-base-content rounded p-4 bg-base-300 fixed bottom-0 left-0 w-full">
        <nav className="grid grid-flow-col gap-2">
          <a href="/aboutus" className=" btn link link-hover text-sm">
            About us
          </a>
          <a href="/contact" className=" btn link link-hover text-sm">
            Contact
          </a>
        </nav>
        <aside>
          <p className="text-xs">
            Copyright © {new Date().getFullYear()} - All rights reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
