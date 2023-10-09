import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

import about from "../assets/undraw_browsing_re_eycn.svg";

const About = () => {
  return (
    <>
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 pb-4 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75]'
      >

<motion.img
src={about}
alt="Team"
className="max-w-full h-auto object-contain rounded-[10px] bg-transparent"
variants={fadeIn("left", "spring", 0.5, 0.75)}
/>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto'
      >
<motion.div variants={textVariant()}>
          {/* <p className={styles.sectionSubText}>About Us</p> */}
          <h2 className={styles.sectionHeadText}>About Us</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
        We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design We are a team of experienced developers who have worked on many projects and we know how to make your website stand out from the rest with our unique design 
        </motion.p>

</motion.div>
</div>
</>
);
};

export default SectionWrapper(About, "about");
