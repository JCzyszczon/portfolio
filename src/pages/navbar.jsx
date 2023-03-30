import React, { useState, useEffect } from 'react';
import logo from '../images/jczyszczon-high-resolution-logo-white-on-transparent-background.png';
import logo2 from '../images/jczyszczon-high-resolution-logo-color-on-transparent-background.png';
import { FiMenu } from 'react-icons/fi';
import {CgClose} from 'react-icons/cg';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-scroll";
  
const Navbar = () => {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const {ref, inView} = useInView({
    threshold: 0.5,
  });
  const animationPic = useAnimation();
  const animationPic2 = useAnimation();

  const letters = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    const listItems = document.querySelectorAll(".list-item");
    const intervals = {};
  
    listItems.forEach(listItem => {
      intervals[listItem.dataset.value] = null;
  
      listItem.addEventListener("mouseover", event => {
        const value = event.target.dataset.value;
  
        if(intervals[value]) {
          clearInterval(intervals[value]);
        }
  
        let iteration = 0;
  
        intervals[value] = setInterval(() => {
          event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
              if(index < iteration) {
                return value[index];
              }
  
              return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
  
          if(iteration >= value.length){
            clearInterval(intervals[value]);
          }
  
          iteration += 1 / 3;
        }, 30);
      });
    });

    if(inView) {
      animationPic.start({
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
      animationPic2.start({
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    } if(!inView) {
      animationPic.start({
        x: '+400px',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
      animationPic2.start({
        x: '-100px',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.1,
        }
      });
    }

  }, [inView]);

  return (
    <header className='z-[100] fixed top-0 left-0 right-0 w-full h-auto flex justify-between items-center px-20 pt-5'>
        <a href="/"><img src={logo} alt="logo" className='w-[100px] h-auto hover:opacity-70 duration-300'/></a>
        <div onClick={handleClick} className='text-[#fff] text-5xl hover:opacity-70 cursor-pointer duration-300'>
          {!nav ? <FiMenu /> : <CgClose />}
        </div>

        <motion.nav ref={ref} initial={{ y: "-100%" }} animate={{ y: nav ? "0%" : "-100%", borderRadius: nav ? "0" : "50%",}} transition={{ duration: 0.5, type: "tween", bounce: 0}} className='absolute top-0 left-0 w-full h-[100vh] bg-[#fff] flex flex-col justify-start items-center z-40'>
          <section className='w-full h-auto flex justify-between items-center px-20 pt-5'>
            <a href="/"><img src={logo2} alt="logo" className='w-[100px] h-auto hover:opacity-70 duration-300'/></a>
            <div onClick={handleClick} className='text-mainColor text-5xl hover:opacity-70 cursor-pointer duration-300'>
              {!nav ? <FiMenu /> : <CgClose />}
            </div>
          </section>
          <section className='w-full h-full flex justify-center items-center'>
            <motion.aside animate={animationPic2} className='w-full h-full flex flex-col justify-end items-start pl-20 pb-20 gap-2'>
              <h1 className='text-mainColor text-3xl tracking-widest mb-4'>Let's keep in touch!</h1>
              <p className='text-4xl tracking-tighter font-bold font-ptSans text-[#666]'>+48 880 558 079</p>
              <p className='text-4xl tracking-tighter font-bold font-ptSans text-[#666]'>jakub.czyszczon1@gmail.com</p>
            </motion.aside>
            <motion.ul animate={animationPic} className='w-full h-full flex flex-col gap-5 text-start items-start justify-center text-bgColor text-9xl font-extrabold tracking-tighter'>
              <li className="list-item cursor-pointer hover:bg-bgColor hover:text-textColor" data-value="main page">
                <a href="/" data-value="main page">main page</a>
              </li>
              <li className="list-item cursor-pointer hover:bg-bgColor hover:text-textColor" data-value="skills">
                <Link to='skills' smooth='true' duration={400} onClick={handleClick} data-value="skills">skills</Link>
              </li>
              <li className="list-item cursor-pointer hover:bg-bgColor hover:text-textColor" data-value="projects">
                <Link to='projects' smooth='true' duration={400} onClick={handleClick} data-value="projects">projects</Link>
              </li>
              <li className="list-item cursor-pointer hover:bg-bgColor hover:text-textColor" data-value="experience">
                <Link to='experience' smooth='true' duration={400} onClick={handleClick} data-value="experience">experience</Link>
              </li>
              <li className="list-item cursor-pointer hover:bg-bgColor hover:text-textColor" data-value="contact">
                <Link to='contact' smooth='true' duration={400} onClick={handleClick} data-value="contact">contact</Link>
              </li>
            </motion.ul>
          </section>
        </motion.nav>
    </header>
  );
};
  
export default Navbar;