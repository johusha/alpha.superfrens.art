import './LightThing.css'
import { useContext } from 'react';
import { AppContext, DOOR_STATES } from '../App';

function LightThing({src}) {

  const { doorState } = useContext(AppContext)

  const lightClassName = Object.keys(DOOR_STATES).find(
    // returns DOOR_STATES key name @ value of doorState
    // one of no_power, locked, unlocked, open
    (key) => DOOR_STATES[key] === doorState
  );

  return (
    <div className="StageLayer LightThing" style={{zIndex: '99999', pointerEvents: 'none'}}>
      <img
        className={`${lightClassName}`}
        src={src}
      />
    </div>
  )
}

export default LightThing