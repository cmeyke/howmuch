import React, { useState, MouseEvent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Home from '@material-ui/icons/Home'
import Brightness7 from '@material-ui/icons/Brightness7'
import Brightness4 from '@material-ui/icons/Brightness4'
import { ethers } from 'ethers'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      minHeight: '10px',
    },
    toolbarButtons: {
      borderRadius: 16,
      textTransform: 'none',
    },
    menuItem: {
      fontSize: window.screen.availWidth >= 1440 ? 'small' : 'fontSize',
    },
    currency: {
      borderRadius: 16,
      textTransform: 'none',
      marginRight: '16px',
    },
  })
)

type ApplicationBarType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
  fiat: string
  setFiat: React.Dispatch<React.SetStateAction<string>>
  dark: boolean
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApplicationBar({
  address,
  setAddress,
  fiat,
  setFiat,
  dark,
  setDark,
}: ApplicationBarType) {
  const [addrAnchorEl, setAddrAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickAddr = (event: MouseEvent<HTMLButtonElement>) => {
    setAddrAnchorEl(event.currentTarget)
  }

  const handleCloseAddr = () => {
    setAddrAnchorEl(null)
  }

  const handleCloseCopy = () => {
    navigator.clipboard.writeText(address)
    setAddrAnchorEl(null)
  }

  const handleCloseChange = () => {
    setAddress('')
    localStorage.removeItem('address')
    setAddrAnchorEl(null)
  }

  const [fiatAnchorEl, setFiatAnchorEl] = useState<null | HTMLElement>(null)

  const handleFiatClick = (event: MouseEvent<HTMLButtonElement>) => {
    setFiatAnchorEl(event.currentTarget)
  }

  const handleFiatClose = () => {
    setFiatAnchorEl(null)
  }

  const handleFiatUSD = () => {
    setFiat('USD')
    setFiatAnchorEl(null)
  }

  const handleFiatEUR = () => {
    setFiat('EUR')
    setFiatAnchorEl(null)
  }

  const classes = useStyles()

  const displayAddress = ethers.utils.isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`
    : ''

  const toogleTheme = () => {
    setDark(!dark)
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Home/Reload">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => window.location.reload()}
          >
            <Home />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle light/dark theme">
          <IconButton color="inherit" onClick={toogleTheme}>
            {dark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        <div
          style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <Tooltip title="Change currency">
            <Button
              variant="contained"
              color="default"
              className={classes.currency}
              aria-label="currency"
              onClick={handleFiatClick}
            >
              {fiat}
            </Button>
          </Tooltip>
          <Menu
            id="currency-menu"
            anchorEl={fiatAnchorEl}
            keepMounted
            open={Boolean(fiatAnchorEl)}
            onClose={handleFiatClose}
          >
            <MenuItem className={classes.menuItem} onClick={handleFiatEUR}>
              EUR
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleFiatUSD}>
              USD
            </MenuItem>
          </Menu>
          {displayAddress ? (
            <React.Fragment>
              <Tooltip title="Copy/Change">
                <Button
                  variant="contained"
                  color="default"
                  className={classes.toolbarButtons}
                  aria-label="address"
                  onClick={handleClickAddr}
                >
                  {displayAddress}
                </Button>
              </Tooltip>
              <Menu
                id="address-menu"
                anchorEl={addrAnchorEl}
                keepMounted
                open={Boolean(addrAnchorEl)}
                onClose={handleCloseAddr}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={handleCloseCopy}
                >
                  Copy
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={handleCloseChange}
                >
                  Change
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
