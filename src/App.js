import './App.scss'
import React, { createContext, useEffect, useState } from 'react'
import logo_back_splash from './img/logo_back_splash.png'
import talk_to_us_on_discord_first_door from './img/talk_to_us_on_discord_first_door.png'
import talk_to_us_on_discord_mint_page from './img/talk_to_us_on_discord_mint_page.png'
import danger_thing from './img/danger.png'
import Door from './components/Door'
import Wall from './components/Wall'
import MintWall from './components/MintWall'

import { useWeb3 } from './useWeb3'
import { WalletConnect } from './components/classes/WalletConnect'
import InfoWall from './components/InfoWall'
import { ImageLink } from './components/ImageLink'
import LogoBackSplash from './components/LogoBackSplash'

export const DOOR_STATES = {
  no_power: 0,
  locked: 1,
  unlocked: 2,
  open: 3,
}

export const AppContext = createContext({
  doorState: undefined,
  setDoorState: undefined,
  floorState: undefined,
})

export const Web3Context = createContext({
  web3: undefined,
  loading: undefined,
  walletAddress: null,
  handleConnect: undefined,
  handleDisconnect: undefined,
})
// adds debugger name
Web3Context.displayName = 'Web3Context'

function App() {
  const Web3ContextData = useWeb3()
  // Navigation state
  const [floorState, setFloorState] = useState(-1)

  // Door state
  const [doorState, setDoorState] = useState(DOOR_STATES.no_power)
  const [isMinting, setIsMinting] = useState(false)
  const [mintResults, setMintResults] = useState(false)

  // Make sure the screen is scrolled to the top at start
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, ['👆'])

  const mintButtonClickHandler = async () => {
    //todo: display an effect based on minting being true
    setIsMinting(true)
    let swapResponse = await Web3ContextData.swap()
    setIsMinting(false)
    setMintResults(swapResponse)
  }

  useEffect(() => {
    console.log({ floorState })
    //Todo: change to scroll to next floor, remove query selectors... could use array of refs, scroll to idx + 1
    if (floorState === 1) {
      const floor = document.querySelectorAll('.Floor')[0]
      floor.scrollIntoView({
        behavior: 'smooth',
      })
    } else if (floorState === 2) {
      const floor2 = document.querySelectorAll('.Floor')[1]
      floor2.scrollIntoView({
        behavior: 'smooth',
      })
    } else if (floorState === 3) {
    }
    // trigger when floorState changes
  }, [floorState])

  return (
    <Web3Context.Provider value={Web3ContextData}>
      <WalletConnect />
      <AppContext.Provider value={{ doorState, setDoorState, floorState, setFloorState }}>
        <div className="App">
          <div className="StageContainer overlay">
            <LogoBackSplash srcImg={logo_back_splash} disabled={false} loading={Web3ContextData.loading} />
          </div>
          <div className={`${floorState < 0 ? 'isHidden' : ''} `}>
            <div className="FloorTop" />

            <div className="StageContainer">
              <div className="LeftStageThing" />

              <div className="CenterStageThing">
                <Door />
                {/* <Light /> */}
                <Wall />
                <ImageLink
                  id={'talk_to_us_on_discord_landing'}
                  imgSrc={talk_to_us_on_discord_first_door}
                  href={'https://discord.gg/AKqu8Wd3xb'}
                  position={{
                    top: '75%',
                    left: '68%',
                    width: '30%',
                    height: '8%',
                  }}
                />
              </div>

              <div className="RightStageThing" />
            </div>

            <div className="Floor" />
          </div>
          <div className={`${floorState < 1 ? 'isHidden' : ''}`}>
            <div className="StageContainer">
              <div className="CenterStageThing">
                {/* <InfoLight /> */}
                <InfoWall />
                <ImageLink
                  id={'danger_thing'}
                  imgSrc={danger_thing}
                  href={'/deck.pdf'}
                  position={{
                    top: '25%',
                    left: '8%',
                    width: '15%',
                    height: '4%',
                  }}
                />
              </div>
            </div>

            <div className="Floor" />
          </div>
          <div className={`${floorState < 2 ? 'isHidden' : ''}`}>
            <div className="StageContainer">
              <div className={`CenterStageThing ${isMinting ? 'isMinting' : ''}`}>
                {/* <MintLight /> */}
                <MintWall onClick={mintButtonClickHandler} />
                <ImageLink
                  id={'talk_to_us_on_discord_minting'}
                  imgSrc={talk_to_us_on_discord_mint_page}
                  href={'https://discord.gg/AKqu8Wd3xb'}
                  position={{
                    top: '75%',
                    left: '15%',
                    width: '27%',
                    height: '8%',
                  }}
                />
                {mintResults?.status && (
                  <div className={'overlay'}>
                    <div className="circle-sb">"Freedom at last!"</div>
                  </div>
                )}
              </div>
            </div>
            <div className="FloorBottom" />
          </div>
          <div className="Content" style={{ display: 'none' }} />
        </div>
      </AppContext.Provider>
    </Web3Context.Provider>
  )
}

export default App
