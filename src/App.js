import React, { useState } from 'react'
import './App.css'
import DisplayAssets from './components/DisplayAssets'
import { GetAssets } from './components/GetAssest'
import { OpenWallet } from './components/OpenWallet'

function App () {
  const [address, setAddress] = useState(0)
  const [priceEUR, setPriceEUR] = useState(0)
  const [balance, setBalance] = useState(0)
  const [validatorBalances, setValidatorBalances] = useState([])
  const [validatorBalancesSum, setValidatorBalancesSum] = useState(0)
  const [reload, setReload] = useState(0)

  return (
    <div className='App'>
      <OpenWallet address={address} setAddress={setAddress} />
      <GetAssets
        address={address}
        setPriceEUR={setPriceEUR}
        setBalance={setBalance}
        setValidatorBalances={setValidatorBalances}
        setValidatorBalancesSum={setValidatorBalancesSum}
        reload={reload}
      />
      <DisplayAssets
        address={address}
        priceEUR={priceEUR}
        balance={balance}
        validatorBalances={validatorBalances}
        validatorBalancesSum={validatorBalancesSum}
      />
      <div>
        {address ? (
          <button onClick={() => setReload(reload + 1)}>Reload</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default App
