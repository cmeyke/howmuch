import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

export const GetAssets = ({
  address,
  setPriceEUR,
  setBalance,
  setValidatorBalances,
  setValidatorBalancesSum,
  reload
}) => {
  const [validators, setValidators] = useState([])

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

  async function getBalance (provider) {
    try {
      // console.log('getBalance')
      const balance = await provider.getBalance(address)
      setBalance(Number(ethers.utils.formatEther(balance)))
    } catch (e) {
      console.error(e)
    }
  }

  function getNewProvider () {
    if (window.ethereum === undefined) {
      const url =
        'https://eth-mainnet.alchemyapi.io/v2/8j-Eu5zxTrvO6_WrCBu3iVuOR7jtC7EV'
      const customHttpProvider = new ethers.providers.JsonRpcProvider(url)
      return customHttpProvider
    } else {
      return new ethers.providers.Web3Provider(window.ethereum)
    }
  }

  useEffect(() => {
    if (address) {
      const provider = getNewProvider()

      getBalance(provider)
      getPriceEUR()
      // console.log('useEffect: get validators')
      axios
        .get(`https://beaconcha.in/api/v1/validator/eth1/${address}`)
        .then(res => {
          setValidators(res.data.data.map(item => item.validatorindex))
        })
        .catch(err => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, reload])

  useEffect(() => {
    if (address) {
      // console.log('useEffect: get validator balances')
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators])

  // console.log('GetAssets')

  return <div></div>
}
