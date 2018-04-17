import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {
    ArrowBack,
    Close
} from 'material-ui-icons';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';

const request = require('superagent');
const config = require('../config')

const styles = theme => ({
    root: {
        // textAlign: 'center',
        // paddingTop: theme.spacing.unit * 20,
        flexGrow: 1,
        height: '100%'
    },
    appbar: {
        paddingTop: theme.spacing.unit,
        background: '#306E9C',
        position:'fixed'
    },
});

var map,marker;

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Driver extends React.Component {

    state = {
        open: false,
        left: false,
        uluru: { lat: 35.660815, lng: 139.860196 },
        data:{},
        runner:{},
        f: ['From', 'Address', 'Address', 'Address', 'Address', 'Address','From'],
        t: ['To', 'Classification', '', '', '', '', 'Start Time'] 
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCancel = () => {
        request.post(config.server + '/order/cancel').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err
            this.props.history.push('/')
        })
    };

    tick() {
        console.log('tick+1')
        request.post(config.server + '/order/maps').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err
            this.setState({ data: res.body.id[0] })
            if (res.body.id[0].state == 1) {
                request.post(config.server + '/order/getrunner').send({ id: res.body.id[0].rid }).end((err, res) => {
                    if (err) throw err
                    this.setState({ runner: res.body.id[0] })
                })
            } else if (res.body.id[0].state == 2){
                this.props.history.push('/order')
            }else{
                console.log('waitting')
            }
        });
    }

    componentDidMount() {
        
        // console.log('/order/$this.props.match.params.id')
        request.post(config.server+'/order/maps').send({id:this.props.match.params.id}).end((err,res)=>{
            if (err) throw err
            this.setState({ data: res.body.id[0]})
            if (res.body.id[0].state) {
                request.post(config.server + '/order/getrunner').send({ id: res.body.id[0].rid }).end((err, res) => {
                    if (err) throw err
                    this.setState({ runner: res.body.id[0] })
                })
            } else {
                console.log('state b')
            } 
            console.log(res.body.id[0].from)
            request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(res.body.id[0].from) +'&key=AIzaSyDw-HZToDeHqOdXOBgBz6YK78jquB_55gA').end((err,res)=>{
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 19,
                    center: res.body.status == "ZERO_RESULTS" ? this.state.uluru : res.body.results[0].geometry.location,
                    mapTypeId: 'roadmap',
                    zoomControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                });    
            
            marker = new google.maps.Marker({
                position: res.body.status == "ZERO_RESULTS" ? this.state.uluru : res.body.results[0].geometry.location,
                    draggable: true,
                    map: map
                });
            })
            this.interval = setInterval(() => this.tick(), 10000);
        })
    }

    componentWillUnmount(){
        map,marker = null;
        clearInterval(this.interval);
    }

    _handleTouch = () =>{
        // console.log(map.getCenter().toString())
        console.log(marker.getPosition().toString())
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root} style={{}}>
                {/* <button onClick={this._handleTouch} >a </button> */}
                <AppBar
                    position="static"
                    className={classes.appbar}
                >
                    <Toolbar>
                        <IconButton onClick={this.handleClickOpen} style={{ color: "#FFF" }} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Close />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Order Ditail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper elevation={5} style={{ marginBottom: 20, position: 'fixed', bottom: 20, left: '5%',width:'90%',zIndex:99}}>
                    <ListItem button>
                        <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                            {this.state.f[this.state.data.class]}
                        </Typography>
                        <div style={{ float: 'right', width: '100%', right: 0 }}>
                            <Typography variant="subheading" align='right'  component="h3" style={{ float: 'right', width: '100%', right: 0 }}>
                                {this.state.data.from}
                            </Typography>
                        </div>
                    </ListItem>
                    <Divider />
                    {this.state.t[this.state.data.class] !== '' ? <ListItem button>
                        <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                            {this.state.t[this.state.data.class]}
                        </Typography>
                        <div style={{ float: 'right', width: '75%', right: 0 }}>
                            <Typography variant="subheading" align='right' component="h3" style={{ float: 'right', width: '100%', right: 0 }}>
                                {this.state.data.to}
                            </Typography>
                        </div>
                    </ListItem>:''}
                    <Divider />
                    <a href={this.state.data.state ? 'tel:' + this.state.runner.phonenumber : 'javascript:;'}>
                    <ListItem button>
                        {this.state.data.state ? <Avatar alt="Remy Sharp" src={this.state.runner.avatar} style={{ float: 'left', marginRight: 15 }} /> : ''}
                        <Typography variant="subheading" align='center' component="h3" style={{ marginRight: 10 }} >
                            {this.state.data.state ? <Typography component="p" style={{ fontSize: 20}}>{this.state.runner.name}</Typography>:''}
                            {this.state.data.state ? <Typography component="p" style={{ fontSize: 14, color: '#888888', marginLeft: 7 }}>{this.state.runner.phonenumber}</Typography>:'Waiting Runner'}
                        </Typography>
                    </ListItem>
                    </a>
                </Paper>
                <div id="map" style={{height:'100%',width:'100%'}}>
                    
                </div>
                <Dialog
                    open={this.state.open}
                    transition={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Cancel this order?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Not
                        </Button>
                        <Button onClick={this.handleCancel} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Driver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Driver));

