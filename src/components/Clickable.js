import './Clickable.css'
import { useContext } from 'react'
import { AppContext, DOOR_STATES } from '../App'

function Clickable({ position, onClick }) {

  const {top, left, width, height} = position

  const { doorState } = useContext(AppContext)

  const clickHandler = () => {
    console.log({doorState})
    if (doorState !== DOOR_STATES.unlocked && doorState !== DOOR_STATES.open) {
      return console.log('nah not doin it. The door is not unlocked')
    }

    onClick()
  }

  return (
    <div
      className="Clickable"
      style={{top, left, width, height}}
      onClick={clickHandler}
    ></div>
  )
}

export default Clickable