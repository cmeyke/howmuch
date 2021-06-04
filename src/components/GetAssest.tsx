import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

type GetAssetsParameterType = {
  address: string
  setPriceFiat: React.Dispatch<React.SetStateAction<number>>
  fiat: string
  setBalance: React.Dispatch<React.SetStateAction<number>>
  setValidatorBalances: React.Dispatch<
    React.SetStateAction<[number, number, number, number][]>
  >
}

export const GetAssets = ({
  address,
  setPriceFiat,
  fiat,
  setBalance,
  setValidatorBalances,
}: GetAssetsParameterType) => {
  const validatorsInitialValue: number[] = []
  const [validators, setValidators] = useState(validatorsInitialValue)

  async function getPriceFiat() {
    switch (fiat) {
      case 'EUR':
        try {
          const url =
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur'
          const res = await axios.get(url)
          setPriceFiat(res.data.ethereum.eur)
        } catch (err) {
          console.error(err)
        }
        break
      case 'USD':
        try {
          const url =
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
          const res = await axios.get(url)
          setPriceFiat(res.data.ethereum.usd)
        } catch (err) {
          console.error(err)
        }
        break
      default:
        break
    }
  }

  function getNewProvider() {
    if ((window as any).ethereum) {
      return new ethers.providers.Web3Provider((window as any).ethereum)
    } else {
      return ethers.getDefaultProvider('homestead', {
        alchemy: process.env.REACT_APP_ALCHEMY_API_KEY,
        etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY,
        infura: process.env.REACT_APP_INFURA_PROJECT_ID,
        pocket: process.env.REACT_APP_POCKET_GATEWAY_ID,
      })
    }
  }

  const provider = getNewProvider()

  async function getBalance() {
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
        res.data.data
          .sort((a: number, b: number) => a - b)
          .map((item: { validatorindex: number }) => item.validatorindex)
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (address) {
      getBalance()
      getPriceFiat()
      getValidators()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    if (address) getPriceFiat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiat])

  async function getValidatorsBalances(validators: number[]) {
    const maxValidators = validators.slice(0, 100)
    const validatorsString = maxValidators.toString()
    if (validatorsString !== '') {
      setValidatorBalances([])
      try {
        const validatorsData = await axios.get(
          `https://beaconcha.in/api/v1/validator/${validatorsString}`
        )
        const validatorsEfficiency = await axios.get(
          `https://beaconcha.in/api/v1/validator/${validatorsString}/attestationefficiency`
        )
        if (
          validatorsData.data.data.length ===
          validatorsEfficiency.data.data.length
        ) {
          for (let i = 0; i < validatorsData.data.data.length; i++) {
            const validatorBalance: [number, number, number, number] = [
              validators[i],
              validatorsData.data.data[i].balance / 1000000000,
              validatorsData.data.data[i].effectivebalance / 1000000000,
              1 -
                (validatorsEfficiency.data.data[i].attestation_efficiency - 1),
            ]
            setValidatorBalances(v => v.concat([validatorBalance]))
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (address) getValidatorsBalances(validators)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators])

  return <React.Fragment />
}
