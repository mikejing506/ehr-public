import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    // textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  // flexGrow: 1
  },
  title: {
    fontSize: 16 * 1.2,
    marginTop: 50
  },
  button: {
    marginTop: 30,
    width: '90%',
    marginLeft: '5%',
    borderRadius: '1.5rem'
  }
})

class First extends React.Component {

  componentWillMount () {}

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div style={{height: 100,width: 100,marginLeft: 'auto',marginRight: 'auto',background: '#2D9CDB',borderRadius: 10}}>
        </div>
        <Typography className={classes.title} color='inherit' align='center'>
          The Hampons Runner
        </Typography>
        <div style={{alignSelf: 'space-between'}}>
          <Link to='/login'>
          <Button
            variant='raised'
            color='primary'
            className={classes.button}
            style={{ background: '#5E94DB',marginTop:100 }}>
            Sign Up
          </Button>
          </Link>
          <Link to='/reg'>
          <Button
            color='primary'
            variant='raised'
            className={classes.button}
            style={{ color: '#5E94DB',background: '#FFF'}}>
            Sign In
          </Button>
          </Link>
        </div>
      </div>
    )
  }
}

First.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(First))
