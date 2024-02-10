import React, { useState, useEffect, useRef } from "react";
import medStaff from "../../assets/medStaff.svg";

import { CSSTransition } from "react-transition-group";
import "../../App.css";


const Hero = () => {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  const nodeRef = useRef(null);
  const textNodeRef = useRef(null);

  useEffect(() => {
    setShowImage(true);
    setShowText(true);
  }, []);

  return (
    <>
      <section className="100vh">
        <div className="w-full flex justify-center ">
          <div className="w-full container ">
            <div className="relative">
              <div className="relative z-20 flex flex-wrap justify-between items-center -m-22">
              <CSSTransition
                  in={showText}
                  timeout={1000} 
                  classNames="fade"
                  unmountOnExit
                  nodeRef={textNodeRef}
                >
                <div ref={textNodeRef} className="flex flex-col h-[80vh] justify-center w-full lg:w-1/2 p-24 lg:pr-0 lg:pl-28 lg:py-28">
                  <h2 className="mb-7 text-4xl md:text-5xl xl:text-10xl font-bold">
                    ADVANCE YOUR NURSING CAREER
                    {/* WITH INSTASTAFF */}
                  </h2>
                  <p className="mb-10 text-xl text-gray-900 font-medium pr-4">
                    Elevate your nursing journey with InstaStaff. Seamlessly
                    navigate job opportunities, manage your schedule
                    effortlessly, and connect with care institutions seeking
                    your expertise. Explore how InstaStaff can enhance your
                    professional path and open doors to fulfilling
                    opportunities.
                  </p>
                  <div className="mb-3 md:inline-block">
                    <button
                      className="py-4 px-4 text-[1.1rem] text-white font-normal rounded-xl bg-[#6547A5] hover:opacity-90 transition ease-in-out duration-200"
                      type="button"
                    >
                      <a href="/jobs">Join InstaStaff</a>
                    </button>
                  </div>
                  {/* <p className="text-lg text-gray-800 font-small pl-3">
                    No credit Card required
                  </p> */}
                 
                </div>
                </CSSTransition>
                <div className="w-full lg:w-1/2">
                <CSSTransition
                    in={showImage}
                    timeout={1000}
                    classNames="slide"
                    unmountOnExit
                    nodeRef={nodeRef}
                  >
                  <img
                  ref={nodeRef}
                    className="w-[1000px] h-[auto]"
                    src={medStaff}
                    alt=""
                  ></img>
                   </CSSTransition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
