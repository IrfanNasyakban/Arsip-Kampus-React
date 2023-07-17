import React from "react";
import "../style/login.css";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
      {/* <!-- Copyright --> */}
      <div class="text-white mb-3 mb-md-0">
        Copyright © 2023 by Irvan Nasyakban. All rights reserved.
      </div>
      {/* <!-- Copyright --> */}

      {/* <!-- Right --> */}
      <div>
        <a href="#!" class="text-white me-4">
          <FaFacebookF />
        </a>
        <a href="#!" class="text-white me-4">
          <FaTwitter />
        </a>
        <a href="#!" class="text-white me-4">
          <FaGoogle />
        </a>
        <a href="#!" class="text-white">
          <FaLinkedinIn />
        </a>
      </div>
      {/* <!-- Right --> */}
    </div>
  );
};

export default Footer;
