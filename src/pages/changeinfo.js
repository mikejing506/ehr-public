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
    button: {
        marginTop: 30,
        width: '90%',
        marginLeft: '5%',
        borderRadius: '1.5rem',
        flexDirection: 'column'
    },
});


class ChangeInfo extends React.Component {
    state = {
        name:JSON.parse(localStorage.userdata).name,
        phonenum: JSON.parse(localStorage.userdata).phonenumber,
        disable:false,
        saved:'Save'
    };

    _handleChangen(e){
        this.setState({
            name:e.target.value,
            saved:'save'
        })
    }
    _handleChangep(e) {
        this.setState({
            phonenum: e.target.value,
            saved: 'save'
        })
    }

    _handleSave = () => {
        request.post(config.server + '/users/changeinfo').send({ id: JSON.parse(localStorage.userdata).ID, phone: this.state.phonenum,name:this.state.name }).end((err, res) => {
            if (err || res.body.err) {
                alert(res.body.err);
            } else {
                console.log(res);
                this.setState({
                    disable: false,
                    saved:'saved'
                })
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
                        <Link to="/accinfo" style={{ color: "#FFF" }}>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <ArrowBack />
                            </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Personal info
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TextField
                    id="email"
                    label={"Name"}
                    placeholder="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={(e) => { this._handleChangen(e) }}
                />
                <TextField
                    id="num"
                    label={"Phone Number"}
                    placeholder="Phone Number"
                    className={classes.textField}
                    value={this.state.phonenum}
                    onChange={(e) => { this._handleChangep(e)}}
                />
                <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB',marginBottom: 20, position: 'fixed', bottom: 20,left:0 }} onClick={this._handleSave} disabled={this.state.disable}>
                    {this.state.saved}
                </Button>
            </div>
        );
    }
}

ChangeInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(ChangeInfo)));
