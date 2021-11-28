import './Wall.css'
import React, { useContext, useEffect, useState } from 'react'
import { Web3Context, AppContext, DOOR_STATES, LOADING_STATES } from '../App'

function Wall() {
  const { doorState, setDoorState, floorState, setFloorState } = useContext(AppContext)
  const { loadedState, setLoadedState } = useContext(AppContext)

  const loadedHandler = () => {
    console.log('loaded image')
    setLoadedState(LOADING_STATES.preload)
  }

  return (
    <div className="StageLayer Wall" onLoad={loadedHandler}>
      <img src='image/web/stage_wall.png'
           onLoad={loadedHandler}
      />
    </div>
  )
}

export default Wall