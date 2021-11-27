import './MintWall.css'

import Clickable from './Clickable'
import LightThing from './LightThing'


function MintWall({onClick}) {
  

  return (
    <>
      <Clickable onClick={onClick}
        position={{
          top: '48%',
          left: '59%',
          width: '8%',
          height: '8%'
        }} />
      <LightThing src="image/web/mint_light.png" />
      <div className="StageLayer MintWall"></div>
    </>
  )
}

export default MintWall