import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

export const GetAssets = ({
  address,
  setPriceEUR,
  setBalance,
  setValidatorBalances,
  setValidatorBalancesSum
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

  useEffect(() => {
    if (address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

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
  }, [address])

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
