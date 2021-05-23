import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Home from '@material-ui/icons/Home'
import Brightness7 from '@material-ui/icons/Brightness7'
import Brightness4 from '@material-ui/icons/Brightness4'
import Web3 from 'web3'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  dark: boolean
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApplicationBar ({
  address,
  setAddress,
  dark,
  setDark
}: ApplicationBarType) {
  const classes = useStyles()
  const displayAddress = Web3.utils.isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`
    : ''

  const toogleTheme = () => {
    setDark(!dark)
  }

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Tooltip title='Reload'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='home'
            onClick={() => window.location.reload()}
          >
            <Home />
          </IconButton>
        </Tooltip>
        <Tooltip title='Toggle light/dark theme'>
          <IconButton color='inherit' onClick={toogleTheme}>
            {dark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
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
          <React.Fragment></React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}
