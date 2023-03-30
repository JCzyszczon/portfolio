import React, { useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from "react-scroll";

const Contact = () => {
  const {ref, inView} = useInView({
    threshold: 0.5,
  });

  const animationPic = useAnimation();
  const animationPic2 = useAnimation();
  const animationOpacity = useAnimation();

  useEffect(() => {
    if(inView) {
      animationPic.start({
        x: 0,
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
      animationOpacity.start({
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.5,
        }
      });
    } if(!inView) {
      animationPic.start({
        x: '+100vw',
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
      animationPic2.start({
        x: '-100vw',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.1,
        }
      });
      animationOpacity.start({
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    }
  }, [inView]);

  return (
    <section ref={ref} id='contact' className='relative'>
        <Parallax speed={-10} className='relative w-full h-[100vh] flex flex-col justify-center items-center z-[3]'>
          <motion.h2 animate={animationOpacity} className="text-9xl font-extrabold tracking-tighter text-[#fff] z-[3] w-[65%] text-center">Let's make great work together</motion.h2>
        </Parallax>
        <Parallax speed={50} className='absolute bottom-20 left-32 w-[340px] h-[340px] border-4 border-mainColor rounded-full scaleUpAnimation'>
        </Parallax>
        <Parallax speed={20} className='w-[460px] h-[460px] absolute top-44 right-12 border-4 border-mainColor rounded-full moveUpAnimation'>
        </Parallax>
    </section>
  );
};
  
export default Contact;