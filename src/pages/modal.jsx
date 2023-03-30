import { useEffect } from "react";
import { motion } from "framer-motion";

const Modal = ({ clickedSlide, setClickedSlide, isOpen, onClose }) => {

    const handleClick = (e) => {
        if(e.target.classList.contains("dismiss")) {
            setClickedSlide(null);
        }
    }

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "overlay";
        } else {
          document.body.style.overflow = "overlay";
        }
        return () => {
          document.body.style.overflow = "overlay";
        };
    }, [isOpen]);

    const containerVariants = {
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.5,
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

    return(
        <div className="fixed w-[100%] h-[100%] top-0 left-0 right-0 bg-[#333333aa] flex justify-center items-center dismiss select-none scroll z-[100]" onClick={handleClick}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className='w-[80%] h-[60%] glass flex justify-between rounded-lg'>
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
        </div>
    );
};

export default Modal;