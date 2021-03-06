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
    ArrowBack
} from 'material-ui-icons';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

import positionIcon from "../icons/position.svg";
import pasIcon from "../icons/pass.svg";
import timeIcon from "../icons/time.svg";

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
        background: '#306E9C'
    },
    flex: {
        flex: 1,
    },
    panels: {
        margin: 20
    },
    papers: {
        padding: 10
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
    },
    button: {
        marginTop: 30,
        width: '90%',
        marginLeft: '5%',
        borderRadius: '1.5rem',
        marginBottom: 20, 
        position: 'fixed', 
        bottom: 20, 
        left: 0,
        flexDirection: 'column'
    },
});


class PreOrder extends React.Component {

    constructor(props){
        super(props)
    }

    state = {
        open: false,
        left: false,
        from:"",
        to:"",
        num:1,
        user:{}
    };

    _handleFrom = (e) =>{
        this.setState({
            from:e.target.value
        })
    }

    _handleTo = (e) => {
        this.setState({
            to: e.target.value
        })
    }

    _handleLogin = () =>{
        request
        .post(config.server+"/order/new")
            .send({ uid: this.state.user.ID, from: this.state.from, to: this.state.to, class: this.props.match.params.id === 'dh' ? (6) : (0),ex:this.state.num})
        .end((err,res)=>{
            if (err) throw err;
            this.props.history.push('/drive/'+res.body.id)
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('userdata'))
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} style={{ background: '#E5E5E5' }}>
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
                            Order Detail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    <Avatar className={classes.continue}>
                    </Avatar>
                    <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                        
                        {this.props.match.params.id === 'dh' ? "Driver for Hire" : "Driver Pickup"}
                    </Typography>
                    <Paper elevation={5} style={{marginBottom:20}}>
                        <ListItem button>
                            <Typography variant="subheading" component="h3" style={{marginRight:10}}>
                                <img src={positionIcon} style={{marginRight:5}}/>   From
                            </Typography>
                            <div style={{ float: 'right',width:'79%', right:0}}>
                                <TextField
                                    required
                                    id="required"
                                    className={classes.textField}
                                    style={{ float: 'right', width: '100%', right: 0 }}
                                    value={this.state.from}
                                    onChange={this._handleFrom}
                                />
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            {this.props.match.params.id === 'dh' ? 
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                                    <img src={timeIcon} style={{ marginRight: 5 }}/> Start Time
                            </Typography> : <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                                    <img src={positionIcon} style={{ marginRight: 5 }}/> To
                            </Typography>}
                            <div style={{ float: 'right', width: this.props.match.params.id === 'dh' ? "68%" : "85%", right: 0 }}>
                                <TextField
                                    required
                                    id="required"
                                    type={this.props.match.params.id === 'dh' ? "time" : "text"}
                                    className={classes.textField}
                                    style={{ float: 'right', width: '100%', right: 0 }}
                                    value={this.state.to}
                                    onChange={this._handleTo}
                                />
                            </div>
                        </ListItem>
                    </Paper>

                    <Paper elevation={5} style={{ marginBottom: 20 }}>
                        <ListItem button>
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                                <img src={pasIcon} style={{ marginRight: 5 }} /> Passenger Number
                            </Typography>
                            <div style={{ float: 'right', width: '50%', right: 0 }}>
                                <TextField
                                    id="number"
                                    required
                                    value={this.state.num}
                                    onChange={this.handleChange('num')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </ListItem>
                    </Paper>
                    <Paper elevation={5} style={{ marginBottom: 20 }}>
                        <Typography variant="title" component="h3" style={{ paddingTop: 15, textAlign: 'center', color:'#2F80ED' }} >
                            {this.props.match.params.id === 'dh'? "$40 per hour":'$'+this.state.num*15}
                        </Typography>
                        <Typography variant="subheading" component="h3" style={{ paddingBottom: 15, textAlign: 'center', color: '#AAAAAA' }} >
                            Estimated price
                        </Typography>
                    </Paper>
                    <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB', marginBottom: 20, position: 'fixed', bottom: 20, left: 0 }} onClick={this._handleLogin}>
                        Okay
                    </Button>
                </div>
                
            </div>
        );
    }
}

PreOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(PreOrder)));
