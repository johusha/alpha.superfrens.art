import './Door.css'
import React, { useContext, useEffect, useState } from 'react'
import { Web3Context, AppContext, DOOR_STATES } from '../App'

import Clickable from './Clickable'
import LightThing from './LightThing'
import KeyLight from './KeyLight'

function Door() {
  const { web3, walletAddress, balance } = useContext(Web3Context)
  // const [doorState, setDoorState] = useState(DOOR_STATES.no_power);
  const { doorState, setDoorState, floorState, setFloorState } = useContext(AppContext)

  function handleClick() {
    console.log('click')
    // can add a loading state to block clicking door again during load.

    if (doorState >= DOOR_STATES.unlocked) {
      if (doorState === DOOR_STATES.unlocked) {
        if (balance < 1) { return console.log('user has no keys')}

        setDoorState(DOOR_STATES.open)
        var audio = new Audio('sound/Dark_Space_Noise_02.mp3')
        audio.loop = true
        audio.play()
      }
      if (doorState === DOOR_STATES.open) {
        // setDoorState(DOOR_STATES.unlocked);
        setFloorState(1)
      }
    }
  }

  useEffect(() => {
    console.log({ doorState })
    // no web3 provider connected.
    if (!web3) {
      setDoorState(DOOR_STATES.no_power)
      setFloorState(0)
      // Web3 provider connected. No address.
    } else {
      // var audio = new Audio("sound/Dark_Space_Noise_02.mp3");
      // audio.loop = true;
      // audio.play();
    }
    if (!walletAddress) {
      setDoorState(DOOR_STATES.locked)
    } else {
        setDoorState(DOOR_STATES.unlocked)
    }
  }, [web3, walletAddress])

  // const lightClassName = Object.keys(DOOR_STATES).find(
  //   // returns DOOR_STATES key name @ value of doorState
  //   // one of no_power, locked, unlocked, open
  //   (key) => DOOR_STATES[key] === doorState
  // );

  const lightParams = {}

  return (
    <>
      <KeyLight />
      <LightThing position={lightParams} />
      <DoorThing handleClick={handleClick} doorState={doorState} />
    </>
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
  return (
    <>
      <Clickable
        onClick={handleClick}
        position={{
          top: '32%',
          left: '42%',
          width: '16%',
          height: '43%',
        }}
      />
      <LightThing src="image/web/Landing_screen1_light.png" />
      <div className={`StageLayer Door`}>
        <img src={`image/web/door0.png`} className={`door ${DOOR_STATES.open === doorState && 'doorOpen'}`} />
      </div>
    </>
  )
}

export default Door
