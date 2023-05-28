// Next imports
import Link from "next/link";
import React, { useEffect, useState } from "react";

// router import fot navigation
import { useRouter } from "next/navigation";

// framer motion imports
import { motion } from "framer-motion";

// Ai modal
import AiModal from "../Modal/AiModal";
import useModal from "@/modalState";

const Blogs = ({ posts }) => {
  // state for opening and closing modal
  const [hover, setHover] = useState(-1);

  // Configuring router
  const router = useRouter();

  //modal configuration
  const AiModals = useModal((state) => state.AiModals);
  const closeAiModal = useModal((state) => state.closeAiModal);
  const openAiModal = useModal((state) => state.openAiModal);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = AiModals ? "hidden" : "auto";

    const close = (e) => {
      if (e.keyCode === 27) {
        closeAiModal();
      }
    };

    document.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [AiModals]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 1,
        staggerChildren: 0.5,
        delayChildren: 0.5,
      }}
      viewport={{ once: true }}
      className=""
    >
      {/* posts mapping */}
      {posts.map((post, index) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          // whileHover={{ scale: 1.1 }}
          transition={{ delay: 0.5, duration: 0.1 }}
          key={post.id}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(-1)}
          className=" my-10 border hover:border-primary  hover:shadow-lg p-6  cursor-default transition-all duration-500 ease-in-out rounded-md hover:shadow-[#4B6BFB] hover:bg-slate-100 pt-4"
        >
          {/* Blog Heading */}
          <motion.div className="">
            <Link
              href={`/blogs/${post.id}`}
              className="text-3xl max-lg:text-xl  font-semibold pt-4 hover:text-primary cursor-pointer"
            >
              {post.properties.Blog_Title.title[0].plain_text.toUpperCase()}
            </Link>
          </motion.div>

          {/* Blog Created Date */}
          <motion.div className="flex items-center gap-2 text-xs">
            <p className=" ">
              {" "}
              {new Date(post.created_time).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "2-digit",
                weekday: "short",
              })}{" "}
            </p>

            {/* Blog Readinng Time if provided then only*/}
            {post.properties.Reading_Time.rich_text[0] && (
              <div className="flex items-center gap-2">
                <p>/</p>

                <p>
                  {post.properties.Reading_Time.rich_text[0].plain_text} reading
                </p>
              </div>
            )}
          </motion.div>
          <div className="pt-4 flex  items-center justify-between gap-4">
            {" "}
            {/* Blog Description */}
            <p
              className={`${
                hover === index && "w-1/2"
              } w-full max-md:w-full line-clamp-3 max-lg:text-sm`}
            >
              {post.properties.Description.rich_text[0].plain_text}
            </p>
            {hover === index && (
              <div className="max-md:hidden text-end space-x-8 pt-2 mr-2 flex max-lg:space-x-2 transition-all duration-300 ">
                {/* buttons */}

                <button
                  onClick={() => router.push(`/blogs/${post.id}`)}
                  className={`btn btn-primary max-lg:btn-sm  ${
                    hover === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {" "}
                  Read
                </button>
                <button
                  onClick={openAiModal}
                  className={`btn btn-primary max-lg:btn-sm  ${
                    hover === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  AI Summary
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
      <AiModal
        isVisible={AiModals}
        description=""
        onClose={closeAiModal}
      ></AiModal>
    </motion.div>
  );
};

export default Blogs;
