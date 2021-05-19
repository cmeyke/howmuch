import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
)

type UserInputParameterType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
  reload: number
  setReload: React.Dispatch<React.SetStateAction<number>>
}

export const UserInput = ({
  address,
  setAddress,
  reload,
  setReload
}: UserInputParameterType) => {
  const classes = useStyles()

  if (address === 'change') return <div></div>
  return (
    <div className={classes.root}>
      {address ? (
        <Grid container justify='center' spacing={1}>
          <Grid key={1} item>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setReload(reload + 1)}
            >
              Reload
            </Button>
          </Grid>
          <Grid key={2} item>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setAddress('change')}
            >
              Change address
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  )
}
