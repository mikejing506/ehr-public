import React from 'react';
import { Link, withRouter  } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
const request = require('superagent');
const config = require('../config')
import {
  ArrowBack
} from 'material-ui-icons';

const styles = theme => ({
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20,
    flexGrow: 1,
    height:'100%'
  },
  appbar:{
    paddingTop: theme.spacing.unit ,
    background: '#306E9C'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -10,
    marginRight: 10,
  },
  list_bg: {
    background: '#C4C4C4',
    height: 100,
    width: 'full'
  },
  textField: {
    marginLeft: '10%',
    marginRight: 'auto',
    marginTop:'1rem',
    width: '80%'
  },
  button: {
    marginTop: 30,
    width: '90%',
    marginLeft: '5%',
    borderRadius: '1.5rem',
  },
});


class Login extends React.Component {
  state = {
    open: false,
    left: false,
    username: '',
    password: ''
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  _handleUsername = (e) => {
    this.setState({
      username:e.target.value
    })
    console.log(e.target.value)
  }

  _handlePasswd = (e) => {
    this.setState({
      password:e.target.value
    })
  }

  _handleLogin = () => {
    console.log(config.server)
    if(!this.state.username){
      alert('Please input email')
    }else if(!this.state.password){
      alert('Please input password')
    }else{
      request
      .post(config.server+'/users/login')
      .send({email:this.state.username,password:this.state.password})
      .end((err,res)=>{
        if (err || res.body.err) {
          alert(res.body.err);
        }else{
          console.log(res);
          localStorage.setItem('f',true);
          localStorage.setItem('userdata', JSON.stringify(res.body[0]))
          window.location.href="/"
        }
      })
    }
    console.log(this.state.username);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          className={classes.appbar}
          >
          <Toolbar>
            <Link to="/" style={{ color: "#FFF" }}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography variant="title" color="inherit" className={classes.flex}>
            Account
          </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.list_bg}></div>
        <TextField
          id="email"
          label="Email"
          placeholder="Email"
          className={classes.textField}
          value={this.state.username}
          onChange={this._handleUsername}
        />
        <TextField
          id="passwd"
          label="Password"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          className={classes.textField}
          value={this.state.password}
          onChange={this._handlePasswd}
        />
        <Button variant="raised" color="primary" className={classes.button} style={{ background:'#5E94DB'}} onClick={this._handleLogin}>
          Sign In
      </Button>
      <Link to="/reg">
        <Button color="primary" className={classes.button} style={{ color: '#5E94DB' }}>
          Sign Up
      </Button>
      </Link>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withRoot(withStyles(styles)(Login));
export default withRouter(withRoot(withStyles(styles)(Login)));
