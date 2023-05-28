import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const TestiModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div className="text-black z-10 ">
      <div
        id="wrapper"
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="flex flex-col  bg-transparent p-2 ">
          <div className="place-self-end  cursor-pointer bg-white rounded-xl mb-2 hover:bg-slate-200 p-2">
            <CloseIcon onClick={() => onClose()} />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TestiModal;
