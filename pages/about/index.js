import React from "react";
import Layout from "../../components/Layout/Layout";
import AMA from "@/components/Modal/AMA";
import useModal from "@/modalState";

const index = () => {
  const modal = useModal((state) => state.modal);
  const closeModal = useModal((state) => state.closeModal);
  return (
    <Layout>
      About
      <div className="divider"></div>
      <AMA isVisible={modal} title="" onClose={closeModal}></AMA>
    </Layout>
  );
};

export default index;
