import useModal from "@/modalState";
import Link from "next/link";
import React, { useState } from "react";

const Hamburger = () => {
  const [clicked, setClicked] = useState(false);
  const openModal = useModal((state) => state.openModal);
  return (
    <div className={clicked ? "mb-40" : ""}>
      <div
        onClick={() => setClicked(!clicked)}
        className=" w-10 h-10 relative cursor-pointer hover:bg-gray-200 rounded-md"
      >
        <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2 ">
          <span
            className={
              clicked
                ? "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out rotate-45  "
                : "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"
            }
          ></span>
          <span
            className={
              clicked
                ? "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out opacity-0  "
                : "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out "
            }
          ></span>
          <span
            className={
              clicked
                ? "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -rotate-45  "
                : "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out translate-y-1.5"
            }
          ></span>
        </div>
      </div>
      <div
        className={
          clicked
            ? "absolute flex flex-col right-0 text-right space-y-2 mt-4 bg-slate-100 w-full p-4 transition-all duration-300"
            : "absolute flex flex-col -top-96  transiton-all duration-500"
        }
      >
        <Link href={"/blogs"}>BLOG</Link>
        <Link href={"/about"}>ABOUT</Link>
        <Link href={"/resources"}>RESOURCES</Link>
        <h1 className="cursor-pointer" onClick={openModal}>
          AMA
        </h1>
      </div>
    </div>
  );
};

export default Hamburger;
