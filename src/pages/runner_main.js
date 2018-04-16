import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'

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
        paddingLeft: '1rem'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    items: {
        marginRight: '1rem',
        marginBottom: '0.8rem',
        height: '7rem',
        width: 'auto',
        background: "#000"
    },
    items_text: {
        fontSize: '1.4rem',
        marginRight: '1rem',
        paddingTop: "4.5rem",
        color: '#FFF',
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
});


class RunnerIndex extends React.Component {
    state = {
        open: false,
        left: false,
        login: false,
        user: {}
    };

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

    render() {
        const { classes } = this.props;

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
                    
                </div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </div>
        );
    }
}

RunnerIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(RunnerIndex));
