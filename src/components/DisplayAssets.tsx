import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    // minWidth: 650
  }
})

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
  const classes = useStyles()

  if (!address) {
    return <div></div>
  }

  if (address === 'change') return <div></div>

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR'
  }).format

  const formaterETH = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format

  const formaterPercent = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2
  }).format

  let totalEarnings = 0
  let validatorBalancesSum = 0
  validatorBalances.forEach(validator => {
    totalEarnings += validator[1] - validator[2]
    validatorBalancesSum += validator[1]
  })
  const overallBalance = validatorBalancesSum + balance
  window.document.title = overallBalance.toString()

  function createDataAssets (name: string, eth: string, fiat: string) {
    return { name, eth, fiat }
  }

  function createDataValidators (
    index: number,
    eth: string,
    earnings: string,
    efficiency: string
  ) {
    return { index, eth, earnings, efficiency }
  }

  const assetRows = [
    createDataAssets(
      'Net Worth',
      formaterETH(overallBalance),
      formaterEUR(overallBalance * priceEUR)
    ),
    createDataAssets(
      'Earnings',
      formaterETH(totalEarnings),
      formaterEUR(totalEarnings * priceEUR)
    ),
    createDataAssets(
      'Wallet',
      formaterETH(balance),
      formaterEUR(balance * priceEUR)
    ),
    createDataAssets(
      'Prove of Work',
      formaterETH(validatorBalancesSum),
      formaterEUR(validatorBalancesSum * priceEUR)
    )
  ]

  const validatorRows = validatorBalances
    .sort((a, b) => a[0] - b[0])
    .map(validator =>
      createDataValidators(
        validator[0],
        formaterETH(validator[1]),
        formaterETH(validator[1] - validator[2]),
        formaterPercent(validator[3])
      )
    )

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Price: {formaterEUR(priceEUR)}</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetRows.map(row => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='left'>{row.eth}</TableCell>
              <TableCell align='left'>{row.fiat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Validator</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Earnings</TableCell>
            <TableCell>Efficiency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {validatorRows.map(row => (
            <TableRow key={row.index}>
              <TableCell component='th' scope='row'>
                {row.index}
              </TableCell>
              <TableCell align='left'>{row.eth}</TableCell>
              <TableCell align='left'>{row.earnings}</TableCell>
              <TableCell align='left'>{row.efficiency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DisplayAssets
