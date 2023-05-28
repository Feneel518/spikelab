import React from "react";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import LinkedIn from "../../public/linkedin.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useModal from "@/modalState";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const openModal = useModal((state) => state.openModal);

  return (
    <div className="max-w-screen-md mx-auto max-lg:mx-10 pt-4 ">
      <nav className=" ">
        <Navbar></Navbar>
        <div className="divider shadow-2xl"></div>
      </nav>
      <div className="">{children}</div>

      <footer className=" cursor-default max-lg:mt-8 mt-14 flex items-start justify-center">
        <div className="mt-4 text-xl flex items-center max-md:justify-center gap-3 max-lg:text-sm">
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
        </div>
      </footer>
      <p className="text-xs text-center mt-14">
        Handmade with brains & ❤️ by Feneel
      </p>
    </div>
  );
};

export default Layout;
