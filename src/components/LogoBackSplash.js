import React, { useEffect, useState, useContext } from 'react'
import { AppContext, LOADING_STATES } from '../App'

import './LogoBackSplash.scss'
function LogoBackSplash(props) {

  const { loadedState } = useContext(AppContext)
  console.log({ loadedState})

  return props.disabled ? (
    <></>
  ) : (
      <img id={'logo_back_splash'} src={props.srcImg} className={loadedState < 1 ? '' : 'finished-loading'} />
  )
}

export default LogoBackSplash
