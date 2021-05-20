import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import { ethers } from 'ethers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    toolbar: {
      minHeight: '10px'
    },
    toolbarButtons: {
      borderRadius: 16,
      marginLeft: 'auto',
      textTransform: 'none'
    }
  })
)

type ApplicationBarType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export default function ApplicationBar ({
  address,
  setAddress
}: ApplicationBarType) {
  const classes = useStyles()
  const displayAddress = ethers.utils.isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`
    : ''

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='home'
            onClick={() => window.location.reload()}
          >
            <Home />
          </IconButton>
          {displayAddress ? (
            <Button
              variant='contained'
              color='default'
              className={classes.toolbarButtons}
              aria-label='address'
              onClick={() => setAddress('change')}
            >
              {displayAddress}
            </Button>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
