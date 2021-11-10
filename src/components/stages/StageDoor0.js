import './StageDoor0.css'
import React, { useState } from 'react'

import Wall from './door_0/Wall'
import Door from './door_0/Door'
import Light from './door_0/Light'

function Door0() {
  // 📃TODO: This should probly be useContext
  const [state, setState] = useState(0)

  return (
    <div className="StageDoor0" style={{ display: `${state !== 0 ? 'none' : 'flex'}`}}>
      <section className="Layer0">
        <Wall></Wall>
      </section>
      <section className="Layer1">
        <Door></Door>
      </section>
      <section className="Layer2">
        <Light></Light>
      </section>
    </div>
  )
}

export default Door0