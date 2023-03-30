import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { projects } from './projectsData';
import { FaArrowLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

const Project = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [images, setImages] = useState([]);

    let params = useParams();

    const projectData = projects.filter(data => data.title === params.name);

    console.log(params.name)

    useEffect(() => {
        const blob = document.getElementById("blob");
    
        window.onpointermove = event => { 
          const { clientX, clientY } = event;
    
          blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
          }, { duration: 10000, fill: "forwards" });
        };
    }, []);

    useEffect(() => {
        const importAll = (r) => {
          return r.keys().map(r);
        }

        let images;

        if (params.name === "Mauve") {
            images = importAll(require.context(`../images/Mauve`, false, /\.(png|jpe?g|svg)$/));
        } else if (params.name === "AN-BUD") {
            images = importAll(require.context(`../images/AN-BUD`, false, /\.(png|jpe?g|svg)$/));
        } else if (params.name === "ZTP Kraków") {
            images = importAll(require.context(`../images/Ztp`, false, /\.(png|jpe?g|svg)$/));
        } else if (params.name === "Hangman Game") {
            images = importAll(require.context(`../images/Hangman`, false, /\.(png|jpe?g|svg)$/));
        }
      
        setImages(images);
      
      }, []);

    return (
        <>
            <div id="blob" data-tip="Tooltip text" data-for="tooltip-id"></div>
            <div id="blur"></div>
            <article className='w-full h-[100vh] flex justify-center items-center overflow-x-hidden z-[5] relative'>
                <a href="/portfolio/"><FaArrowLeft className='text-5xl text-textColor absolute left-14 top-14 z-[5] hover:opacity-70 duration-300'/></a>
                <section className='w-1/2 h-full flex flex-col justify-center items-center px-10 py-10'>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Thumbs]}
                        className="swiper3"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide className='swiper-slide3'>
                                <img src={image} alt={index}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="swiper3 mt-5 rounded-xl"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide className='swiper-slide3'>
                                <img src={image} alt={index}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                <section className='w-1/2 h-full flex flex-col gap-10 justify-center items-start py-20 px-10'>
                    <h2 className='text-7xl font-extrabold tracking-tighter text-textColor'>{projectData[0].title}</h2>
                    <p className='text-xl w-full h-[40%] font-lato text-textColor overflow-y-scroll py-5 px-5'>{projectData[0].description}</p>
                    <div className='w-full h-auto flex justify-center items-center gap-5'>
                        <button className='px-10 py-5 border border-textColor text-[#fff] rounded-xl font-semibold hover:bg-textColor hover:text-[#000] transition-all duration-500'>Source code</button>
                        <button className='px-10 py-5 border border-mainColor text-mainColor rounded-xl font-semibold hover:bg-mainColor hover:text-[#fff] transition-all duration-500'>Live Version</button>
                    </div>
                </section>
            </article>
        </>
    );
};
  
export default Project;