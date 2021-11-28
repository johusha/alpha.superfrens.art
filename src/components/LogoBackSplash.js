import React, { useEffect, useState } from 'react'

import './LogoBackSplash.scss'
function LogoBackSplash(props) {


  return props.disabled ? (
    <></>
  ) : (
    <img id={'logo_back_splash'} src={props.srcImg} className={props.loading ? '' : 'finished-loading'} />
  )
}

export default LogoBackSplash
