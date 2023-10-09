import React from "react";
import Tilt from "react-tilt";

import Tilty from "react-tilty";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

import myImage from "../assets/logo.png";

const ServiceCard = ({ index, title, icon }) => (
//   <Tilt
//    className="xs:w-[250px] w-full"
//    >
<Tilty
    reset={true} // Reset tilt on mouse leave
    glare={true} // Add glare effect
    maxGlare={0.5} // Set max glare opacity
    scale={1.05} // Set scale factor
    gyroscope={false} // Disable gyroscope on mobile devices
    className="xs:w-[250px] w-full"
  >
  <motion.div
    variants={fadeIn("top", "spring", index * 0.5, 0.75)}
    className="w-full border shadow-card"
  >
    <div
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className=" py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col"
    >
      <div className="flex justify-center items-center mb-4">
        
        <img src={icon} alt="developer" className="w-16 h-16 object-contain" />
        <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-white mr-2"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </div>

      <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
    </div>
  </motion.div>
{/* </Tilt> */}
</Tilty>
);

const Services = () => {
  return (
    <>
    <div
      className={`xl:mt-6 flex xl:flex-row flex-col-reverse gap-10 pb-4 overflow-hidden w-full justify-center`}
    >
      <motion.div
        variants={slideIn("top", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto w-full justify-center'
      >
<motion.div variants={textVariant()} className={`w-full justify-center`}>
<h2 className={styles.sectionHeadText}>Services</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] w-full justify-center"
        >
          We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design 
        </motion.p>

        <div className="mt-12 flex flex-wrap gap-10 w-full justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
</motion.div>
</div>
</>
);
};

export default SectionWrapper(Services, "services");
