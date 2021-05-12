import React, { useState } from 'react'
import { ethers } from 'ethers'

function OpenWallet () {
  const [address, setAddress] = useState(0)
  const [balance, setBalance] = useState(0)

  async function getAddress () {
    try {
      const address = await signer.getAddress()
      setAddress(address)
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

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  getAddress()
  if (address > 0) {
    getBalance()
    window.document.title = balance
  } else {
    window.document.title = 'Please connect wallet'
    return <div>Please connect wallet</div>
  }

  return (
    <div>
      <div>{address}</div>
      <div>{balance}</div>
    </div>
  )
}

export default OpenWallet
