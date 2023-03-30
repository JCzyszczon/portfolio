import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper";
import {Link} from 'react-router-dom';
import { projects } from './projectsData';

const Projects2 = () => {
  const {ref, inView} = useInView({
    threshold: 0.7,
  });

  const animationPic = useAnimation();

  useEffect(() => {
    if(inView) {
      animationPic.start({
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    } if(!inView) {
      animationPic.start({
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.5,
        }
      });
    }
  }, [inView]);

  return (
    <section ref={ref} id='projects2' className='overflow-x-hidden overflow-y-hidden relative'>
      <Parallax translateX={['500px', '-1500px']} easing="easeInQuad" className='flex justify-center items-center w-full h-[100vh]'>
          <Swiper
          slidesPerView={3}
          spaceBetween={50}
          freeMode={true}
          loop={true}
          modules={[FreeMode]}
          className="swiper2"
          >
            {projects.map((item, index) => {
                  return (
                      <SwiperSlide key={item.title} className='swiper-slide2 relative group'>
                        <Link to={`portfolio/projects/${item.title}`}>
                          <div className='w-[100%] h-[100%] overflow-hidden rounded-[20px]'>
                            <img src={require(`../images/${item.path}`)} alt={item.title} className='w-[100%] h-[100%] object-cover rounded-[20px] group-hover:scale-110 transition-all duration-500'/>
                          </div>
                          <div className='absolute left-1/2 -translate-x-1/2 w-full px-8 bottom-[-50px] translate-y-10 -skew-y-[5deg] flex-col gap-3 opacity-0 group-hover:opacity-100 group-hover:overflow-visible group-hover:hoverUpAnimation group-hover:translate-y-2 transition-all duration-700'>
                            <p className='text-4xl text-[#fff] font-light group font-lato'>{item.description}</p>
                            <h3 className='text-7xl text-[#fff] tracking-tighter font-extrabold group'>{item.title}</h3>
                            <span className='text-lg text-mainColor uppercase font-extrabold'>{item.site}</span>
                          </div>
                        </Link>
                      </SwiperSlide>
                  )
            })}
          </Swiper>
      </Parallax>
      <Parallax className='absolute left-20 bottom-20 z-[20]'>
        <motion.button animate={animationPic} className='text-[#fff] font-semibold font-lato text-2xl border px-7 py-5 border-mainColor rounded-full hover:bg-textColor hover:text-[#000] hover:border-[#fff] transition-all duration-500'>Discover more of my work</motion.button>
      </Parallax>
    </section>
  );
};
  
export default Projects2;