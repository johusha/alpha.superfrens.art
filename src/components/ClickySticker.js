import './ClickySticker.css'
import Clickable from './Clickable'

function ClickySticker({ position, src, clickHandler}) {

  return (
    <div className="ClickySticker">
      <Clickable position={position} onClick={clickHandler} />
      <img
        src={src}
        className={`sticker`}
        style={position}
        />
    </div>
  )
}

export default ClickySticker