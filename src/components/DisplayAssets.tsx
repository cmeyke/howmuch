import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

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

  if (address === "change") return <div></div>

  const formaterEUR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format

  const formaterETH = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format

  const formaterPercent = new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  }).format

  let totalEarnings = 0
  let validatorBalancesSum = 0
  validatorBalances.forEach((validator) => {
    totalEarnings += validator[1] - validator[2]
    validatorBalancesSum += validator[1]
  })
  const overallBalance = validatorBalancesSum + balance
  // window.document.title = overallBalance.toString()

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
    .map((validator) =>
      createDataValidators(
        validator[0],
        formaterETH(validator[1]),
        formaterETH(validator[1] - validator[2]),
        formaterPercent(validator[3])
      )
    )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="caption">Net Worth</Typography>
              <Typography variant="h5">
                {formaterEUR(overallBalance * priceEUR)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>
                Wallet - {formaterEUR(balance * priceEUR)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.cell}>
              Asset
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Balance
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Price
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.cell}>
              ETH
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterETH(balance)}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterEUR(priceEUR)}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterEUR(balance * priceEUR)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>
                Staked - {formaterEUR(validatorBalancesSum * priceEUR)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.cell}>
              Asset
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Balance
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Price
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.cell}>
              ETH in Eth2 Deposit
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterETH(validatorBalancesSum)}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterEUR(priceEUR)}
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              {formaterEUR(validatorBalancesSum * priceEUR)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>
                Earnings - {formaterEUR(totalEarnings * priceEUR)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" className={classes.cell}>
              Validator
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Balance
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Earnings
            </TableCell>
            <TableCell align="left" className={classes.cell}>
              Efficiency
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {validatorRows.map((row) => (
            <TableRow key={row.index}>
              <TableCell align="left" className={classes.cell}>
                {row.index}
              </TableCell>
              <TableCell align="left" className={classes.cell}>
                {row.eth}
              </TableCell>
              <TableCell align="left" className={classes.cell}>
                {row.earnings}
              </TableCell>
              <TableCell align="left" className={classes.cell}>
                {row.efficiency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DisplayAssets
