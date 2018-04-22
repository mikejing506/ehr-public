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
    Close,
    Call
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
        width: 50,
        height: 50,
        float: 'right',
        marginTop: 2
    },
    button: {
        marginTop: 15,
        width: '100%',
        borderRadius: '1.5rem',
    },
    complish: {
        backgroundColor: '#75BA80',
        width: 20,
        height: 20,
        float: 'left',
        marginTop: 2
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RunnerOrderDitail extends React.Component {
    state = {
        open: false,
        left: false,
        data:{},
        value: 0,
        f: ['From', 'Address', 'Address', 'Address', 'Address', 'Address', 'From'],
        t: ['To', 'Classification', '', '', '', '', 'Start Time'] 
    };

    componentWillMount() {
        console.log(JSON.parse(localStorage.getItem('userdata')).ID)
        request.post(config.server + '/runner/ditail').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err;
            console.log(res.body)
            this.setState({
                data: res.body.id[0]
            })
        })
        
    }

    handleCancel = () => {
        request.post(config.server + '/order/cancel').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err
            this.props.history.push('/runner')
        })
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
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
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { this.props.history.goBack() }}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Order Ditail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    <Paper className={classes.papers} elevation={4}>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 15, marginBottom: 10, fontSize: 20 }}>
                            On Process Order
                        </Typography>
                        <div style={{ float: 'right', marginTop: 11, }}>
                            <Typography component="h3" style={{ fontSize: 22, color: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                {'$' + this.state.data.cast}
                            </Typography>
                        </div>
                        <Button variant="raised" color="primary" className={classes.button} style={{ background: '#6FCF97', width:'40%', marginLeft: 15 }} onClick={this._handleReg}>
                            Complish
                        </Button>
                    </Paper>
                    <Paper className={classes.papers} elevation={4} style={{marginTop:20}}>
                        <Avatar className={classes.continue} src={this.state.data.avatar} style={{ backgroundColor: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                        </Avatar>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                            {this.state.data.name}
                        </Typography>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 15 }}>
                            {config.order[this.state.data.class]}
                        </Typography>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 15 }}>
                            {this.state.f[this.state.data.class]}:  {this.state.data.from}
                        </Typography>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 15 }}>
                            {this.state.t[this.state.data.class]}:  {this.state.data.to}
                        </Typography>
                    </Paper>
                    <Button variant="raised" color="primary" className={classes.button} style={{ background: '#5E94DB' }} onClick={this.handleClickOpen}>
                        Cancel Order
                    </Button>
                    
                </div>
                <a href={'tel:' + this.state.data.phonenumber}>
                    <Button variant="fab" color="primary" aria-label="add" style={{ background: '#6FCF97', position: 'fixed', bottom: 80, right: 20 }} >
                        <Call />
                    </Button>
                </a>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    style={{ width: '100%', position: 'fixed', bottom: 0 }}
                >
                    <BottomNavigationAction label="Runner" onClick={(e) => { this.props.history.push('/runner') }}/>
                    <BottomNavigationAction label="Order" onClick={(e) => { this.props.history.push('/runner_order') }} />
                    <BottomNavigationAction label="Me" onClick={(e) => { this.props.history.push('/') }} />
                </BottomNavigation>
                <Dialog
                    open={this.state.open}
                    transition={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Cancel this order?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Not
                        </Button>
                        <Button onClick={this.handleCancel} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

RunnerOrderDitail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(RunnerOrderDitail));
