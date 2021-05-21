import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import web3 from 'web3'

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
  setValidatorBalances
}: GetAssetsParameterType) => {
  const validatorsInitialValue: number[] = []
  const [validators, setValidators] = useState(validatorsInitialValue)

  function getPriceEUR () {
    // console.log('getPriceEUR')
    axios
      .get('https://api.kraken.com/0/public/Ticker?pair=ETHEUR')
      .then(res => {
        setPriceEUR(res.data.result.XETHZEUR.c[0])
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function getBalance (provider: ethers.providers.JsonRpcProvider) {
    try {
      // console.log('getBalance')
      const balance = await provider.getBalance(address)
      setBalance(Number(ethers.utils.formatEther(balance)))
    } catch (e) {
      setBalance(0)
      setValidatorBalances([])
      console.error(e)
    }
  }

  function getNewProvider () {
    if (web3.givenProvider === null) {
      const url =
        'https://eth-mainnet.alchemyapi.io/v2/8j-Eu5zxTrvO6_WrCBu3iVuOR7jtC7EV'
      const customHttpProvider = new ethers.providers.JsonRpcProvider(url)
      return customHttpProvider
    } else {
      return new ethers.providers.Web3Provider(web3.givenProvider)
    }
  }

  useEffect(() => {
    if (address && address !== 'change') {
      const provider = getNewProvider()

      getBalance(provider)
      getPriceEUR()
      // console.log('useEffect: get validators')
      axios
        .get(`https://beaconcha.in/api/v1/validator/eth1/${address}`)
        .then(res => {
          setValidators(
            res.data.data.map(
              (item: { validatorindex: number }) => item.validatorindex
            )
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    if (address) {
      // console.log('useEffect: get validator balances')
      setValidatorBalances([])

      validators.forEach(validator => {
        axios
          .get(`https://beaconcha.in/api/v1/validator/${validator}`)
          .then(res => {
            const validatorBalance: [number, number, number, number] = [
              validator,
              res.data.data.balance / 1000000000,
              res.data.data.effectivebalance / 1000000000,
              0
            ]
            axios
              .get(
                `https://beaconcha.in/api/v1/validator/${validator}/attestationefficiency`
              )
              .then(res => {
                validatorBalance[3] =
                  100 - (res.data.data.attestation_efficiency * 100 - 100)
                setValidatorBalances(v => v.concat([validatorBalance]))
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators])

  // console.log('GetAssets')

  return <div></div>
}
