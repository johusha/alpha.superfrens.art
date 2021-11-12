import "./StageDoor0.css";
import React, { createContext, useContext, useState } from "react";
import Wall from "./door_0/Wall";
// import Door from './door_0/Door'
import Light from "./door_0/Light";

const USER_HAS_KEY_TEST = true;

const door_state = {
  closed: 0,
  unlocked: 1,
  open: 2,
};

const DoorContext = createContext(door_state);

function StageDoor0({ walletAddress }) {
  return (
    <div className="Stage">
      <div className="StageStatic">
        <img src="image/web/door1_left.png" />
        <img src="image/web/door_ALPHA.png" />
        <img src="image/web/door1_right.png" />
      </div>
      <div className="StageDoor">
        <DoorContext.Provider value={door_state.closed}>
          <Door />
        </DoorContext.Provider>
      </div>
      <div className="StageLight">
        <img src="image/web/Landing_screen1_light.png" />
      </div>
    </div>
  );
}

function Door() {
  const state = useContext(DoorContext);
  const [doorState, setDoorState] = useState(state);
  const [frame, setFrame] = useState(0);

  let door_frame = 1;
  const animate = () => {
    requestAnimationFrame(() => {
      setFrame(door_frame++);

      // 📃TODO: Refactor to a promise
      if (door_frame > 3) {
        return console.log("door animation done");
      }
      setTimeout(animate, 350);
    });
  };

  function handleClick() {
    if (doorState === door_state.closed) {
      // 📃TODO: Actually verify the user has a key
      if (USER_HAS_KEY_TEST) {
        animate();
      } else {
        return console.log("You need a key to open the door.");
      }

      // Play a sound on unlock
      setDoorState(door_state.unlocked);
    }
  }

  return <img onClick={handleClick} src={`image/web/door${frame}.png`} />;
}

export default StageDoor0;
