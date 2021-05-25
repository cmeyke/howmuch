import React, { useState, MouseEvent } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import Home from "@material-ui/icons/Home"
import Brightness7 from "@material-ui/icons/Brightness7"
import Brightness4 from "@material-ui/icons/Brightness4"
import Web3 from "web3"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      minHeight: "10px",
    },
    toolbarButtons: {
      borderRadius: 16,
      marginLeft: "auto",
      textTransform: "none",
    },
    menuItem: {
      fontSize: window.screen.availWidth >= 1440 ? "small" : "fontSize",
    },
  })
)

type ApplicationBarType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
  dark: boolean
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApplicationBar({
  address,
  setAddress,
  dark,
  setDark,
}: ApplicationBarType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseCopy = () => {
    navigator.clipboard.writeText(address)
    setAnchorEl(null)
  }

  const handleCloseChange = () => {
    setAddress("change")
    setAnchorEl(null)
  }

  const classes = useStyles()
  const displayAddress = Web3.utils.isAddress(address)
    ? `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
      )}`
    : ""

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
        {displayAddress ? (
          <React.Fragment>
            <Tooltip title="Copy/Change">
              <Button
                variant="contained"
                color="default"
                className={classes.toolbarButtons}
                aria-label="address"
                onClick={handleClick}
              >
                {displayAddress}
              </Button>
            </Tooltip>
            <Menu
              id="address-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem className={classes.menuItem} onClick={handleCloseCopy}>
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
      </Toolbar>
    </AppBar>
  )
}
