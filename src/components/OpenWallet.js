import React, { useState } from 'react'
import { ethers } from 'ethers'

function OpenWallet () {
  const [address, setAddress] = useState(0)
  const [balance, setBalance] = useState(0)

  async function connectWallet () {
    try {
      const [selectedAddress] = await window.ethereum.enable()
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

  if (!address) {
    connectWallet()
    window.document.title = 'Please connect wallet'
    return (
      <div>
        <button onClick={connectWallet}>Please connect wallet</button>
      </div>
    )
  }

  getBalance()
  window.document.title = balance

  return (
    <div>
      <div>{address}</div>
      <div>{balance}</div>
    </div>
  )
}

export default OpenWallet
