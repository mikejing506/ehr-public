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
        background: '#306E9C',
        position: 'fixed',
        top:0
    },
    flex: {
        flex: 1,
    },
    panels: {
        margin:20,
        paddingTop:60
    },
    papers:{
        padding:10,
        marginBottom:15
    },
    continue:{
        width:20,
        height:20,
        float:'left',
        marginTop:2
    },
    complish: {
        backgroundColor: '#75BA80',
        width: 20,
        height: 20,
        float: 'left',
        marginTop: 2
    }
});


class Order extends React.Component {
    state = {
        open: false,
        left: false,
        data: []
    };

    componentWillMount() {
        console.log(JSON.parse(localStorage.getItem('userdata')).ID)
        request.post(config.server + '/order/list').send({ id: JSON.parse(localStorage.getItem('userdata')).ID}).end((err,res)=>{
            if (err) throw err;
            console.log(res.body)
            this.setState({
                data:res.body.id
            })
            // this.state.data.map((v,i)=>{
            //     console.log(v)
            // })
        })
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
                            Order
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.panels}>
                    {this.state.data.map((v, i) => (
                        <Link to={"/order_ditail/"+v.id}>
                            <Paper className={classes.papers} elevation={4}>
                                <div style={{ float: 'right', marginTop: 11, }}>
                                    <Typography component="h3" style={{ fontSize: 22, color: v.state == 0 ? '#2D9CDB' : '#75BA80' }}>
                                        {v.state == 0 ? "Ditail":'$'+v.cast}
                                    </Typography>
                                    <Typography component="h3" align='right' style={{ fontSize: 12, color: v.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                        {v.state == 0 ? "Process" : "Finished"}
                                     </Typography>
                                </div>
                                <Avatar className={classes.continue} style={{ backgroundColor: v.state == 0 ? '#2D9CDB' : '#75BA80', }}>
                                </Avatar>
                                <Typography variant="headline" component="h3" style={{ marginLeft: 25, marginBottom: 10, fontSize: 20 }}>
                                    {config.order[v.class]}
                                </Typography>

                                <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                    {new Date(parseInt(v.time)).Format("yyyy.MM.dd - hh:mm")}
                                </Typography>
                                <Typography component="p" style={{ fontSize: 12, color: '#888888', marginLeft: 7 }}>
                                    {v.to}
                                </Typography>

                            </Paper>
                        </Link >
                    ))}
                </div>
                
            </div>
        );
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Order));
