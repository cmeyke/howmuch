import { useState, useEffect } from 'react'
import './App.css'
import DisplayAssets from './components/DisplayAssets'
import { GetAssets } from './components/GetAssest'
import { OpenWallet } from './components/OpenWallet'
import ApplicationBar from './components/ApplicationBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

function App () {
  const [address, setAddress] = useState('')
  const [priceEUR, setPriceEUR] = useState(0)
  const [balance, setBalance] = useState(0)
  const [validatorBalances, setValidatorBalances] = useState(
    [] as [number, number, number, number][]
  )
  const [dark, setDark] = useState(true)

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light'
    }
  })

  useEffect(() => {
    if (address && address !== 'change') {
      // console.log(`store: "${address}"`)
      localStorage.setItem('address', address)
    }
  }, [address])

  if (!address) {
    const savedAddress = localStorage.getItem('address')
    if (savedAddress) {
      // console.log(`set: "${savedAddress}"`)
      setAddress(savedAddress)
    }
  }

  const appliedTheme = createMuiTheme(dark ? darkTheme : lightTheme)

  return (
    <div className='App'>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <ApplicationBar
          address={address}
          setAddress={setAddress}
          dark={dark}
          setDark={setDark}
        />
        <OpenWallet address={address} setAddress={setAddress} />
        <GetAssets
          address={address}
          setPriceEUR={setPriceEUR}
          setBalance={setBalance}
          setValidatorBalances={setValidatorBalances}
          // reload={reload}
        />
        <DisplayAssets
          address={address}
          priceEUR={priceEUR}
          balance={balance}
          validatorBalances={validatorBalances}
        />
      </ThemeProvider>
    </div>
  )
}

export default App
