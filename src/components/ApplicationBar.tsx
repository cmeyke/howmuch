import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    toolbar: {
      minHeight: '10px'
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
          <Typography variant='h6' className={classes.title}>
            {address !== 'change' ? address : ''}
          </Typography>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='wallet'
            onClick={() => setAddress('change')}
          >
            <AccountBalanceIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
