import React, { useEffect, useState, useRef } from 'react';
import Typical from 'react-typical';
import { FaArrowRight } from 'react-icons/fa';
import mainImg from '../images/Software Developer.png';
import { Link } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const MainConponent = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });
  };

  const {ref, inView} = useInView({
    threshold: 0.5,
  });
  const animationPic = useAnimation();
  const animationPic2 = useAnimation();
  const animationOpacity = useAnimation();

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => document.body.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { x: elementX, y: elementY } = elementRef.current
    ? elementRef.current.getBoundingClientRect()
    : { x: 0, y: 0 };
  const deltaX = mousePosition.x - elementX;
  const deltaY = mousePosition.y - elementY;
  const rotationX = deltaY / 20;
  const rotationY = deltaX / -20;

  const styles = {
    transform: `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${-rotationY}deg)`,
  };

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
      animationOpacity.start({
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.5,
        }
      });
    } if(!inView) {
      animationPic.start({
        x: '+100px',
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
      <section ref={ref} className='w-full h-auto flex justify-start items-center overflow-x-hidden'>
          <motion.div animate={animationPic2} className='w-1/2 h-[100vh] flex justify-center items-start flex-col pl-40 z-[5]'>
            <Typical
              steps={['Hi!', 1000]}
              loop={Infinity}
              className="text-9xl tracking-wide font-bold text-[#fff] z-[3] font-ptSans"
            />
            <h2 className='z-[3] text-[#fff] text-6xl font-lato mt-3'>My name is <span className='text-mainColor p-2'>Jakub Czyszczoń</span></h2>
            <motion.p animate={animationOpacity} className='z-[3] text-[#aaa] text-3xl font-lato mt-5'>
Are you looking for a front-end developer who, apart from coding, is also interested in the latest UI trends?</motion.p>
            <Link to='skills' smooth='true' duration={400} className='z-[3]'><button className='px-10 py-5 mt-12 ml-6 flex group justify-center items-center gap-5 bg-mainColor hover:bg-hoverColor font-lato tracking-wide text-2xl text-[#ece5df] hover:scale-105 hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg'>Learn more<FaArrowRight className='group-hover:rotate-90 duration-300'></FaArrowRight></button></Link>
          </motion.div>
          <motion.div animate={animationPic} className='w-1/2 h-auto flex justify-center items-end z-[5]'>
            <img
              src={mainImg}
              alt="Main Logo"
              ref={elementRef}
              style={styles}
              className='w-[650px] h-auto z-[3] duration-300'
            />
          </motion.div>
      </section>
  );
};
  
export default MainConponent;