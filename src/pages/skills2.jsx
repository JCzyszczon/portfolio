import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Link } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { FaArrowDown } from 'react-icons/fa';
import { Parallax } from 'react-scroll-parallax';
import Modal from 'react-modal';
import { items } from './projectsData';

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#333333aa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    borderRadius: "20px",
    outline: "none",
    padding: '0px',
    border: 'none',
    backgroundColor: '#000000cc',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
    width: '80%',
    height: '60%',
    blur: '10px',
  }
}

Modal.setAppElement('#root'); // ustawiamy element aplikacji, na którym ma być umieszczany modal

const Skills = () => {
  const {ref, inView} = useInView({
    threshold: 0.5,
  });
  const animationPic = useAnimation();
  const animationPic2 = useAnimation();
  const animationOpacity = useAnimation();

  const [clickedSlide, setClickedSlide] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSlide = (item, index) => {
    setCurrentIndex(index);
    setClickedSlide(item);
    setIsModalOpen(true);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "overlay";
    }
    return () => {
      document.body.style.overflow = "overlay";
    };
  }, [isModalOpen]);

  return (
      <section ref={ref} id='skills2'>
        <Parallax className='w-full h-[100vh] flex flex-col gap-10 justify-center items-center relative' translateY={['-100px', '0px']}>
          <Swiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            spaceBetween={24}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
            className='swiperSkills'
          >
              {items.map((item, index) => {
                  return (
                      <SwiperSlide key={item.title} className='swiper-slideSkills'>
                          {inView && (
                              <motion.div onClick={() => getSlide(item, index)} initial={{opacity: 0, translateX: -10 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} exit={{opacity: 0, transition: {duration: 3, delay: index * 0.1}, }} className='w-full h-full flex justify-center items-center flex-col gap-10'>
                                  <img src={require(`../images/${item.path}`)} alt={item.title} className='w-[110px] h-auto'/>
                                  <h3 className='text-textColor text-2xl font-bold font-lato'>{item.title}</h3>
                              </motion.div>
                          )}
                      </SwiperSlide>
                  )
              })}
          </Swiper>
          {clickedSlide && 
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel={clickedSlide.title}
              style={customStyles}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className='w-full h-full glass flex justify-between rounded-lg'>
                <motion.div variants={itemVariants} className='w-[40%] h-[100%] flex justify-center items-center overflow-hidden'>
                    <img src={require(`../images/${clickedSlide.path}`)} alt="Bigger Picture" className='w-[250px] h-[250px] object-contain'/>
                </motion.div>
                <motion.div variants={itemVariants} className='w-full h-[100%] flex flex-col justify-center items-center gap-10 px-20 border-l border-[#333]'>
                    <h1 className='text-6xl text-[#fff] font-bold'>{clickedSlide.title}</h1>
                    <p className='text-lg text-[#aaa]'>{clickedSlide.description}</p>
                    <div className='w-full flex justify-center items-center'>
                        {!clickedSlide.level ? (
                            <></>
                        ) : (
                            <p className='text-[#fff] text-2xl font-bold'>Status: <span className={clickedSlide.level === "Beginner" ? ( 'text-[#5AB83D] font-extrabold' ) : clickedSlide.level === "Junior" ? ( 'text-[#FFC71F] font-extrabold' ) : ( 'text-[#e00400] font-extrabold' ) }>{clickedSlide.level}</span></p>
                        )}
                    </div>
                </motion.div>
              </motion.div>
            </Modal>
          }
          <Parallax className='cursor-pointer group w-[340px] h-[340px] absolute bottom-0 left-0' speed={30} translateX={['-80px', '-80px']}>
            <Link to='projects' smooth='true' duration={300} delay={100}><button className='cursor-pointer border-4 border-mainColor w-[100%] h-[100%] rounded-full flex justify-center items-center group-hover:bg-textColor group-hover:border-textColor duration-300 group-hover:scale-50'><FaArrowDown className='text-[#fff] text-4xl animate-bounce group-hover:text-[#000] group-hover:text-5xl' /></button></Link>
          </Parallax>
        </Parallax>
      </section>
  );
};
  
export default Skills;