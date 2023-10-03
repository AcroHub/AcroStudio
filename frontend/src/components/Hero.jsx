import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { styles } from "../styles";
import { AcrosCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { Link } from "react-router-dom";

import jwt_decode from "jwt-decode";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '/src/config/motion';

const Hero = () => {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    var isAuth = false;
    var token = document.cookie.split('=')[1];

    if(token)
        isAuth = true;
    else
        isAuth = false;

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);

        console.log(decoded);

        var name = decoded.name;
        var username = decoded.username;
        var avatarUrl = decoded.avatar.url;
        setLoggedInUser({name, username, avatarUrl});
    }

  }, []);

  return (
// {/* <section className={`relative w-full h-screen mx-auto`}> */}
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

            {loggedInUser ? (
            <p className="max-w-md font-normal text-white text-base">Welcome <strong>{loggedInUser.name}!!!</strong><br />Empowering Your Vision with Cutting-Edge Software. We specialize in crafting tailor-made solutions to elevate your business in the digital age. Discover the future with AcroStudio.</p>
          ) : (
            <p className="max-w-md font-normal text-white text-base">Empowering Your Vision with Cutting-Edge Software. We specialize in crafting tailor-made solutions to elevate your business in the digital age. Discover the future with AcroStudio.</p>
          )}
     
            
          </motion.div>

          <motion.div {...slideAnimation} className="gap-5">
          {loggedInUser ? (
            <button className="px-2 py-1.5 mt-5 flex-1 rounded-md bg-red-600 text-white"><Link to='/products'>Explore</Link></button>
          ) : (
            <button className="px-2 py-1.5 mt-5 flex-1 rounded-md bg-red-600 text-white"><Link to='/login_register'>Get Started</Link></button>
          )}

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

  );
};

export default SectionWrapper(Hero, "");
