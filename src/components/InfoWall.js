import './InfoWall.css'

import Clickable from './Clickable'

function InfoWall({onClick}) {

  return (
    <>
      <Clickable onClick={onClick}
        position={{
          top: '55%',
          left: '72%',
          width: '9%',
          height: '8%'
        }} />
      <div className="StageLayer InfoWall"></div>
    </>
  )
}

export default InfoWall