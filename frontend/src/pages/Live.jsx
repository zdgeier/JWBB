import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from "@material-ui/core/Fade";

import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";

import {JsonRpc} from "eosjs";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const endpoint = "http://localhost:8888";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 10,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    loading: {
        top: "50%",
        left: "50%",
        textAlign: 'center',
    }
});

class LiveAttendanceView extends Component {
    constructor(props) {
        super(props);
        this.refreshLiveAttendance();
        this.state = {
            attendees: []
        }
    }

    timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }

    refreshLiveAttendance() {
        this.liveAttendancePollingId = setInterval(this.getAttendance.bind(this), 1000);
    }

    getAttendance() {
        //console.log(this);
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.setState({
            attendees: result.rows
        }));
    }

    componentWillUnmount() {
        if (this.liveAttendancePollingId) {
            clearInterval(this.liveAttendancePollingId);
        }
    }

    render() {
        const {classes} = this.props;
        if (this.state.attendees.length === 0) {
            return (
                <div className={classes.loading}>
                    <br/>
                    <Typography gutterBottom component="p" variant={"subtitle2"}> Streaming live
                        attendance... </Typography>
                    <br/>
                    <CircularProgress/>
                </div>
            );
        }
        let heatmapData = [];
        for (let record in this.state) {
            heatmapData.push({
                x: record.xval,
                y: record.yval,
                data: record.timestamp,
            })
        }
        let attendeeCards = this.state.attendees.map((record) => {
            return (
                <Fade in={true} timeout={500}>
                    <Grid item xs={4}>
                        <Card className={classes.card} key={record.prim_key}>
                            <CardMedia
                                className={classes.media}
                                image="/frontend/images/user_profile_img.png"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {record.user}
                                </Typography>
                                <Typography component="p">
                                    Attendance for this user was recorded
                                    on: <b>{this.timeConverter(record.timestamp)}</b>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Fade>
            )
        });
        attendeeCards = (
            <Grid container spacing={24}>{attendeeCards}</Grid>
        );
        return (
            <div className={classes.root}>
                {attendeeCards}
            </div>
        );
    }
}

export default withStyles(styles)(LiveAttendanceView);
