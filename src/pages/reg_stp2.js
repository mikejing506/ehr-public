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
        height: '100%',
        background: '#E5E5E5'
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
    textFieldHalf: {
        marginLeft: '10%',
        marginRight: 'auto',
        marginTop: '1rem',
        width: '35%'
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
        name:"",
        phone:'',
        card: '',
        ee:'2000-01',
        cvv2: '',
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
    _handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    _handlePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    _handleCard = (e) => {
        this.setState({
            card: e.target.value
        })
    }
    _handleEe = (e) => {
        this.setState({
            ee: e.target.value
        })
    }
    _handleCVV2 = (e) => {
        this.setState({
            cvv2: e.target.value
        })
    }

    _handleReg = () =>{
        // console.log(this.state.phone)
        request
        .post(config.server+'/users/reg')
        .send({
            data1:this.props.location.query,
            data2:this.state
        })
        .end((err, res) => {
            if (err || res.body.err) {
                alert(res.body.err);
            } else {
                console.log(res);
                if (res.body[0].ID) {
                    localStorage.setItem('f', true);
                    window.location.href = "/"
                    localStorage.setItem('userdata', JSON.stringify(res.body[0]))
                }
                // localStorage.setItem('f', true);
                // // this.props.history.push('/index')
            }
        })
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
                        <Link to="/reg" style={{ color: "#FFF" }}>
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
                    <Typography variant="title" color="inherit" gutterBottom style={{ color: '#FFF', paddingTop: 40, paddingLeft: 20 }}>
                        User Registration
                    </Typography>
                </div>
                <TextField
                    id="name"
                    label="Name"
                    placeholder="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this._handleName}
                />
                <TextField
                    id="phonenum"
                    label="Phone Number"
                    placeholder="Phone Number"
                    className={classes.textField}
                    margin="normal"
                    type="number"
                    value={this.state.phone}
                    onChange={this._handlePhone}
                />
                <TextField
                    id="cardnum"
                    label="Credit/Debit Card Number"
                    placeholder="Credit/Debit Card Number"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.card}
                    onChange={this._handleCard}
                />
                <TextField
                    id="date"
                    label="Expires End"
                    type="month"
                    className={classes.textFieldHalf}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.ee}
                    onChange={this._handleEe}
                />
                <TextField
                    id="CVV2"
                    label="CVV2"
                    placeholder="CVV2"
                    className={classes.textFieldHalf}
                    margin="normal"
                    value={this.state.cvv2}
                    onChange={this._handleCVV2}
                />
                <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB' }} onClick={this._handleReg}>
                    Finish
                </Button>
            </div>
        );
    }
}

Reg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(Reg)));
