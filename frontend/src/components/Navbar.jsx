import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { animateScroll as scroll } from "react-scroll";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

import jwt_decode from "jwt-decode";

const Dropdown = ({ handleLogout, name, username, avatarUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        onClick={handleToggle}
        className='text-secondary text-[18px] font-medium cursor-pointer'
      >
        <div className="flex items-center gap-2">
          <img src={avatarUrl} alt="User avatar" className="avatar w-8 h-8" />
          <div className="flex flex-col">
            <span className="text-white name">{name}</span>
            <span className="username text-xs">@{username}</span>
          </div>
          <svg className='h-5 w-5 inline-block' viewBox='0 0 20 20'>
            <path
              fill='#ffffff'
              d='M5 8.5l5 5 5-5H5z'
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <ul className='absolute top-8 right-0 bg-black rounded-md shadow-lg z-10'>
          <li className='px-4 py-2 text-white hover:text-red-500 cursor-pointer'><Link className='px-4 py-2 text-white hover:text-red-500 cursor-pointer' to='/profile/me'>Profile</Link></li>
          
          <li className='px-4 py-2 text-white hover:text-red-500 cursor-pointer' onClick={handleLogout}><span className='px-4 py-2 text-white hover:text-red-500 cursor-pointer'>Logout</span></li>
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {

    var isAuth = false;
    var token = document.cookie.split('=')[1];

    if (token)
      isAuth = true;
    else
      isAuth = false;

    if (isAuth == true) {
      var decoded = jwt_decode(token);

      var name = decoded.name;
      var username = decoded.username;
      var avatarUrl = decoded.avatar.url;
      setLoggedInUser({ name, username, avatarUrl });
    }

  }, []);

  const handleLogout = () => {
    localStorage.clear();

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setLoggedInUser(null);

    window.location.href = '/';
    
    window.location.reload();
  };

  const scrollToAbout = () => {
    // Scroll to the 'about' section when the 'About' link is clicked
    scroll.scrollTo("about", {
      duration: 800, // Duration of the scroll animation (in milliseconds)
      smooth: "easeInOutQuart", // Easing function for smooth scrolling
      offset: -50, // Offset from the top of the target section
    });
  };

  return (
    <nav
      className={`${styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-transparent" : "bg-transparent"
        }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            AcroStudio &nbsp;
            <span className='sm:block hidden'></span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
            key={nav.id}
            className={`${
              active === nav.title ? "text-red" : "text-white"
            } hover:text-red-500 text-[18px] font-medium cursor-pointer`}
            onClick={() => {
              setActive(nav.title);
              if (nav.title === "About") {
                scrollToAbout();
              }
            }}
          >
            <a href={`/${nav.id}`}>{nav.title}</a>
          </li>
          ))}
          {loggedInUser ? (
            <li className="text-white hover:text-red-500 font-medium cursor-pointer">
              <Dropdown handleLogout={handleLogout} name={loggedInUser.name} username={loggedInUser.username} avatarUrl={loggedInUser.avatarUrl} />
            </li>
          ) : (
            <li className="text-white hover:text-red-500 font-medium cursor-pointer">
              <Link to='/login_register'>Login/Register</Link>
            </li>
          )}
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
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-red-500" : "text-white"
                    }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              {loggedInUser ? (
                <li className="text-white hover:text-red-500 font-medium cursor-pointer">
                  <Dropdown handleLogout={handleLogout} name={loggedInUser.name} username={loggedInUser.username} avatarUrl={loggedInUser.avatarUrl} />
                </li>
              ) : (
                <li className="text-white hover:text-red-500 font-medium cursor-pointer">
                  <Link to='/login_register'>Login/Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
