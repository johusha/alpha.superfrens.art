import Entity from '../../Entity'

function Door() {

  const door = new doorBuilder(Entity)
    .setName('The Scary Door')
    .setPosition({x: 0, y: 0})
    .setSize({width: 1120, height: 1120})
    .build()

  

  return (<>
    <Entity></Entity>
  </>)
}

export default Door