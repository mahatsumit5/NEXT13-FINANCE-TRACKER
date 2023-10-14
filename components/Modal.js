import React from "react";

const Modal = ({ onClose, show, children }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500"
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-700 px-4 py-6">
        <button
          className="w-10 h-10 font-bold rounded-full bg-slate-800"
          onClick={() => {
            onClose(false);
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
