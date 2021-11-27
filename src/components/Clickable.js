import "./Clickable.css";
import { useContext } from "react";
import { AppContext, DOOR_STATES } from "../App";

function Clickable({ position, className, onClick, debug = false, children }) {
  const { top, left, width, height } = position;

  const debugStyle = debug ? { background: "red", opacity: 0.6 } : {};

  const { doorState } = useContext(AppContext);

  const clickHandler = () => {
    if (doorState !== DOOR_STATES.unlocked && doorState !== DOOR_STATES.open) {
      return console.log("nah not doin it. The door is not unlocked");
    }
    if (onClick) onClick();
  };

  return (
    <div
      className={`Clickable ${className}`}
      style={{
        top,
        left,
        width,
        height,
        ...debugStyle,
      }}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
}

export default Clickable;
