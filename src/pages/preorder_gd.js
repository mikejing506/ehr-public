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
import noteIcon from '../icons/note.svg'

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


class PreOrderGD extends React.Component {

    constructor(props){
        super(props)
    }

    state = {
        open: false,
        left: false,
        from:"",
        to:"",
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
        .send({uid:this.state.user.ID,from:this.state.from,to:this.state.to,class:2})
        .end((err,res)=>{
            if (err) throw err;
            this.props.history.push('/drive/'+res.body.id)
        })
    }

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
                        Grocery Delivery
                    </Typography>
                    <Paper elevation={5} style={{marginBottom:20}}>
                        <ListItem button>
                            <Typography variant="subheading" component="h3" style={{marginRight:10}}>
                                <img src={positionIcon} style={{ marginRight: 5 }} />  Deliverty Address
                            </Typography>
                            <div style={{ float: 'right',width:'54%', right:0}}>
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
                    </Paper>
                        <Paper elevation={5} style={{ marginBottom: 20 }}>
                        <ListItem button>
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                                <img src={noteIcon} style={{ marginRight: 5 }} /> Request List
                                </Typography>
                            <div style={{ float: 'right', width: '65%', right: 0 }}>
                                <TextField
                                    required
                                    id="required"
                                    multiline
                                    className={classes.textField}
                                    style={{ float: 'right', width: '100%', right: 0 }}
                                    value={this.state.to}
                                    onChange={this._handleTo}
                                />
                            </div>
                        </ListItem>
                        </Paper>
                    <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB' }} onClick={this._handleLogin}>
                        Okay
                    </Button>
                </div>
                
            </div>
        );
    }
}

PreOrderGD.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(PreOrderGD)));
