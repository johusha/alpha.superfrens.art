import './InfoWall.css'
import { AppContext } from "../App";
import React, { useContext } from 'react'

import Clickable from './Clickable'
import LightThing from './LightThing';

function InfoWall() {

  const { floorState, setFloorState } = useContext(AppContext)

  const clickHandler = () => {
    setFloorState(2)
  }

  return (
    <>
      <Clickable onClick={clickHandler}
        position={{
          top: '55%',
          left: '72%',
          width: '9%',
          height: '8%'
        }} />
      <LightThing src="image/web/info_level_light.png" />
      <div className="StageLayer InfoWall"></div>
    </>
  )
}

export default InfoWall