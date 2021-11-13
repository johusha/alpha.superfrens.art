import "./StageDoor0.css";
import React, { useContext, useState } from "react";
import { Web3Context } from "../../App";

const USER_HAS_KEY_TEST = true;

const DOOR_STATES = {
  no_power: 0,
  locked: 1,
  unlocked: 2,
  open: 3,
};

function StageDoor0() {
  const { web3, walletAddress } = useContext(Web3Context);
  const [doorState, setDoorState] = useState(DOOR_STATES.locked);

  const DoorCode = () => {
    if (!web3) {
      return "PowerOff";
    }

    if (!walletAddress) {
      return "BlockEntry";
    }

    return "PowerOn";
  };

  return (
    <div className="Stage">
      <div className="StageStatic">
        <img src="image/web/door1_left.png" />
        <img src="image/web/door_ALPHA.png" />
        <img src="image/web/door1_right.png" />
      </div>
      <div className="StageDoor">
        <Door doorState={doorState} setDoorState={setDoorState} />
      </div>
      <div className="StageLight">
        <img
          className={`${DoorCode()}`}
          src="image/web/Landing_screen1_light.png"
        />
      </div>
    </div>
  );
}

function Door({ doorState, setDoorState }) {
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
    if (doorState === DOOR_STATES.locked) {
      // 📃TODO: Actually verify the user has a key
      if (USER_HAS_KEY_TEST) {
        animate();
      } else {
        return console.log("You need a key to open the door.");
      }

      // Play a sound on unlock
      setDoorState(DOOR_STATES.unlocked);
    }
  }

  return <img onClick={handleClick} src={`image/web/door${frame}.png`} />;
}

export default StageDoor0;
