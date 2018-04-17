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
    }
});


class OrderDitail extends React.Component {
    state = {
        open: false,
        left: false,
        data:{}
    };

    componentWillMount() {
        console.log(JSON.parse(localStorage.getItem('userdata')).ID)
        request.post(config.server + '/order/ditail').send({ id: this.props.match.params.id }).end((err, res) => {
            if (err) throw err;
            console.log(res.body)
            this.setState({
                data: res.body.id[0]
            })
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
                        <Link to="/order" style={{ color:"#FFF"}}>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <ArrowBack />
                        </IconButton>
                        </Link>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Order Ditail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    <Paper className={classes.papers} elevation={4}>
                        <div style={{ float: 'right', marginTop: 11, }}>
                            <Typography component="h3" style={{ fontSize: 22, color: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                {this.state.data.state == 0 ? "Ditail" : '$'+this.state.data.cast}
                        </Typography>
                            <Typography component="h3" align='right' style={{ fontSize: 12, color: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                {this.state.data.state == 0 ? "Process" : "Finished"}
                        </Typography>
                        </div>
                        <Avatar className={classes.continue} style={{ backgroundColor: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                        </Avatar>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                            {config.order[this.state.data.class]}
                        </Typography>

                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                            {Date(this.state.data.time).toString("YYYY-MM-DD")}
                        </Typography>
                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                            {this.state.data.from}
                        </Typography>
                        <div id="map" style={{height:150}}></div>
                        <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 15 }}>
                            To
                        </Typography>
                        <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 25, width:200 }}>
                            {this.state.data.to}
                        </Typography>
                    </Paper>
                    
                </div>
            </div>
        );
    }
}

OrderDitail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(OrderDitail));
