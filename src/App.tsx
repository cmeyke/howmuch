import { useState, useEffect } from 'react'
import './App.css'
import DisplayAssets from './components/DisplayAssets'
import { GetAssets } from './components/GetAssest'
import { OpenWallet } from './components/OpenWallet'
import ApplicationBar from './components/ApplicationBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

function App() {
  const getStoredAddress: () => string = () => {
    const savedAddress = localStorage.getItem('address')
    if (savedAddress) return savedAddress
    else return ''
  }

  const [address, setAddress] = useState(getStoredAddress())
  const [priceFiat, setPriceFiat] = useState(0)
  const [fiat, setFiat] = useState('USD')
  const [balance, setBalance] = useState(0)
  const [validatorBalances, setValidatorBalances] = useState(
    [] as [number, number, number, number][]
  )
  const [dark, setDark] = useState(localStorage.getItem('dark-mode') === 'true')

  useEffect(() => {
    if (address && address !== 'change') {
      localStorage.setItem('address', address)
    }
  }, [address])

  useEffect(() => {
    localStorage.setItem('dark-mode', dark.toString())
  }, [dark])

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  })

  const appliedTheme = createMuiTheme(dark ? darkTheme : lightTheme)

  return (
    <div className="App">
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <ApplicationBar
          address={address}
          setAddress={setAddress}
          fiat={fiat}
          setFiat={setFiat}
          dark={dark}
          setDark={setDark}
        />
        <OpenWallet address={address} setAddress={setAddress} />
        <GetAssets
          address={address}
          setPriceFiat={setPriceFiat}
          fiat={fiat}
          setBalance={setBalance}
          setValidatorBalances={setValidatorBalances}
          // reload={reload}
        />
        <DisplayAssets
          address={address}
          priceFiat={priceFiat}
          fiat={fiat}
          balance={balance}
          validatorBalances={validatorBalances}
        />
      </ThemeProvider>
    </div>
  )
}

export default App
