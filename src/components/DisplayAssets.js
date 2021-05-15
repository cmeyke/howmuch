import React from 'react'

function DisplayAssets ({
  address,
  priceEUR,
  balance,
  validatorBalances,
  validatorBalancesSum
}) {
  if (!address) {
    return <div></div>
  }

  // console.log('DisplayAssets')

  const overallBalance = validatorBalancesSum + balance
  window.document.title = overallBalance

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR'
  })

  return (
    <div>
      <div>{address}:</div>
      <div>{balance}</div>
      {validatorBalances.map(validator => (
        <div key={validator[0]}>
          {validator[0]}: {validator[1]}
        </div>
      ))}
      <div>Sum validators: {validatorBalancesSum}</div>
      <div>Sum totals: {overallBalance}</div>
      <div>
        {formaterEUR.format(overallBalance * priceEUR)} (
        {formaterEUR.format(priceEUR)})
      </div>
    </div>
  )
}

export default DisplayAssets
