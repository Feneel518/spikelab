import React from "react";
import Layout from "../../components/Layout/Layout";
import { getDatabase } from "../../lib/notion";
import Blogs from "@/components/Blogs/Blogs";
import useModal from "@/modalState";
import AMA from "@/components/Modal/AMA";

const index = ({ posts }) => {
  const modal = useModal((state) => state.modal);
  const closeModal = useModal((state) => state.closeModal);
  return (
    <Layout>
      <Blogs posts={posts}></Blogs>
      <div className="divider"></div>
      <AMA isVisible={modal} title="" onClose={closeModal}></AMA>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const database = await getDatabase();

  return {
    props: {
      posts: database,
    },
  };
};

export default index;
