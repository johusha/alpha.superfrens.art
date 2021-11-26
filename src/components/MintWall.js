import './MintWall.css'

import Clickable from './Clickable'


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
      <div className="StageLayer MintWall"></div>
    </>
  )
}

export default MintWall