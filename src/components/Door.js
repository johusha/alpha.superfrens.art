import "./Door.css";
import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";

const DOOR_STATES = {
  no_power: 0,
  locked: 1,
  unlocked: 2,
  open: 3,
};

function Door() {
  const { web3, walletAddress } = useContext(Web3Context);
  const [doorState, setDoorState] = useState(DOOR_STATES.no_power);

  function handleClick() {
    console.log('click')
    // can add a loading state to block clicking door again during load.

    if (doorState >= DOOR_STATES.unlocked) {
      if (doorState === DOOR_STATES.unlocked) {
        setDoorState(DOOR_STATES.open);
      }
      if (doorState === DOOR_STATES.open) {
        setDoorState(DOOR_STATES.unlocked);
      }
    }
  }

  useEffect(() => {
    console.log({doorState})
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
    <DoorThing doorState={doorState} handleClick={handleClick} />

  )

  // return (
  //   <div className="Stage">
  //     <div className="StageStatic">
  //       <img src="image/web/door1_left.png" />
  //       <img src="image/web/door_ALPHA.png" />
  //       <img src="image/web/door1_right.png" />
  //     </div>
  //     <DoorThing doorState={doorState} handleClick={handleClick} />

  //     <div className="StageLight">
  //       <img
  //         className={`${lightClassName}`}
  //         src="image/web/Landing_screen1_light.png"
  //       />
  //     </div>
  //   </div>
  // );
}

function DoorThing({ doorState, handleClick }) {
  const html = document.querySelector('html')
  html.style.setProperty('overflow', `${doorState === DOOR_STATES.open ? 'scroll' : 'hidden'}`)
  return (
    <div className={`StageLayer Door`} onClick={handleClick}>
      <img
        src={`image/web/door0.png`}
        className={`door ${DOOR_STATES.open === doorState && "doorOpen"}`}
      />
    </div>
  );
}

export default Door;
