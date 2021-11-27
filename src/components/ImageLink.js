import Clickable from "./Clickable";
import './ImageLink.scss'
import React from "react";

export function ImageLink({ position, imgId, imgSrc, href }) {
  return (
    <a href={href} target="_blank">
      <Clickable className={'ImageLink'} position={position}>
        <img   id={imgId} src={imgSrc} />
      </Clickable>{" "}
    </a>
  );
}
