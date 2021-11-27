import { useState } from "react";
import "./Modal.scss";

import React from "react";
import Clickable from "./Clickable";
export function Modal({
  Content, // modal content
  clickableProps, // pass-through props for clickable component
  wrapperProps, // props for .modal-content
  contentProps, // props for .modal-content
  closeButtonProps, // props for .close
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Clickable onClick={() => setIsOpen(true)} {...clickableProps} />
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className="modal-wrapper"
        onClick={() => setIsOpen(false)}
        {...wrapperProps}
      >
        <div className="modal-content" {...contentProps}>
          <span className="modal-close" {...closeButtonProps} >
            &times;
          </span>
          {Content}
        </div>
      </div>
    </>
  );
}
