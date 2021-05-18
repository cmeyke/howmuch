import { useState, useEffect } from 'react'
import './App.css'
import DisplayAssets from './components/DisplayAssets'
import { GetAssets } from './components/GetAssest'
import { OpenWallet } from './components/OpenWallet'
import { UserInput } from './components/UserInput'

function App () {
  const [address, setAddress] = useState('')
  const [priceEUR, setPriceEUR] = useState(0)
  const [balance, setBalance] = useState(0)
  const [validatorBalances, setValidatorBalances] = useState(
    [] as [number, number, number][]
  )
  const [reload, setReload] = useState(0)

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

  return (
    <div className='App'>
      <OpenWallet address={address} setAddress={setAddress} />
      <GetAssets
        address={address}
        setPriceEUR={setPriceEUR}
        setBalance={setBalance}
        setValidatorBalances={setValidatorBalances}
        reload={reload}
      />
      <DisplayAssets
        address={address}
        priceEUR={priceEUR}
        balance={balance}
        validatorBalances={validatorBalances}
      />
      <UserInput
        address={address}
        setAddress={setAddress}
        reload={reload}
        setReload={setReload}
      />
    </div>
  )
}

export default App
