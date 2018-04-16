import React from 'react';
import { Link } from 'react-router-dom'
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
        background: '#306E9C',
        position: 'fixed',
        top: 0
    },
    flex: {
        flex: 1,
    },
    panels: {
        // margin: 20,
        marginLeft:20,
        marginRight:20,
        paddingTop: 80
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
    },
    button: {
        marginTop: 30,
        width: '90%',
        marginLeft: '5%',
        borderRadius: '1.5rem',
    },
});


class AccInfo extends React.Component {
    state = {
        open: false,
        left: false,
        data: []
    };

    componentWillMount() {
        console.log(JSON.parse(localStorage.getItem('userdata')).ID)
        request.post(config.server + '/order/list').send({ id: JSON.parse(localStorage.getItem('userdata')).ID }).end((err, res) => {
            if (err) throw err;
            console.log(res.body)
            this.setState({
                data: res.body.id
            })
            // this.state.data.map((v,i)=>{
            //     console.log(v)
            // })
        })
    }

    _handleLogout = () =>{
        localStorage.removeItem("f")
        localStorage.removeItem('userdata')
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} >
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
                <div className={classes.panels}>
                    <Link to={''}>
                        <Paper className={classes.papers} elevation={4}>
                            <Typography variant="headline" component="h3" style={{ marginBottom: 10, fontSize: 20 }}>
                                Personal Info
                        </Typography>

                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                            {JSON.parse(localStorage.getItem('userdata')).name + '   ' + JSON.parse(localStorage.getItem('userdata')).phonenumber} 
                        </Typography>

                        </Paper>
                    </Link >
                    <Link to={''}>
                        <Paper className={classes.papers} elevation={4}>
                            <Typography variant="headline" component="h3" style={{ marginBottom: 10, fontSize: 20 }}>
                                Payment
                        </Typography>

                            <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                {JSON.parse(localStorage.getItem('userdata')).name + '   ' + JSON.parse(localStorage.getItem('userdata')).phonenumber}
                            </Typography>

                        </Paper>
                    </Link >
                    <Link to={''}>
                        <Paper className={classes.papers} elevation={4}>
                            <Typography variant="headline" component="h3" style={{ marginBottom: 10, fontSize: 20 }}>
                                Account Security
                        </Typography>

                            <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                {JSON.parse(localStorage.getItem('userdata')).name + '   ' + JSON.parse(localStorage.getItem('userdata')).phonenumber}
                            </Typography>

                        </Paper>
                    </Link >
                    <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB' }} onClick={this._handleLogout}>
                        Logout
                    </Button>
                </div>

            </div>
        );
    }
}

AccInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(AccInfo));
