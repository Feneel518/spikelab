import React from "react";
import Layout from "../../components/Layout/Layout";
import { client } from "@/sanity/lib/client";
import useModal from "@/modalState";
import AMA from "@/components/Modal/AMA";

const index = () => {
  const modal = useModal((state) => state.modal);
  const closeModal = useModal((state) => state.closeModal);
  return (
    <Layout>
      <div className="">Resources</div>
      <div className="divider"></div>
      <AMA isVisible={modal} title="" onClose={closeModal}></AMA>
    </Layout>
  );
};

export default index;
