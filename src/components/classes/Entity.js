// I think these need to actually be classes
// and then I will create a component for each element
// which can extend it

// Use the builder or factory pattern to add stuff like size, position, name, etc.
// could also pass callback methods or event listeners -- whichever we want

function Entity() {
  
  const clickHandler = event => {
    console.log(event)
  }

  // 📃TODO: Pass the size and position to the component
  return (
    <div className="Entity" onClick={clickHandler}>
      <Canvas></Canvas>
    </div>
  )
}

export default Entity