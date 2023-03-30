import React, { useEffect } from 'react';
import Navbar from './navbar';
import MainConponent from './mainComponent';
import Projects from './projects';
import Skills from './skills';
import Projects2 from './projects2';
import Skills2 from './skills2';
import About from './about';
import Contact from './contact';
import Contact2 from './contact2';

const Home = () => {

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

  return (
    <>
      <div id="blob" data-tip="Tooltip text" data-for="tooltip-id"></div>
      <div id="blur"></div>
      <Navbar/>
      <MainConponent/>
      <Skills/>
      <Skills2/>
      <Projects/>
      <Projects2/>
      <About/>
      <Contact/>
      <Contact2/>
    </>
  );
};
  
export default Home;