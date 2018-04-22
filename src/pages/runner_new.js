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
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import {
    ArrowBack,
    Close,
    Check
} from 'material-ui-icons';

const request = require('superagent');
const config = require('../config')
import fs from 'fs';

import img1 from '../imgs/1.png'

const styles = theme => ({
    root: {
        // textAlign: 'center',
        // paddingTop: theme.spacing.unit * 20,
        flexGrow: 1,
        height: '100%'
    },
    appbar: {
        paddingTop: theme.spacing.unit * 2,
        background: '#306E9C'
    },
    hi: {
        paddingBottom: 0,
        marginBottom: -35
    },
    title: {
        paddingBottom: '1.2rem',
        fontSize: '1.8rem'
    },
    body: {
        paddingTop: '1.5rem',
        paddingLeft: '1rem',
        padding: 10
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    items: {
        marginBottom: '0.8rem',
        height: '4rem',
        width: 'auto',
        background: "#000"
    },
    list_bg: {
        background: '#C4C4C4',
        height: 120,
        width: 'full'
    },
    bigAvatar: {
        width: 80,
        height: 80,
        marginLeft: 'auto',
        marginTop: -40,
        marginRight: 'auto',
    },
    username: {
        fontSize: 14,
        marginTop: 20,
    },
    sidelist: {
        marginLeft: 'auto',
        marginTop: 60,
        marginRight: 'auto',
    },
    papers: {
        padding: 10,
        marginBottom: 15
    },
    continue: {
        backgroundColor: '#2D9CDB',
        width: 20,
        height: 20,
        float: 'left',
        marginTop: 2
    },
    complish: {
        backgroundColor: '#75BA80',
        width: 20,
        height: 20,
        float: 'left',
        marginTop: 2
    }
});

var map, marker;

class RunnerNew extends React.Component {
    state = {
        open: false,
        left: false,
        login: false,
        value: 0,
        user: {},
        data:{},
        time:'',
        f: ['From', 'Address', 'Address', 'Address', 'Address', 'Address', 'From'],
        t: ['To', 'Classification', '', '', '', '', 'Start Time'] 
    };

    tick() {
        // console.log('tick+1')
    }

    componentDidMount(){
        
        // this.interval = setInterval(() => this.tick(), 1000);
        request.post(config.server + '/order/maps').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err
            this.setState({ data: res.body.id[0] })
            if (res.body.id[0].state) {
                request.post(config.server + '/order/getrunner').send({ id: res.body.id[0].rid }).end((err, res) => {
                    if (err) throw err
                    this.setState({ runner: res.body.id[0] })
                })
            } else {
                console.log('state b')
            }
            console.log(res.body.id[0].from)
            request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(res.body.id[0].from) + '&key=AIzaSyDw-HZToDeHqOdXOBgBz6YK78jquB_55gA').end((err, res) => {
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

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('userdata'))
        })
    }

    componentWillUnmount() {
        map, marker = null;
        clearInterval(this.interval);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root} style={{ background: '#E5E5E5' }}>
                <AppBar
                    position="static"
                    className={classes.appbar}
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
                                New order coming!
                            </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.body}>
                    <div id="map" style={{ height: 200, width: '100%' }} >
                    </div>
                    {this.state.data === undefined ? '':(
                            <Paper className={classes.papers} elevation={4}>
                                <Avatar className={classes.continue} style={{ backgroundColor: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                </Avatar>
                                <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                                    On Process Order
                            </Typography>

                                <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                    {new Date(parseInt(this.state.data.time)).Format("yyyy.MM.dd - hh:mm")}
                                </Typography>
                                <Typography component="p" style={{ fontSize: 15, color: '#888888', marginLeft: 7 }}>
                                    {this.state.f[this.state.data.class]}: {this.state.data.from}
                                </Typography>
                                <Typography variant="headline" component="h3" style={{ color: '#888888', marginLeft: 7, marginBottom: 10, fontSize: 15 }}>
                                    {this.state.t[this.state.data.class]}:  {this.state.data.to}
                                </Typography>
                                <Typography variant="headline" component="h3" style={{ color: '#F2994A', marginLeft: 7, marginBottom: 10, fontSize: 20 }}>
                                    ${this.state.data.cast}
                                </Typography>
                            </Paper>
                    )}
                </div>
                <Button variant="fab" color="primary" aria-label="add" style={{ background: '#6FCF97', position: 'fixed', bottom: 80, right: 20 }} onClick={()=>{
                    window.list.push(parseInt(this.props.match.params.id))
                    this.props.history.goBack()}}>
                    <Close />
                </Button>
                <Button variant="fab" color="primary" aria-label="add" style={{ background: '#6FCF97', position: 'fixed', bottom: 80, left: 20 }} >
                    <Check />
                </Button>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    style={{width:'100%',position:'fixed',bottom:0}}
                >
                    <BottomNavigationAction label="Runner" onClick={(e)=>{this.props.history.push('/runner')}}/>
                    <BottomNavigationAction label="Order" onClick={(e)=>{this.props.history.push('/runner_order')}}/>
                    <BottomNavigationAction label="Me" onClick={(e) => { this.props.history.push('/') }}/>
                </BottomNavigation>
            </div>
        );
    }
}

RunnerNew.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(RunnerNew));
