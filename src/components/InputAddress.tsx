import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Web3 from "web3"

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
  connectWallet(): Promise<void>
}

export const checkAndSetAddress = (
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  if (Web3.utils.isAddress(address))
    setAddress(Web3.utils.toChecksumAddress(address))
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
    display: {
      display: "flex",
    },
    borderRadius: {
      borderRadius: 16,
    },
  })
)

export const InputAddress = ({
  setAddress,
  connectWallet,
}: InputAddressParameterType) => {
  const [inputAddress, setInputAddress] = useState("")

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputAddress(event.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && inputAddress)
      checkAndSetAddress(inputAddress, setAddress)
  }

  const classes = useStyles()

  return (
    <div className={classes.margin}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid key={1} item xs={5}>
          <TextField
            size="small"
            autoFocus
            fullWidth
            autoComplete="off"
            id="address"
            label="ETH1 Address"
            variant="outlined"
            value={inputAddress}
            onChange={handleAddressChange}
            onKeyDown={handleKeyDown}
          />
        </Grid>
        <Grid key={2} item className={classes.display}>
          <Button
            className={classes.borderRadius}
            variant="contained"
            onClick={() => {
              if (inputAddress) checkAndSetAddress(inputAddress, setAddress)
            }}
          >
            Go
          </Button>
        </Grid>
        <Grid key={3} item>
          <Typography>or</Typography>
        </Grid>
        <Grid key={4} item className={classes.display}>
          <Button
            className={classes.borderRadius}
            variant="contained"
            onClick={connectWallet}
          >
            Connect wallet
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
