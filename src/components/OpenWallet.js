import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'

function OpenWallet () {
  const [address, setAddress] = useState(0)
  const [balance, setBalance] = useState(0)
  const [validators, setValidators] = useState([])
  const [validatorBalances, setValidatorBalances] = useState([])
  const [validatorBalancesSum, setValidatorBalancesSum] = useState(0)
  const [priceEUR, setPriceEUR] = useState(0)

  useEffect(() => {
    axios
      .get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR')
      .then(res => {
        setPriceEUR(res.data.result.XETHZEUR.c[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setValidatorBalances([])
    setValidatorBalancesSum(0)
    validators.forEach(validator =>
      axios
        .get(`https://beaconcha.in/api/v1/validator/${validator}`)
        .then(res => {
          const balance = res.data.data.balance / 1000000000
          setValidatorBalances(v => v.concat([[validator, balance]]))
          setValidatorBalancesSum(s => s + balance)
        })
        .catch(err => {
          console.log(err)
        })
    )
  }, [validators])

  useEffect(() => {
    if (address) {
      axios
        .get(`https://beaconcha.in/api/v1/validator/eth1/${address}`)
        .then(res => {
          setValidators(res.data.data.map(item => item.validatorindex))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [address])

  async function getAddress () {
    try {
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_accounts'
      })
      setAddress(selectedAddress)
    } catch (e) {
      console.error(e)
    }
  }

  async function connectWallet () {
    try {
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAddress(selectedAddress)
    } catch (e) {
      console.error(e)
    }
  }

  async function getBalance () {
    try {
      const balance = await provider.getBalance(address)
      setBalance(ethers.utils.formatEther(balance))
    } catch (e) {
      console.error(e)
    }
  }

  if (window.ethereum === undefined) {
    return <div>Please install MetaMask</div>
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  getAddress()
  if (!address) {
    window.document.title = 'Please connect wallet'
    return (
      <div>
        <button onClick={connectWallet}>Please connect wallet</button>
      </div>
    )
  }

  getBalance()
  const overallBalance = validatorBalancesSum + Number(balance)
  window.document.title = overallBalance

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR'
  })

  return (
    <div>
      <div>{address}:</div>
      <div>{balance}</div>
      {validatorBalances.map(validator => (
        <div key={validator[0]}>
          {validator[0]}: {validator[1]}
        </div>
      ))}
      <div>Validators sum: {validatorBalancesSum}</div>
      <div>Overall sum: {overallBalance}</div>
      <div>
        {formaterEUR.format(overallBalance * priceEUR)} (
        {formaterEUR.format(priceEUR)})
      </div>
    </div>
  )
}

export default OpenWallet
