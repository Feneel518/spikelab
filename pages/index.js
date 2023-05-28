// Next imports
import Head from "next/head";
import Link from "next/link";
// Zustand import
import useModal from "@/modalState";

// Components imports
import HeroSection from "../components/HeroSection/HeroSection";
import Layout from "../components/Layout/Layout";
import Blogs from "../components/Blogs/Blogs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AMA from "@/components/Modal/AMA";

// libs imports
import { getHomeDatabase } from "../lib/notion";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import CarouselNew from "@/components/CarouselNew";

export default function Home({ posts }) {
  // state for opening and closing modal
  const modal = useModal((state) => state.modal);
  const closeModal = useModal((state) => state.closeModal);

  // to disable bg as well as to close on escape
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = modal ? "hidden" : "auto";

    const close = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };

    document.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [modal]);

  // Change it to update the meta
  const websiteMetaInfo = {
    title: "SPIKELAB",
    description: "A Blogging Website",
  };

  return (
    <>
      <Head>
        <title>{websiteMetaInfo.title}</title>S
        <meta name="description" content={websiteMetaInfo.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Layout */}
      <Layout>
        {/* Hero Section */}
        <main className="my-4">
          {/* heroData is send to set the heroTitle as well as heroPara */}
          <HeroSection></HeroSection>
        </main>

        {/* Testimonials */}
        <motion.h1
          variants={fadeIn("left", "tween", 1, 0.2)}
          initial="hidden"
          animate="show"
          className="text-center text-opacity-70 text-primary font-bold"
        >
          Testimonials
        </motion.h1>

        {/* Carousel */}
        {/* <CarouselComment></CarouselComment> */}
        {/* <div className="divider"></div> */}
        <CarouselNew></CarouselNew>
        <div className="divider"></div>

        {/* Blogs featured on home page */}
        <section className="">
          <Blogs posts={posts}></Blogs>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center"
          >
            {/* button that leads to blogs page */}
            <Link href={"/blogs"} className="btn btn-primary ">
              See More
              <ArrowForwardIcon className="ml-4" />
            </Link>
          </motion.div>
          <div className="divider"></div>
        </section>

        {/* Modal for email section */}
        <AMA isVisible={modal} title="" onClose={closeModal}></AMA>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  // Fetching Blogs from notion
  const database = await getHomeDatabase();

  return {
    props: {
      posts: database,
    },
  };
};
