// React dependencies
import React, { Component } from 'react';
import { BarChart } from 'react-d3-components';

// EOS-IO dependencies
import { JsonRpc } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { Parser as Json2csvParser } from 'json2csv';

// Materials-ui dependencies
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

//const endpoint = "http://localhost:8888";
const endpoint = "http://172.29.5.63:8888";

const styles = theme => ({
    card: {
        margin: 20,
    },
    graphic_display: {
        display: "flex",
        width: "100%",
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    formButton: {
        marginTop: theme.spacing.unit,
        width: "100%",
    },
    pre: {
        background: "#ccc",
        padding: 10,
        marginBottom: 0,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

//edit render method
class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attendees: [] // to store the table rows from smart contract
        };
        this.downloadTable = this.downloadTable.bind(this);
    }

    // gets table data from the blockchain
    // and saves it into the component state: "attendanceTable"
    getTable() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.setState({ attendance_table: result.rows }));
    }

    getAttendance() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 1000,
        }).then(result => this.setState({
            attendees: result.rows
        }));
    }

    exportToCsvFile(jsonData) {
        const fields = ['prim_key', 'user', 'xval', 'yval', 'crn','timestamp'];
        const opts = { fields };

        try {
            const parser = new Json2csvParser(opts);
            const csv = parser.parse(jsonData);

            let dataUri = 'data:application/json;charset=utf-8,' + csv;
            let exportFileDefaultName = 'data.csv';
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        } catch (err) {
            console.error(err);
        }
    }

    downloadTable() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.exportToCsvFile(result.rows));
    }

    componentDidMount() {
        this.getTable();
    }

    timeConverter(UNIX_timestamp, last7Dates) {
        let a = new Date(UNIX_timestamp * 1000);
        let a_date = a.getDate();
        let a_month = a.getMonth() + 1;
        let a_year = a.getFullYear();
        for(var i = 0; i < 7; i++){
            let date = last7Dates[i].getDate();
            let month = last7Dates[i].getMonth() + 1;
            let year = last7Dates[i].getFullYear();
            if(a_year == year && a_month == month && a_date == date){
                return i;
            }
        }
        return -1; //not in range of 7 days
    }

    render() {
        this.getAttendance();
        const { classes } = this.props;

        // Get the latest 7 days:
        const last7Dates = []
        const last7DatesString = []
        for (var i = 0; i < 7; i++) {
            let today = new Date();
            today.setDate(today.getDate() - i);
            let date = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            last7Dates.push(today);
            last7DatesString.push(year + '/' + month + '/' + date);
        }

        var last7Population = [0, 0, 0, 0, 0, 0, 0]
        // Get the population for latest 7 days:
        this.state.attendees.map((record) => {
            var index = this.timeConverter(record.timestamp, last7Dates)
            if(index != -1){
                last7Population[index] = last7Population[index] + 1;
            }
        })

        // Get CRNS:
        var crnList = []
        this.state.attendees.map((record) => {
            if(crnList.indexOf(record.crn) == -1){
                crnList.push(record.crn);}
        })

        // Generate data for graphing: 
        var data = [
            {
                label: 'Attended',
                values: [{ x: last7DatesString[6], y: last7Population[6] }, { x: last7DatesString[5], y: last7Population[5] }, { x: last7DatesString[4], y: last7Population[4] },
                { x: last7DatesString[3], y: last7Population[3] }, { x: last7DatesString[2], y: last7Population[2] }, { x: last7DatesString[1], y: last7Population[1] }, { x: last7DatesString[0], y: last7Population[0] }]
            }
        ];

        return (
            <div style={{ width: "100%" }}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Attendance History of Past 7 Days
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.graphic_display}>
                    <Paper className={classes.paper}>
                        <BarChart
                            groupedBars
                            data={data}
                            width={700}
                            height={400}
                            margin={{ top: 30, bottom: 50, left: 50, right: 10 }} />
                    </Paper>
                </div>

                <Paper className={classes.paper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formButton}
                        onClick={() => this.downloadTable()}>
                        Download Full Attendance History
                        </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Analytics);
