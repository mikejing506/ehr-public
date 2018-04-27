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
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import List, { ListItem, ListItemText } from 'material-ui/List';
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
        margin: 20,
        paddingTop: 60
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


class Setting extends React.Component {
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
                            Setting
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    <Typography component="p" style={{ fontSize: 16, color: '#333', marginLeft: 7,marginBottom:10,marginTop:10 }}>
                        Notice
                    </Typography>
                    <Paper className={classes.papers} elevation={4}>
                        <ListItem
                            style={{
                                display: "flex",
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                                Notice
                            </Typography>
                            <Switch defaultChecked value="checkedF" color="default"/>
                        </ListItem>
                        <Divider />
                        <ListItem
                            style={{
                                display: "flex",
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                                Ring
                            </Typography>
                            <Switch defaultChecked value="checkedF" color="default" />
                        </ListItem>
                        <Divider />
                        <ListItem
                            style={{
                                display: "flex",
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                                E-Mail
                            </Typography>
                            <Switch defaultChecked value="checkedF" color="default" />
                        </ListItem>
                    </Paper>
                    <Typography component="p" style={{ fontSize: 16, color: '#333', marginLeft: 7, marginBottom: 10, marginTop: 10 }}>
                        Privacy
                    </Typography>
                    <Paper className={classes.papers} elevation={4}>
                        <ListItem
                            style={{
                                display: "flex",
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                                Show my name to runner
                            </Typography>
                            <Switch defaultChecked value="checkedF" color="default" />
                        </ListItem>
                        <Divider />
                        <ListItem
                            style={{
                                display: "flex",
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                                Position Services
                            </Typography>
                            <Switch defaultChecked value="checkedF" color="default" />
                        </ListItem>
                    </Paper>
                </div>

            </div>
        );
    }
}

Setting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Setting));
