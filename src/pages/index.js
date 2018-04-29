import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';

const request = require('superagent');
const config = require('../config')

import fs from 'fs';

import img1 from '../imgs/1.png'
import orderIcon from '../icons/order.svg'
import accountIcon from '../icons/account.svg'
import runnerIcon from '../icons/run.svg'
import aboutIcon from '../icons/about.svg'
import settingIcon from '../icons/setting.svg'
import { ListItemIcon } from 'material-ui';

var f = localStorage.getItem('f')

const styles = theme => ({
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20,
    flexGrow: 1,
    height: '100%',
    background: '#E5E5E5'
  },
  appbar:{
    paddingTop: theme.spacing.unit * 2,
    background: '#306E9C'
  },
  hi: {
    paddingBottom: 0,
    marginBottom: -35
  },
  title:{
    paddingBottom: '1.2rem',
    fontSize: '1.8rem'
  },
  body:{
    paddingTop: '1.5rem',
    paddingLeft: '1rem'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  items: {
    marginRight: '1rem',
    marginBottom: '0.8rem',
    height: '7rem',
    width: 'auto',
    background : "#000",
    backgroundRepeat:'no-repeat'
  },
  items_text:{
    fontSize: '1.4rem',
    marginRight:'1rem',
    paddingTop: "4.5rem",
    color: '#FFF',
  },
  list_bg:{
    background:'#C4C4C4',
    height:120,
    width:'full'
  },
  bigAvatar: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginTop: -40,
    marginRight: 'auto',
  },
  username: {
    fontSize:14,
    marginTop:20,
  },
  sidelist: {
    marginLeft: 'auto',
    marginTop: 60,
    marginRight: 'auto',
  },
});


class Index extends React.Component {
  state = {
    open: false,
    left: false,
    login: false,
    runner:false,
    user:{}
  };

  componentWillMount() {
    if (!f) {
      this.props.history.push('/first')
    }else{
      this.setState({
        user: JSON.parse(localStorage.getItem('userdata'))
      })
      request.post(config.server + '/users/update').send({ id: JSON.parse(localStorage.getItem('userdata')).ID }).end((err, res) => {
        if (err) throw err;
        // console.log(res)
        this.setState({
          runner: res.body.id[0].runner
        })
      })
    }
    
  }

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

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <div className={classes.list_bg}></div>
        <Avatar
          alt="ICON"
          src={this.state.user.avatar}
          className={classes.bigAvatar}
        />
        <Typography className={classes.username} color="inherit" align='center'>
          {this.state.user.name}
        </Typography>
        <List component="nav" className={classes.sidelist}>
          <Link to="/order"><ListItem button >
            <ListItemIcon>
              <img src={orderIcon} style={{ marginLeft: 50 }}/>
            </ListItemIcon><ListItemText primary="Order" align='left' style={{}}/>
          </ListItem></Link>
          <Link to="/accinfo"><ListItem button >
            <ListItemIcon>
              <img src={accountIcon} style={{ marginLeft: 50 }}/>
            </ListItemIcon>
            <ListItemText primary="Account" align='left'/>
          </ListItem></Link>
          <Link to="/setting"><ListItem button >
            <ListItemIcon>
              <img src={settingIcon} style={{ marginLeft: 50 }}/>
            </ListItemIcon>
            <ListItemText primary="Setting" align='left'/>
          </ListItem></Link>
          {this.state.runner ? <Link to='/runner'><ListItem button >
            <ListItemIcon>
              <img src={runnerIcon} style={{ marginLeft: 50 }}/>
            </ListItemIcon>
            <ListItemText primary="Runner" align='left' />
          </ListItem></Link> : ''}
          <Link to="/about"><ListItem button >
            <ListItemIcon>
              <img src={aboutIcon} style={{ marginLeft: 50 }}/>
            </ListItemIcon>
            <ListItemText primary="About" align='left'/>
          </ListItem></Link>
        </List>
      </div>
    );

    return (
      <div className={classes.root} style={{ background: '#E5E5E5' }}>
        <AppBar
          position="static"
          className={classes.appbar}
            onClick={this.toggleDrawer('left', true)}
          >
          <Toolbar>
            <Typography className={classes.hi} color="inherit">
              Hi {this.state.user.name}!
            </Typography>
          </Toolbar>
          <Toolbar>
            <Typography
              color="inherit" 
              className={classes.title} >
              What's your need today?
            </Typography>
          </Toolbar>
        </AppBar>
        
        <div className={classes.body}>
          <Typography variant="subheading" gutterBottom>
            Car Services
          </Typography>
          <Link to="/preorder/dh">
            <div className={classes.items} style={{ background: `url(${img1})`, backgroundSize:'cover' }}>
              <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
                <strong>Driver</strong> for Hire
            </Typography>
            </div>
          </Link>
          <Link to="/preorder/dp">
            <div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
              <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
              <strong>Driver</strong> Pickup
            </Typography>
          </div>
          </Link>
          <Link to='/preorder_cw'><div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
              <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
                <strong>Car</strong> Wash
            </Typography>
            </div></Link>
          <Typography variant="subheading" gutterBottom>
              Delivery Services
          </Typography>
          <Link to='/preorder_gd'><div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
              <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
                <strong>Grocery </strong>  Delivery
            </Typography>
            </div></Link>
          <Link to='/preorder_fd'><div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
              <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
                <strong>Food</strong> Delivery
            </Typography>
            </div></Link>
          <Typography variant="subheading" gutterBottom>
            Another Services
          </Typography>
          <Link to='/preorder_cc'><div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
            <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
              <strong>Child </strong>  Care
            </Typography>
          </div></Link>
          <Link to='/preorder_cus'><div className={classes.items} style={{ background: `url(${img1})`, backgroundSize: 'cover' }}>
            <Typography className={classes.items_text} align='right' color="inherit" gutterBottom>
              <strong>Custom</strong>
            </Typography>
          </div></Link>
        </div>
        



        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
