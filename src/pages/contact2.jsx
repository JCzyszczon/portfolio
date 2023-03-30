import React, { useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Link } from "react-scroll";
import ContactLogo from '../images/contact-logo.png';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const Contact2 = () => {
  const {ref, inView} = useInView({
    threshold: 0.5,
  });

  const animationPic = useAnimation();
  const animationPic2 = useAnimation();
  const animationPic3 = useAnimation();

  useEffect(() => {
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
      animationPic3.start({
        y: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    } if(!inView) {
      animationPic.start({
        x: '-100px',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
      animationPic2.start({
        x: '+100px',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
      animationPic3.start({
        y: '+100px',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className='relative overflow-hidden'>
        <Parallax speed={20} className='w-full h-auto py-32 bg-mainColor flex justify-around items-center rounded-t-[30%]'>
            <motion.div animate={animationPic} className='w-1/3 h-full flex flex-col justify-center items-center'>
                <h4 className='text-textColor font-lato tracking-[0.3em] font-bold mb-4 uppercase'>See what I am up to</h4>
                <div className='w-full h-auto flex justify-center items-center gap-5'>
                  <a href="https://github.com/JCzyszczon" target={'_blank'} rel='noreferrer'><FaGithub className='text-3xl text-textColor'/></a>
                  <a href="https://www.instagram.com/czycho_/" target={'_blank'} rel='noreferrer'><FaInstagram className='text-3xl text-textColor'/></a>
                  <a href="https://github.com/JCzyszczon" target={'_blank'} rel='noreferrer'><FaLinkedinIn className='text-3xl text-textColor'/></a>
                </div>
            </motion.div>
            <motion.div animate={animationPic3} className='w-1/3 h-full flex justify-center items-center'>
                <a href="/"><img src={ContactLogo} alt="ContactLogo" className='w-[250px] h-auto animate-bounce'/></a>
            </motion.div>
            <motion.div animate={animationPic2} className='w-1/3 h-full flex flex-col justify-center items-start pl-20 pb-20 gap-5'>
              <h4 className='text-textColor font-lato tracking-[0.3em] font-bold mb-4 uppercase'>Get in touch</h4>
              <a href='tel:+48880558079' className='text-4xl tracking-tighter font-semibold text-[#000] hover:underline transition-all duration-500'>+48 880 558 079</a>
              <a href='mailto:jakub.czyszczon1@gmail.com' className='text-4xl tracking-tighter font-semibold text-[#000] hover:underline transition-all duration-500'>jakub.czyszczon1@gmail.com</a>
            </motion.div>
        </Parallax>
    </section>
  );
};
  
export default Contact2;