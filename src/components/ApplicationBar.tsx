import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'

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
      marginLeft: 'auto'
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
          {address && address !== 'change' ? (
            <Button
              variant='contained'
              color='default'
              className={classes.toolbarButtons}
              aria-label='address'
              onClick={() => setAddress('change')}
            >
              {address}
            </Button>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
