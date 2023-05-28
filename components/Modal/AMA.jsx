import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, submitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

const AMA = ({ isVisible, onClose, title }) => {
  if (!isVisible) return;
  const form = useRef();

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    emailjs
      .sendForm(
        "service_kd6cv0n",
        "template_enm2u68",
        form.current,
        "NnsjFf7Pbu_We_fgQ"
      )
      .then(
        (result) => {
          console.log(result.text, "message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="text-black ">
      <div
        id="wrapper"
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="flex flex-col w-[600px] max-lg:w-[400px] bg-white p-2 rounded-md shadow-xl">
          <div className="place-self-end  rounded-md cursor-pointer hover:bg-slate-200 p-2">
            <CloseIcon onClick={() => onClose()} />
          </div>
          {/* ///////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////// */}
          {/* form input */}
          <form
            ref={form}
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col p-5 my-5  "
          >
            <h3 className="text-xl font-bold mb-1">Ask Me Anything</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repudiandae, ipsa?
            </p>

            <label className="block mb-5 ">
              <span className="text-gray-700 ">Name</span>
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                placeholder="John Doe"
                className=" outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#4B6BFB] focus:ring-1"
              />
              <h2>
                {errors.name && (
                  <span className="text-red-400">
                    {" "}
                    The name field is required
                  </span>
                )}
              </h2>
            </label>
            <label className="block mb-5 ">
              <span className="text-gray-700 ">Email</span>
              <input
                {...register("email", { required: true })}
                name="email"
                type="email"
                placeholder="johnDoe@gmail.com"
                className=" outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#4B6BFB] focus:ring-1"
              />
              <h2>
                {errors.email && (
                  <span className="text-red-400">
                    {" "}
                    The email field is required
                  </span>
                )}
              </h2>
            </label>
            <label className="block mb-5 ">
              <span className="text-gray-700 ">Topic</span>
              <input
                {...register("topic", { required: true })}
                defaultValue={title}
                name="topic"
                type="text"
                placeholder="Blog Title"
                className=" outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#4B6BFB] focus:ring-1"
              />
              <h2>
                {errors.topic && (
                  <span className="text-red-400">
                    {" "}
                    The email field is required
                  </span>
                )}
              </h2>
            </label>
            <label className="block mb-5 ">
              <span className="text-gray-700 ">Question?</span>
              <textarea
                {...register("question", { questions: true })}
                name="question"
                rows={9}
                placeholder="Ask Me Anything..."
                className=" outline-none shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-[#4B6BFB] focus:ring-1"
              />
              <h2>
                {errors.question && (
                  <span className="text-red-400">
                    {" "}
                    The comment field is required
                  </span>
                )}
              </h2>
            </label>
            <button type="submit" className="btn btn-primary w-40 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AMA;
