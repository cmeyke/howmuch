import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { ethers } from 'ethers'

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
  connectWallet(): Promise<void>
}

export const checkAndSetAddress = (
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  if (ethers.utils.isAddress(address))
    setAddress(ethers.utils.getAddress(address))
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4),
    },
    margin: {
      margin: theme.spacing(2),
    },
    display: {
      display: 'flex',
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
  const [inputAddress, setInputAddress] = useState('')
  const [noProvider, setNoProvider] = useState(false)

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    event => {
      setInputAddress(event.target.value)
    }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter' && inputAddress)
      checkAndSetAddress(inputAddress, setAddress)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={4}>
        <Grid key={1}>
          <Typography variant="h6" className={classes.margin}>
            View your ETH1 and ETH2 assets and staking rewards in one simple
            interface.
          </Typography>
        </Grid>
        <Grid key={2} item>
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
                onClick={
                  (window as any).ethereum
                    ? connectWallet
                    : () => setNoProvider(true)
                }
              >
                Connect wallet
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid key={3} container justify="center" item>
          {noProvider && (
            <Alert
              severity="warning"
              onClose={() => {
                setNoProvider(false)
              }}
            >
              In order to connect your wallet Metamask needs to be installed.
            </Alert>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
