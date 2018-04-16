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
        background: '#E5E5E5',
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 80
    },
    papers: {
        padding: 10,
        marginBottom: 15
    },
});


class About extends React.Component {
    state = {
        open: false,
        left: false,
    };

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
                            About
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    <Paper className={classes.papers} elevation={4}>
                    <div style={{ height: 100, width: 100, marginLeft: 'auto', marginRight: 'auto', background: '#2D9CDB', borderRadius: 10, marginTop:20,marginBottom:20 }}>
                    </div>
                    <Typography color='inherit' align='center' style={{fontSize:18}}>
                        Hampons Runner
                    </Typography>
                    <Typography component="p" align='center' style={{ fontSize: 12, color: '#888888',marginTop:10,marginBottom:20 }}>
                        Version 0.0.1 Alpha
                    </Typography>
                    </Paper>
                    <Paper className={classes.papers} elevation={4}>
                        <Typography variant="subheading" align="center" color="inherit">
                            Email: HamponsRunner@gmail.com
                        </Typography>
                    </Paper>
                    <Paper className={classes.papers} elevation={4}>
                        <Typography variant="subheading" align="center" color="inherit">
                            010-64099680
                        </Typography>
                    </Paper>
                    <Typography component="p" align='center' style={{ fontSize: 12, color: '#888888',marginTop:10,marginBottom:20 }}>
                        ©2017-2018 HamponsRunner co.Ltd All rights reserved
                    </Typography>
                </div>

            </div>
        );
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(About));
