import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

type GetAssetsParameterType = {
  address: string
  setPriceEUR: React.Dispatch<React.SetStateAction<number>>
  setBalance: React.Dispatch<React.SetStateAction<number>>
  setValidatorBalances: React.Dispatch<
    React.SetStateAction<[number, number, number, number][]>
  >
}

export const GetAssets = ({
  address,
  setPriceEUR,
  setBalance,
  setValidatorBalances,
}: GetAssetsParameterType) => {
  const validatorsInitialValue: number[] = []
  const [validators, setValidators] = useState(validatorsInitialValue)

  async function getPriceEUR() {
    try {
      // const url = 'https://api.kraken.com/0/public/Ticker?pair=ETHEUR'
      const url =
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur'
      const res = await axios.get(url)
      // setPriceEUR(res.data.result.XETHZEUR.c[0])
      setPriceEUR(res.data.ethereum.eur)
    } catch (err) {
      console.error(err)
    }
  }

  function getNewProvider() {
    // console.log('getNewProvider')
    if (!(window as any).ethereum) {
      return ethers.getDefaultProvider('homestead', {
        alchemy: process.env.REACT_APP_ALCHEMY_API_KEY,
        etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY,
        infura: process.env.REACT_APP_INFURA_PROJECT_ID,
        pocket: process.env.REACT_APP_POCKET_APP_KEY,
      })
      // return new ethers.providers.PocketProvider(
      //   'homestead',
      //   process.env.REACT_APP_POCKET_APP_KEY
      // )
      // return new ethers.providers.AlchemyProvider(
      //   'homestead',
      //   process.env.REACT_APP_ALCHEMY_API_KEY
      // )
    } else {
      return new ethers.providers.Web3Provider((window as any).ethereum)
    }
  }

  const provider = getNewProvider()

  async function getBalance() {
    // console.log('getBalance')
    try {
      const balance = await provider.getBalance(address)
      setBalance(Number(ethers.utils.formatEther(balance)))
    } catch (err) {
      setBalance(0)
      console.error(err)
    }
  }

  async function getValidators() {
    try {
      const res = await axios.get(
        `https://beaconcha.in/api/v1/validator/eth1/${address}`
      )
      setValidators(
        res.data.data.map(
          (item: { validatorindex: number }) => item.validatorindex
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (address && address !== 'change') {
      getBalance()
      getPriceEUR()
      getValidators()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  async function getValidatorBalances(validator: number) {
    try {
      const validatorData = await axios.get(
        `https://beaconcha.in/api/v1/validator/${validator}`
      )
      const validatorEfficiency = await axios.get(
        `https://beaconcha.in/api/v1/validator/${validator}/attestationefficiency`
      )
      const validatorBalance: [number, number, number, number] = [
        validator,
        validatorData.data.data.balance / 1000000000,
        validatorData.data.data.effectivebalance / 1000000000,
        1 - (validatorEfficiency.data.data.attestation_efficiency - 1),
      ]
      setValidatorBalances(v => v.concat([validatorBalance]))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (address) {
      // console.log('useEffect: get validator balances')
      setValidatorBalances([])

      validators.forEach(validator => {
        getValidatorBalances(validator)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators])

  // console.log('GetAssets')

  return <div></div>
}
