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
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'


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

const Index = (props) => (
    <Paper className={classes.papers} elevation={4}>
        
    </Paper>
)

class RunnerIndex extends React.Component {
    state = {
        open: false,
        left: false,
        login: false,
        value: 0,
        user: {},
        data:{}
    };

    tick() {
        // console.log('tick+1')
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
        request.post(config.server + '/runner').send({ id: JSON.parse(localStorage.getItem('userdata')).ID }).end((err, res) => {
            if (err) throw err
            this.setState({ data: res.body.id[0] })
            console.log(res.body.id[0])
        });
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('userdata'))
        })
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
                                Ready to Go?
                            </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.body}>
                    <Paper className={classes.papers} elevation={4}>
                        {Date(Date.now()).toString("YYYY-MM-DD")}
                    </Paper>
                    <div className={classes.items} >
                    </div>
                    {this.state.data === [] ? '' : <Paper><div style={{ float: 'right', marginTop: 11, }}>
                        <Typography component="h3" style={{ fontSize: 22, color: '#2D9CDB' }}>
                            {this.state.data.state == 0 ? "Ditail" : '$' + this.state.data.cast}
                        </Typography>
                        <Typography component="h3" align='right' style={{ fontSize: 12, color: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                            {this.state.data.state == 0 ? "Process" : "Finished"}
                        </Typography>
                    </div>
                        <Avatar className={classes.continue} style={{ backgroundColor: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                        </Avatar>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                            {config.order[this.state.data.class]}
                        </Typography>

                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                            {Date(this.state.data.time).toString("YYYY-MM-DD")}
                        </Typography>
                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                            {this.state.data.from}
                        </Typography>
                        <div id="map" style={{ height: 150 }}></div>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 15 }}>
                            To
                        </Typography>
                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 25, width: 200 }}>
                            {this.state.data.to}
                        </Typography></Paper>}
                </div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    style={{width:'100%',position:'fixed',bottom:0}}
                >
                    <BottomNavigationAction label="Runner" />
                    <BottomNavigationAction label="Order" />
                    <BottomNavigationAction label="Me" />
                </BottomNavigation>
            </div>
        );
    }
}

RunnerIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(RunnerIndex));
