import React from 'react'
import { InputAddress, checkAndSetAddress } from './InputAddress'

type OpenWalletParameterType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

const givenProvider = (window as any).ethereum

export const OpenWallet = ({
  address,
  setAddress,
}: OpenWalletParameterType) => {
  async function getAddress() {
    if (givenProvider)
      try {
        const [selectedAddress] = await givenProvider.request({
          method: 'eth_accounts',
        })
        checkAndSetAddress(selectedAddress, setAddress)
      } catch (e) {
        console.error(e)
      }
  }

  async function connectWallet() {
    if (givenProvider)
      try {
        const [selectedAddress] = await givenProvider.request({
          method: 'eth_requestAccounts',
        })
        checkAndSetAddress(selectedAddress, setAddress)
      } catch (e) {
        console.error(e)
      }
  }

  if (address && address !== 'change') return <div></div>

  if (!address) {
    getAddress()
  }

  if (!address || address === 'change') {
    return (
      <InputAddress setAddress={setAddress} connectWallet={connectWallet} />
    )
  }

  return <React.Fragment />
}
