import React, { useEffect, useState } from "react";
import testimonails from "../testimonails";
import CarouselItem from "./CarouselItem";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TestiModal from "./Modal/TestiModal";
import useModal from "@/modalState";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const CarouselNew = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);

  const testiModal = useModal((state) => state.testiModal);
  const openTestiModal = useModal((state) => state.openTestiModal);
  const closeTestiModal = useModal((state) => state.closeTestiModal);

  // ////////////////////////////////////////////////////////
  const [touchTestiPosition, setTouchTestiPosition] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleTestiTouchStart = (e) => {
    const touchTestiDown = e.touches[0].clientX;
    setTouchTestiPosition(touchTestiDown);
    // console.log("helo");
  };
  // console.log(touchPosition);

  const handleTestiTouchMove = (e) => {
    const touchTestiDown = touchTestiPosition;

    if (touchTestiDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchTestiDown - currentTouch;

    if (diff > 5) {
      handleTestiPrevious();
    }

    if (diff < -5) {
      handleTestiNext();
    }

    setTouchTestiPosition(null);
  };
  // ////////////////////////////////////////////////////////
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
    console.log("helo");
  };
  console.log(touchPosition);

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handlePrevious();
    }

    if (diff < -5) {
      handleNext();
    }

    setTouchPosition(null);
  };

  // //////////////////////////////////////////////////////////////////
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = testiModal ? "hidden" : "auto";

    const close = (e) => {
      if (e.keyCode === 27) {
        closeTestiModal();
      }
    };
    document.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [testiModal]);

  const handleNext = () => {
    setActiveIndex((prev) => {
      return prev + 1 < testimonails.length ? prev + 1 : prev;
    });
  };
  const handlePrevious = () => {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  };
  const handleTestiNext = () => {
    setActiveTestiIndex((prev) => {
      return prev + 1 < testimonails.length ? prev + 1 : prev;
    });
  };
  const handleTestiPrevious = () => {
    setActiveTestiIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 1 }}
      className="flex items-center justify-center"
    >
      <div className="carousel-container relative w-[700px] h-24 max-lg:w-[500px] text-black flex items-center justify-center cursor-pointer rounded-lg  transition-all duration-300 ease-in-out">
        {activeIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="carousel-btn-switch-card-left carousel-btn-switch-card"
          >
            <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
          </button>
        )}
        {testimonails.map((testi, index) => (
          <CarouselItem key={testi.id} index={index} activeIndex={activeIndex}>
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onClick={openTestiModal}
              key={testi.id}
              className="flex flex-col items-center justify-center  gap-4 px-4 py-4 relative "
            >
              <div className="flex items-center justify-center gap-4  px-1">
                <div className="max-md:hidden w-16 max-lg:w-8 aspect-square bg-black rounded-full"></div>
                <div className="flex flex-col items-center justify-center gap-2 text-xs ">
                  <p className=" text-center line-clamp-1 w-[600px] max-lg:w-[300px] text-lg max-md:text-sm">
                    "{testi.testimonial}"
                  </p>{" "}
                  <div className="w-4 h-0.5 bg-black"></div>
                  {testi.name}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}

        {activeIndex < testimonails.length - 1 && (
          <button
            onClick={handleNext}
            className="carousel-btn-switch-card carousel-btn-switch-card-right"
          >
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </button>
        )}
      </div>

      {/* /////////////////////////////////////// */}
      <TestiModal isVisible={testiModal} onClose={closeTestiModal}>
        <div className="carousel-container relative h-[400px] w-[720px] max-lg:h-[700px] max-lg:w-[350px] text-black flex items-center m-4 justify-center rounded-lg  transition-all duration-300 ease-in-out">
          {activeTestiIndex > 0 && (
            <button
              onClick={handleTestiPrevious}
              className="carousel-btn-switch-card-left carousel-btn-switch-card"
            >
              <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
            </button>
          )}
          {testimonails.map((testi, index) => (
            <CarouselItem
              key={testi.id}
              index={index}
              activeIndex={activeTestiIndex}
            >
              <div
                onTouchStart={handleTestiTouchStart}
                onTouchMove={handleTestiTouchMove}
                key={testi.id}
                className="flex flex-col h-full items-center justify-center gap-4 px-4 py-4 relative max-lg:px-4 max-lg:py-4 "
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="   px-10 max-lg:px-4">"{testi.testimonial}"</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    {" "}
                    <div className="w-4 h-0.5 bg-black"></div>
                    {testi.name}
                  </div>
                  <div className="w-12 aspect-square bg-black rounded-full"></div>
                </div>
              </div>
            </CarouselItem>
          ))}

          {activeTestiIndex < testimonails.length - 1 && (
            <button
              onClick={handleTestiNext}
              className="carousel-btn-switch-card carousel-btn-switch-card-right"
            >
              <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
            </button>
          )}
        </div>
      </TestiModal>
    </motion.div>
    // <div className="carousel-container  rounded-3xl flex items-center justify-center cursor-pointer  transition-all duration-300 ease-in-out ">

    //   )}
    //   {testimonails.map((testi, index) => (
    // <CarouselItem key={index} index={index} activeIndex={activeIndex}>
    // <div
    //   onClick={openTestiModal}
    //   key={testi.id}
    //   className="flex flex-col items-center justify-center gap-4 px-4 py-4 relative "
    // >
    //   <div className="flex items-center justify-center gap-4 ">
    //     <div className="w-40 aspect-square bg-black rounded-full"></div>
    //     <div className="flex flex-col items-center justify-center gap-2 text-xs">
    //       <p className="  line-clamp-1  text-lg">"{testi.testimonial}"</p>{" "}
    //       <div className="w-4 h-0.5 bg-black"></div>
    //       {testi.name}
    //     </div>
    //   </div>
    // </div>
    // </CarouselItem>
    //   ))}
    // {activeIndex < testimonails.length - 1 && (
    //   <button
    //     onClick={handleNext}
    //     className="carousel-btn-switch-card carousel-btn-switch-card-right"
    //   >
    //     <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
    //   </button>
    // )}

    //   <TestiModal isVisible={testiModal} onClose={closeTestiModal}>
    //     <div className="">
    //       <div className="">hello</div>
    //     </div>
    //   </TestiModal>
    // </div>
  );
};

export default CarouselNew;
