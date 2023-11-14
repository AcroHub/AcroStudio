import React, { useEffect, useState } from "react";
import { Link as ScrollLink, Events, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";


const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const handleNavLinkClick = (navId) => {
    setActive(navId);
    setToggle(false); // Close the mobile menu if open

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
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
      <ScrollLink
          to='Home'
          spy={true}
          smooth={true}
          offset={-70} // Adjust the offset as needed
          duration={500}
          className='flex items-center gap-2'
          onClick={() => {
            setActive("Home");
            scroll.scrollToTop({ duration: 500 });
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            AcroStudio &nbsp;
            <span className='sm:block hidden'></span>
          </p>
        </ScrollLink>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
            key={nav.id}
            className={`${
              active === nav.title ? "text-red-500" : "text-secondary"
            } hover:text-red-500 text-[18px] font-medium text-sm cursor-pointer`}
          >
            <ScrollLink
              to={nav.id}
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={() => handleNavLinkClick(nav.title)}
            >
              {nav.title}
            </ScrollLink>
          </li>
          ))}
         
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-red-500" : "text-secondary"
                }`}
              >
                <ScrollLink
                  to={nav.id}
                  spy={true}
                  smooth={true}
                  offset={-70} // Adjust the offset as needed
                  duration={500}
                  onClick={() => {
                    setToggle(!toggle);
                    handleNavLinkClick(nav.title);
                  }}
                >
                  {nav.title}
                </ScrollLink>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
