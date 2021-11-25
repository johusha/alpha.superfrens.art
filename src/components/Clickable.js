import './Clickable.css'

function Clickable({ position, onClick }) {

  const {top, left, width, height} = position

  const onClickHandler = () => {
    console.log('Clickable.js clicked')
  }

  return (
    <div
      className="Clickable"
      style={{top, left, width, height}}
      onClick={onClick}
    ></div>
  )
}

export default Clickable