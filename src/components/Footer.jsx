import React from "react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-4" style={{ textAlign: "-webkit-center" }}>
          <motion.img
src={logo}
alt="Logo"
className="w-16 h-16 object-contain self-center"
variants={fadeIn("left", "spring", 0.5, 0.75)}
/>
          <h1 className="text-2xl font-bold mt-2">AcroStudio</h1>
        </div>
        <p className="text-sm text-gray-500 text-center mb-4">
        At AcroStudio, we are dedicated to delivering innovative and tailored software solutions that empower businesses in the digital age. Our mission is to elevate your vision, helping you thrive in a world driven by technology and creativity.
        </p>
        <ul className="flex gap-4">
          <li>
            <a href="#services" className="hover:text-red-600">
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-red-600">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-red-600">
              Contact
            </a>
          </li>
        </ul>
        <div className="mt-4">
          <p>&copy; {new Date().getFullYear()} AcroStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
