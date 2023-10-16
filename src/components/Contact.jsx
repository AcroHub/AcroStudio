import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";
import contactSvg from "../assets/undraw_contact_us_re_4qqt.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to send the form data to your server.
      // You can use Axios, Fetch, or any other library for this.
      // Example using Axios:
      // await axios.post("/api/contact", formData);

      // Reset the form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // You can also show a success message to the user
      alert("Message sent successfully!");
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error sending the message:", error);
    }
  };

  return (
    <div className={`xl:mt-12 p-4 flex flex-wrap items-center`}>
      {/* Left Side: SVG */}
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className='xl:w-1/2 xl:h-auto w-full p-4'>
        <motion.img
          src={contactSvg}
          alt="Contact"
          className="max-w-full h-auto object-contain"
          variants={fadeIn("left", "spring", 0.5, 0.75)}
        />
      </motion.div>

      {/* Right Side: Contact Form in Card */}
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:w-1/2 xl:h-auto w-full'>

      <motion.div variants={textVariant()}>
          {/* <p className={styles.sectionSubText}>About Us</p> */}
          <h2 className={styles.sectionHeadText}>Contact Us</h2>
        </motion.div>

        <motion.div className={`p-4 rounded-md shadow-lg bg-black-200 border border-red-500`}>

          <form onSubmit={handleSubmit} className='mt-4'>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-secondary'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded-md bg-gray-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-secondary'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 rounded-md bg-gray-200'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block text-secondary'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='4'
                className='w-full px-4 py-2 rounded-md bg-gray-200'
                required
              />
            </div>
            <div className='mb-4'>
              <motion.button
                type='submit'
                className='px-4 py-2 bg-red-600 text-white rounded-md'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");