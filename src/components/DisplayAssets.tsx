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

  const formaterETH = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  })

  const formaterPercent = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2
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
      <div>{formaterETH.format(balance)}</div>
      {validatorBalances
        .sort((a, b) => a[0] - b[0])
        .map(validator => (
          <div key={validator[0]}>
            {validator[0]}: {formaterETH.format(validator[1])} (
            {formaterETH.format(validator[1] - validator[2])}){' '}
            {formaterPercent.format(validator[3])}
          </div>
        ))}
      <div>Total Earnings: {formaterETH.format(totalEarnings)}</div>
      <div>{formaterEUR.format(totalEarnings * priceEUR)}</div>
      <div>Sum validators: {formaterETH.format(validatorBalancesSum)}</div>
      <div>Sum totals: {formaterETH.format(overallBalance)}</div>
      <div>
        {formaterEUR.format(overallBalance * priceEUR)} (
        {formaterEUR.format(priceEUR)})
      </div>
    </div>
  )
}

export default DisplayAssets
