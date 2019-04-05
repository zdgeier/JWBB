import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {JsonRpc} from "eosjs";

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
});

class LiveAttendanceView extends Component {
    constructor(props) {
        super(props);
        this.refreshLiveAttendance();
    }

    refreshLiveAttendance() {
        this.liveAttendancePollingId = setInterval(this.getAttendance, 1000);
    }

    getAttendance() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "lokchain",   // contract who owns the table
            "scope": "lokchain",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => console.log(result.rows));
    }

    componentWillUnmount() {
        if (this.liveAttendancePollingId) {
            clearInterval(this.liveAttendancePollingId);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>Hi</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(LiveAttendanceView);
