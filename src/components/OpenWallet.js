import React from 'react'

export const OpenWallet = ({ address, setAddress }) => {
  async function getAddress () {
    try {
      // console.log('getAddress')
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
      // console.log('connectWallet')
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAddress(selectedAddress)
    } catch (e) {
      console.error(e)
    }
  }

  if (address) {
    return <div></div>
  }

  // console.log('OpenWallet')

  if (window.ethereum === undefined) {
    return <div>Please install MetaMask</div>
  }

  if (!address) {
    getAddress()
  }

  if (!address) {
    window.document.title = 'Please connect wallet'
    return (
      <div>
        <button onClick={connectWallet}>Please connect wallet</button>
      </div>
    )
  }

  return <div></div>
}
