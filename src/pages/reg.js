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
import {
    ArrowBack
} from 'material-ui-icons';

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
        marginTop: '1rem',
        width: '80%'
    },
    button: {
        marginTop: 30,
        width: '90%',
        marginLeft: '5%',
        borderRadius: '1.5rem',
        flexDirection: 'column'
    },
});


class Reg extends React.Component {
    state = {
        open: false,
        left: false,
        email: '',
        passwd:'',
        repasswd:'',
        passwdre:true,
        next:false,
        useful:true,
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

    _handleEmail = (e) =>{
        this.setState({
            email: e.target.value
        })
    };
    
    _handleEmailOutFocus = () => {
        request
        .post(config.server + '/users/checkmail')
                .send({ email: this.state.email })
                .end((err, res) => {
                    console.log(res)
                    if (err) throw err
                    if (res.body.err) {
                        this.setState({
                            useful: false
                        })
                    } else if (res.body.res) {
                        this.setState({
                            useful: true
                        })
                    }
                })
    }

    _handlePasswd = (e) =>{
        this.setState({
            passwd: e.target.value
        })
    }

    _handleCheckPasswd = (e) =>{
        this.setState({
            repasswd: e.target.value
        })
        if (e.target.value != this.state.passwd) {
            this.setState({
                passwdre:false
            })
        }else{
            this.setState({
                passwdre:true,
                next:true
            })
        }
    }

    _handleRegStp2 = () =>{
        if (this.state.passwdre && this.state.next) {
            this.props.history.push({
                pathname: '/reg_stp2', query: {
                    email: this.state.email,
                    passwd: this.state.passwd,
                }
            })
        } else if (this.state.email == ""){
            alert("Please input Email address")
        } else if (this.state.passwd == ""){
            alert("Please input password")
        } else if (this.state.repasswd == ""){
            alert("Please input password again")
        }
        
    };


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
                <div className={classes.list_bg}>
                    <Typography variant="title" color="inherit" gutterBottom style={{ color:'#FFF',paddingTop:40,paddingLeft:20 }}>
                        User Registration
                    </Typography>
                </div>
                <TextField
                    id="email"
                    label={this.state.useful?"Email":"Please use anther Email"}
                    error={!this.state.useful}
                    placeholder="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this._handleEmail}
                    onBlur={this._handleEmailOutFocus}
                />
                <TextField
                    id="passwd"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    value={this.state.passwd}
                    onChange={this._handlePasswd}
                />
                <TextField
                    id="repasswd"
                    label={this.state.passwdre?"Type password again":"Please Check Input"}
                    error={!this.state.passwdre}
                    placeholder="Type password again"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    value={this.state.repasswd}
                    onChange={this._handleCheckPasswd}
                />
                <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB' }} onClick={this._handleRegStp2}>
                    Next
                </Button>
            </div>
        );
    }
}

Reg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(Reg)));
