import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  cell: {
    width: 110,
  },
})

type DisplayAssetsParameterType = {
  address: string
  priceEUR: number
  balance: number
  validatorBalances: [number, number, number, number][]
}

function DisplayAssets({
  address,
  priceEUR,
  balance,
  validatorBalances,
}: DisplayAssetsParameterType) {
  const classes = useStyles()

  if (!address) {
    return <div></div>
  }

  if (address === 'change') return <div></div>

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
  }).format

  const formaterETH = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format

  const formaterPercent = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format

  let totalEarnings = 0
  let validatorBalancesSum = 0
  validatorBalances.forEach(validator => {
    totalEarnings += validator[1] - validator[2]
    validatorBalancesSum += validator[1]
  })
  const overallBalance = validatorBalancesSum + balance

  function createDataValidators(
    index: number,
    eth: string,
    earnings: string,
    efficiency: string
  ) {
    return { index, eth, earnings, efficiency }
  }

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

  function displayTableRow(
    col1: string,
    col2: string,
    col3: string,
    col4: string,
    key: string
  ) {
    return (
      <TableRow key={key}>
        <TableCell align="left" className={classes.cell}>
          {col1}
        </TableCell>
        <TableCell align="left" className={classes.cell}>
          {col2}
        </TableCell>
        <TableCell align="left" className={classes.cell}>
          {col3}
        </TableCell>
        <TableCell align="left" className={classes.cell}>
          {col4}
        </TableCell>
      </TableRow>
    )
  }

  function displayTableCategory(col1: string) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>{col1}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    )
  }

  function displayTableMainCategory(description: string, value: string) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="caption">{description}</Typography>
              <Typography variant="h5">{value}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    )
  }

  return (
    <TableContainer component={Paper}>
      {displayTableMainCategory(
        'Net Worth',
        formaterEUR(overallBalance * priceEUR)
      )}
      {displayTableCategory(`Wallet - ${formaterEUR(balance * priceEUR)}`)}
      <Table>
        <TableHead>
          {displayTableRow('Asset', 'Balance', 'Price', 'Value', '1')}
        </TableHead>
        <TableBody>
          {displayTableRow(
            'ETH',
            formaterETH(balance),
            formaterEUR(priceEUR),
            formaterEUR(balance * priceEUR),
            '1'
          )}
        </TableBody>
      </Table>
      {displayTableCategory(
        `Staked - ${formaterEUR(validatorBalancesSum * priceEUR)}`
      )}
      <Table>
        <TableHead>
          {displayTableRow('Asset', 'Balance', 'Price', 'Value', '1')}
        </TableHead>
        <TableBody>
          {displayTableRow(
            'ETH2 Deposit',
            formaterETH(validatorBalancesSum),
            formaterEUR(priceEUR),
            formaterEUR(validatorBalancesSum * priceEUR),
            '1'
          )}
        </TableBody>
      </Table>
      {displayTableCategory(`Earnings - ${formaterEUR(totalEarnings * priceEUR)}
      `)}
      <Table>
        <TableHead>
          {displayTableRow('Asset', 'Balance', 'Price', 'Value', '1')}
        </TableHead>
        <TableBody>
          {displayTableRow(
            'ETH2 Deposit',
            formaterETH(totalEarnings),
            formaterEUR(priceEUR),
            formaterEUR(totalEarnings * priceEUR),
            '1'
          )}
        </TableBody>
      </Table>
      {displayTableCategory(`Validators - ${validatorRows.length}`)}
      <Table>
        <TableHead>
          {displayTableRow(
            'Validator',
            'Balance',
            'Earnings',
            'Efficiency',
            '1'
          )}
        </TableHead>
        <TableBody>
          {validatorRows.map(row =>
            displayTableRow(
              row.index.toString(),
              row.eth,
              row.earnings,
              row.efficiency,
              row.index.toString()
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DisplayAssets
