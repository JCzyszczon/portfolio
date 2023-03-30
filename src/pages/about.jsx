import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from "react-scroll";
import ProfilePic from '../images/profilePic.jpeg';
import { FaGraduationCap, FaUserCheck, FaProjectDiagram } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const About = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const buttonData = [ 
    { id: 1, text: 'I am a third-year student of Industrial Computer Science at the AGH University of Science and Technology in Krakow. I am looking for my first professional experience in the IT industry. I would like to develop as a Front-end Developer and eventually become a Full-stack Developer, which is why I am constantly expanding my skills by educating myself not only on web application design field, but also server communication and databases.', },
    { id: 2, text: '-', },
    { id: 3, text: 'I have already completed the first projects of websites for people who use them in their business activities as well as for classes that were supposed to fulfill specific functions.', }
  ];

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const {ref, inView} = useInView({
    threshold: 0.5,
  });

  const animationPic = useAnimation();
  const animationPic2 = useAnimation();
  const animationOpacity = useAnimation();

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
    },
  };
  
  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: -50,
    },
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
    <section ref={ref} id='experience' className='relative w-full h-[100vh] flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden'>
        <Parallax speed={10} className='w-full h-auto flex justify-center items-center'>
            <motion.h3 animate={animationOpacity} className='text-sm font-lato tracking-[0.3em] font-bold text-textColor uppercase mt-52'>About me</motion.h3>
        </Parallax>
        <Parallax speed={-10} className='w-full h-full flex justify-center items-center relative'>
            <motion.section animate={animationPic} className='w-[50%] h-full flex justify-center items-center relative'>
                <img src={ProfilePic} alt="Profile" className='w-[450px] h-[450px] object-contain rounded-lg rotate-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]'/>
                <div className='w-[450px] h-[450px] -rotate-3 bg-[#fff] rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[4]'></div>
                <div className='w-[450px] h-[450px] bg-mainColor rounded-lg rotate-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]'></div>
            </motion.section>
            <section className='w-[50%] h-full flex flex-col gap-10 justify-center items-center px-20'>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className='w-full h-auto flex justify-start items-center gap-8'>
                    {buttonData.map((data, index) => (
                        <motion.div key={index} onClick={() => handleButtonClick(index)} className={selectedButton === index ? 'active w-[120px] h-[120px] flex justify-center items-center aboutGlass' : 'w-[120px] h-[120px] flex justify-center items-center aboutGlass'}>
                            {inView && (
                                <motion.div initial={{opacity: 0, translateX: -10 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.2 }} className='w-full h-full flex justify-center items-center'>
                                    {index === 0 ? (
                                        <FaGraduationCap className='w-[40px] h-[40px] text-mainColor'/>
                                    ) : index === 1 ? (
                                        <FaUserCheck className='w-[40px] h-[40px] text-mainColor'/>
                                    ) : (
                                        <FaProjectDiagram className='w-[40px] h-[40px] text-mainColor'/>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
                <div className='w-full h-auto flex justify-center items-center'>
                    <motion.p animate={animationPic2} className='text-xl text-[#fff] font-light'>{buttonData[selectedButton].text}</motion.p>
                </div>
                <div className='w-full h-auto flex justify-end items-center px-20'>
                    <Link to='contact' smooth='true' duration={400}><motion.button animate={animationOpacity} className='text-[#fff] font-semibold font-lato text-xl border px-20 py-4 border-mainColor rounded-full hover:bg-textColor hover:text-[#000] hover:border-[#fff] transition-all duration-500 flex justify-evenly items-center gap-2 group'><p>Get in touch</p><IoMdMail className='text-3xl rotate-3 group-hover:rotate-6'/></motion.button></Link>
                </div>
            </section>
        </Parallax>
    </section>
  );
};
  
export default About;