import "./InfoWall.css";
import { AppContext } from "../App";
import React, { useContext } from "react";

import Clickable from "./Clickable";
import LightThing from "./LightThing";
import { Modal } from "./Modal";
import warning_notice from "../img/warning_notice_info_level_2.png";

function InfoWall() {
  const { floorState, setFloorState } = useContext(AppContext);

  const clickHandler = () => {
    setFloorState(2);
  };

  return (
    <>
      <Modal
        Content={<img width={"100%"} src={warning_notice} />}
        clickableProps={{
          className: "info-wall-pop-up",
          position: {
            top: "25%",
            left: "30%",
            width: "25%",
            height: "37%",
          },
        }}
      />

      <Clickable
        onClick={clickHandler}
        position={{
          top: "55%",
          left: "72%",
          width: "9%",
          height: "8%",
        }}
      />
      <LightThing src="image/web/info_level_light.png" />
      <div className="StageLayer InfoWall"></div>
    </>
  );
}

export default InfoWall;
