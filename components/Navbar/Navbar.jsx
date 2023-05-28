import Link from "next/link";
import React from "react";
import Hamburger from "../items/HambergerMenu";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  navLinkChildrenVariants,
  navLinkVariants,
  navVariants,
} from "../../utils/motion";
import useModal from "@/modalState";

const Navbar = () => {
  const openModal = useModal((state) => state.openModal);
  const pathname = usePathname();

  return (
    <motion.div
      variants={`${pathname !== "/blogs" && navVariants}`}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between relative"
    >
      {/* Name and Logo */}
      <motion.div
        variants={`${pathname !== "/blogs" && navLinkVariants}`}
        className=""
      >
        <Link href={"/"} className="flex items-center space-x-2">
          {/* Image  */}
          {/* {homeData[0].logo && (
          <Image
          className="w-14 aspect-square"
          src={urlForImage(homeData[0].logo).url()}
          alt="logo"
          width={200}
          height={200}
          />
        )} */}
          <div className="w-8 h-8 bg-black rounded-full"></div>
          {/* Name */}

          {/* <h1 className="text-xl">{homeData[0].logoTitle.toUpperCase()}</h1> */}
          <h1>SPIKELAB</h1>
        </Link>
      </motion.div>

      {/* Nav Items */}
      <motion.div
        variants={`${pathname !== "/blogs" && navLinkVariants}`}
        className=" flex items-center space-x-20 tracking-widest max-md:hidden"
      >
        <motion.div
          variants={`${pathname !== "/blogs" && navLinkChildrenVariants}`}
          className=""
        >
          <Link
            className={
              pathname === "/blogs"
                ? "text-primary font-bold relative"
                : "hover:text-primary"
            }
            href={"/blogs"}
          >
            BLOGS
            {pathname === "/blogs" && (
              <motion.div
                layoutId="underline"
                className="h-0.5 w-full absolute rounded-full bg-primary"
              ></motion.div>
            )}
          </Link>
        </motion.div>
        <motion.div
          variants={`${pathname !== "/blogs" && navLinkChildrenVariants}`}
          className=""
        >
          <Link
            className={
              pathname === "/about"
                ? "text-primary font-bold relative"
                : "hover:text-primary"
            }
            href={"/about"}
          >
            ABOUT
            {pathname === "/about" && (
              <motion.div
                layoutId="underline"
                className="h-0.5 w-full absolute rounded-full bg-primary"
              ></motion.div>
            )}
          </Link>
        </motion.div>
        <motion.div
          variants={`${pathname !== "/blogs" && navLinkChildrenVariants}`}
          className=""
        >
          <Link
            className={
              pathname === "/resources"
                ? "text-primary font-bold relative"
                : "hover:text-primary"
            }
            href={"/resources"}
          >
            RESOURCES
            {pathname === "/resources" && (
              <motion.div
                layoutId="underline"
                className="h-0.5 w-full absolute rounded-full bg-primary"
              ></motion.div>
            )}
          </Link>
        </motion.div>
        <motion.div
          variants={`${pathname !== "/blogs" && navLinkChildrenVariants}`}
          className=""
        >
          <h1
            onClick={openModal}
            className={"hover:text-primary cursor-pointer"}
          >
            AMA
          </h1>
        </motion.div>
      </motion.div>

      {/* for mobile */}
      <div className="md:hidden">
        <Hamburger></Hamburger>
      </div>
    </motion.div>
  );
};

export default Navbar;
