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
        paddingLeft: '1rem',
        padding: 10
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    items: {
        marginBottom: '0.8rem',
        height: '4rem',
        width: 'auto',
        background: "#000"
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

const Index = (props) => (
    <Paper className={classes.papers} elevation={4}>
        
    </Paper>
)

class RunnerIndex extends React.Component {
    state = {
        open: false,
        left: false,
        login: false,
        value: 0,
        user: {},
        data:{},
        time:'',
        f: ['From', 'Address', 'Address', 'Address', 'Address', 'Address', 'From'],
        t: ['To', 'Classification', '', '', '', '', 'Start Time'] 
    };

    tick() {
        console.log('tick+1')
        request.post(config.server + '/runner/new').send({ id: JSON.parse(localStorage.getItem('userdata')).ID }).end((err, res) => {
            if (err) throw err
            // this.setState({ data: res.body.id[0] })
            console.log(res.body.id[0])
        });
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 10000);
        request.post(config.server + '/runner').send({ id: JSON.parse(localStorage.getItem('userdata')).ID }).end((err, res) => {
            if (err) throw err
            this.setState({ data: res.body.id[0] })
            console.log(res.body.id[0])
        });
        Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        var time1 = new Date().Format("yyyy.MM.dd");
        this.setState({
            time:time1
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('userdata'))
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
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
                    <Paper className={classes.papers} elevation={4}>
                        <Typography component="h3" style={{ fontSize: 15, color: '#AAAAAA', textAlign: 'center' }} onClick={(e) => { console.log(this.state)}}>
                            {this.state.time+'(Today)'}
                        </Typography>
                    </Paper>
                    <div className={classes.items}>
                    </div>
                    {this.state.data === undefined ? '':(
                        <Link to={'/runner_ditail/'+this.state.data.id}>
                            <Paper className={classes.papers} elevation={4}>
                                <Avatar className={classes.continue} style={{ backgroundColor: this.state.data.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                </Avatar>
                                <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                                    On Process Order
                                </Typography>
                                <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                    <strong style={{ fontSize: 16, color: '#000' ,marginRight: 7}}>{this.state.data.name}</strong> {config.order[this.state.data.class]}
                                </Typography>
                                <Typography component="p" style={{ fontSize: 15, color: '#888888', marginLeft: 7 }}>
                                    {this.state.f[this.state.data.class]}: {this.state.data.from}
                                </Typography>
                                <Typography variant="headline" component="h3" style={{ color: '#888888', marginLeft: 7, marginBottom: 10, fontSize: 15 }}>
                                    {this.state.t[this.state.data.class]}:  {this.state.data.to}
                                </Typography>
                                <Typography variant="headline" component="h3" style={{ color: '#F2994A', marginLeft: 7, marginBottom: 10, fontSize: 20 }}>
                                    ${this.state.data.cast}
                                </Typography>
                            </Paper>
                        </Link>
                    )}
                </div>
                {this.state.data === undefined ? '':(
                    <a href={'tel:'+this.state.data.phonenumber}>
                        <Button variant="fab" color="primary" aria-label="add" style={{ background: '#6FCF97', position:'fixed', bottom:80,right:20 }} >
                            <Call />
                        </Button>
                    </a>
                )}
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    style={{width:'100%',position:'fixed',bottom:0}}
                >
                    <BottomNavigationAction label="Runner" />
                    <BottomNavigationAction label="Order" onClick={(e)=>{this.props.history.push('/runner_order')}}/>
                    <BottomNavigationAction label="Me" onClick={(e) => { this.props.history.push('/') }}/>
                </BottomNavigation>
            </div>
        );
    }
}

RunnerIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(RunnerIndex));
