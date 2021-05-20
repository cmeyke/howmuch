type DisplayAssetsParameterType = {
  address: string
  priceEUR: number
  balance: number
  validatorBalances: [number, number, number, number][]
}

function DisplayAssets ({
  address,
  priceEUR,
  balance,
  validatorBalances
}: DisplayAssetsParameterType) {
  if (!address) {
    return <div></div>
  }

  // console.log('DisplayAssets')

  if (address === 'change') return <div></div>

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR'
  })

  let totalEarnings = 0
  let validatorBalancesSum = 0
  validatorBalances.forEach(validator => {
    totalEarnings += validator[1] - validator[2]
    validatorBalancesSum += validator[1]
  })
  const overallBalance = validatorBalancesSum + balance
  window.document.title = overallBalance.toString()

  return (
    <div>
      <div>{address}:</div>
      <div>{balance}</div>
      {validatorBalances.map(validator => (
        <div key={validator[0]}>
          {validator[0]}: {validator[1]} ({validator[1] - validator[2]}){' '}
          {validator[3] * 100}%
        </div>
      ))}
      <div>Total Earnings: {totalEarnings}</div>
      <div>{formaterEUR.format(totalEarnings * priceEUR)}</div>
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
