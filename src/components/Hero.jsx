import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { styles } from "../styles";
import { AcrosCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { Link } from "react-router-dom";

import { Link as ScrollLink, Events, animateScroll as scroll } from "react-scroll";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '/src/config/motion';

const Hero = () => {

  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleNavLinkClick = (navId) => {
    setActive(navId);

    setScrolled(true);

    if (navId === "Home") {
      scroll.scrollToTop({ duration: 500 });
      setScrolled(false);
    }
  };

  const handleScroll = () => {
    const scrollOffset = window.scrollY;

    // Loop through the sections and update the active link
    navLinks.forEach((nav) => {
      const section = document.getElementById(nav.id);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (scrollOffset >= sectionTop - 100 && scrollOffset < sectionBottom - 100) {
          setActive(nav.title);
        }
      }
    });

    setScrolled(true);

    if (scrollOffset === 0) {
      setActive("Home");
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      // Handle scrolling events here if needed
    });
    Events.scrollEvent.register("end", (to, element) => {
      // Handle scrolling events here if needed
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
<section className={`relative w-full h-screen mx-auto`}>
    <div
      className={`xl:mt-28 flex xl:flex-row flex-col-reverse overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-transparent'
      >
     
        <motion.div className="" {...headContainerAnimation}>
          <motion.div {...headTextAnimation}>
            <h1 className="head-text">
            <span className="text-red-600">A</span>CRO<br /><span className="text-red-600">S</span>TUDIO
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-5"
          >

<h1 className="font-poppins font-semibold ss:text-[38px] text-[22px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        Innovate. Integrate. Elevate.
        </h1>

            <p className="max-w-md font-normal text-white text-base">Empowering Your Vision with Cutting-Edge Software. We specialize in crafting tailor-made solutions to elevate your business in the digital age. Discover the future with AcroStudio.</p>
           
          </motion.div>

          <motion.div {...slideAnimation} className="gap-5">
            <button className="px-2 py-1.5 mt-5 flex-1 rounded-md bg-red-600 text-white"><ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={() => handleNavLinkClick("About")}
            >
              Get Started
            </ScrollLink></button>
         
          </motion.div>
          
        </motion.div>
    
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <AcrosCanvas />
      </motion.div>
    </div>
</section>
  );
};

export default SectionWrapper(Hero, "");
