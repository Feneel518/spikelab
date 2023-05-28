// Next imports
import Link from "next/link";
import React from "react";
import Image from "next/image";

// Image Import
import LinkedIn from "../../public/linkedin.png";

// Zustand Import
import useModal from "@/modalState";

// Framer motion imports
import { motion } from "framer-motion";
import {
  navLinkChildrenVariants,
  navLinkVariants,
  slideIn,
} from "../../utils/motion";

const HeroSection = ({ title }) => {
  // state for opening and closing modal
  const openModal = useModal((state) => state.openModal);

  // Change it to update Hero texts
  const heroData = {
    title:
      "Hello, I'm Spike, ex-Google, 2x founder, now Product Director in the AI Space.",
    para: "I have passion in craftmanship and these are my reflections on life, art, PM and AI. I am happy to help with",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 1 }}
      className="mt-4 rounded-md cursor-default   border-l-4 border-primary py-4 px-8 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-in-out"
    >
      {/* Hero Items */}
      <motion.div
        variants={navLinkVariants}
        className="flex flex-col gap-4 justify-between max-lg:space-x-8"
      >
        <motion.h1
          variants={navLinkChildrenVariants}
          className="text-5xl text-primary max-lg:text-3xl"
        >
          {/* Hero title */}
          {heroData.title ? heroData.title : "  "}
        </motion.h1>
        <motion.p
          variants={navLinkChildrenVariants}
          className=" text-sm  max-lg:text-xs"
        >
          {/* Hero Para */}
          {heroData.para ? heroData.para : ""}
        </motion.p>
      </motion.div>
      <div className="h-1 w-full mt-2 bg-gray-50"></div>

      {/* CTA */}
      <motion.div
        variants={navLinkVariants}
        className="mt-4 text-xl flex items-center max-md:justify-center gap-3 max-lg:text-sm"
      >
        <h1 className="max-md:hidden">Connect on:</h1>
        <Link href={"/"} className="hover:text-primary ml-2">
          <Image
            className="w-10 aspect-square hover:scale-125 transition-all duration-200 ease-in-out"
            src={LinkedIn}
            alt="linkedin-logo"
            width={200}
            height={200}
          ></Image>
        </Link>
        <div className="divider divider-horizontal">OR</div>
        <h1
          onClick={openModal}
          className="hover:underline hover:text-white hover:border transition-all duration-200 ease-in-out cursor-pointer p-2 hover:bg-primary underline-offset-1 rounded-lg"
        >
          Ask Me Anything 📨
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
