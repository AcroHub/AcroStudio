import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.section
      className="black-gradient py-12 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      name="about"
      id="about"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p>
              We are AcroStudio, a dynamic and innovative software development
              company with a passion for crafting cutting-edge solutions. Our
              mission is to empower businesses with technology that elevates
              their operations and opens doors to new opportunities.
            </p>
            <p className="mt-4">
              At AcroStudio, we believe in the power of collaboration and
              creativity. Our team of talented individuals is dedicated to
              turning ideas into reality and providing tailored software
              solutions that drive success.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="../../src/assets/logo.png"
              alt="Team Photo"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
