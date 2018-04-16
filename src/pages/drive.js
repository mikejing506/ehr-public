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
    ArrowBack
} from 'material-ui-icons';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

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
        position:'fixed'
    },
});

var map,marker;

class Driver extends React.Component {

    state = {
        open: false,
        left: false,
        uluru: { lat: 35.660815, lng: 139.860196 },
        data:{},
        f: ['From', 'Address', 'Address', 'Address', 'Address', 'Address',],
        t: ['To', 'Classification', '', '', '', '', '',]
            
    };

    componentDidMount() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: this.state.uluru,
            mapTypeId: 'roadmap',
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });
        marker = new google.maps.Marker({
            position: this.state.uluru,
            draggable: true,
            map: map
        });
        // console.log('/order/$this.props.match.params.id')
        request.post(config.server+'/order/maps').send({id:this.props.match.params.id}).end((err,res)=>{
            if (err) throw err
            this.setState({ data: res.body.id[0]})
            console.log(res.body.id[0].from)
            // console.log(this.state.data)
        })
    }

    componentWillUnmount(){
        map,marker = null;
    }

    _handleTouch = () =>{
        // console.log(map.getCenter().toString())
        console.log(marker.getPosition().toString())
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} style={{}}>
                {/* <button onClick={this._handleTouch} >a </button> */}
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
                            Order Ditail
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper elevation={5} style={{ marginBottom: 20, position: 'fixed', bottom: 20, left: '5%',width:'90%',zIndex:99}}>
                    <ListItem button>
                        <Typography variant="subheading" component="h3" style={{ marginRight: 10 }}>
                            {this.state.f[this.state.data.class]}
                        </Typography>
                        <div style={{ float: 'right', width: '100%', right: 0 }}>
                            <Typography variant="subheading" align='right'  component="h3" style={{ float: 'right', width: '100%', right: 0 }}>
                                {this.state.data.from}
                            </Typography>
                        </div>
                    </ListItem>
                    <Divider />
                    {this.state.t[this.state.data.class] !== '' ? <ListItem button>
                        <Typography variant="subheading" component="h3" style={{ marginRight: 10 }} >
                            {this.state.t[this.state.data.class]}
                        </Typography>
                        <div style={{ float: 'right', width: '100%', right: 0 }}>
                            <Typography variant="subheading" align='right' component="h3" style={{ float: 'right', width: '100%', right: 0 }}>
                                {this.state.data.to}
                            </Typography>
                        </div>
                    </ListItem>:''}
                    <Divider />
                    <ListItem button>
                        <Typography variant="subheading" align='center' component="h3" style={{ marginRight: 10 }} >
                            Waiting Runner
                        </Typography>
                    </ListItem>
                </Paper>
                <div id="map" style={{height:'100%',width:'100%'}}>
                    
                </div>
                
            </div>
        );
    }
}

Driver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Driver));

