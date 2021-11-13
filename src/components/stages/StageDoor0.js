import "./StageDoor0.css";
import React, { useContext, useEffect, useState } from "react";
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
  const [doorState, setDoorState] = useState(DOOR_STATES.no_power);

  useEffect(() => {
    // no web3 provider connected.
    if (!web3) {
      setDoorState(DOOR_STATES.no_power);
      // Web3 provider connected. No address.
    } else {
      // var audio = new Audio("sound/Dark_Space_Noise_02.mp3");
      // audio.play();
    }
    if (!walletAddress) {
      setDoorState(DOOR_STATES.locked);
    } else {
      // 📃TODO: Actually verify the user has a key
      setDoorState(DOOR_STATES.unlocked);
    }
  }, [web3, walletAddress]);

  const lightClassName = Object.keys(DOOR_STATES).find(
    // returns DOOR_STATES key name @ value of doorState
    // one of no_power, locked, unlocked, open
    (key) => DOOR_STATES[key] === doorState
  );

  return (
    <div className="Stage">
      <div className="StageStatic">
        <img src="image/web/door1_left.png" />
        <img src="image/web/door_ALPHA.png" />
        <img src="image/web/door1_right.png" />
      </div>
      <Door doorState={doorState} setDoorState={setDoorState} />

      <div className="StageLight">
        <img
          className={`${lightClassName}`}
          src="image/web/Landing_screen1_light.png"
        />
      </div>
    </div>
  );
}

function Door({ doorState, setDoorState }) {
  const [doorFrame, setDoorFrame] = useState(doorState);

  const openDoor = (frame = 0, callBack) => {
    callBack(frame);
    if (frame >= 4) return;
    setTimeout(() => {
      openDoor(frame + 1, callBack);
    }, 350);
    return false;
  };

  const closeDoor = (frame = 4, callBack) => {
    callBack(frame);
    if (frame <= 0) return;
    setTimeout(() => {
      closeDoor(frame - 1, callBack);
    }, 350);
  };

  function handleClick() {
    if (doorState >= DOOR_STATES.unlocked) {
      if (doorFrame === 0) {
        openDoor(0, setDoorFrame);
        setDoorState(DOOR_STATES.open);
      }
      if (doorFrame === 4) {
        closeDoor(4, setDoorFrame);
        setDoorState(DOOR_STATES.unlocked);
      }
    }
  }

  return (
    <div className="StageDoor" onClick={handleClick}>
      {doorFrame !== 4 && <img src={`image/web/door${doorFrame}.png`} />}
    </div>
  );
}

export default StageDoor0;
