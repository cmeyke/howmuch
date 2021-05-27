import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Web3 from 'web3'

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
    // console.log('getPriceEUR')
    try {
      const res = await axios.get(
        'https://api.kraken.com/0/public/Ticker?pair=ETHEUR'
      )
      setPriceEUR(res.data.result.XETHZEUR.c[0])
    } catch (err) {
      console.error(err)
    }
  }

  function getNewProvider() {
    // console.log('getNewProvider')
    if (Web3.givenProvider === null) {
      const url = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
      return new Web3(url)
    } else {
      return new Web3(Web3.givenProvider)
    }
  }

  const web3 = getNewProvider()

  async function getBalance() {
    console.log('getBalance')
    try {
      const balance = await web3.eth.getBalance(address)
      setBalance(Number(Web3.utils.fromWei(balance)))
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
