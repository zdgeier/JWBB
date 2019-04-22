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

const endpoint = "http://localhost:8888";

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
            noteTable: [] // to store the table rows from smart contract
        };
        this.downloadTable = this.downloadTable.bind(this);
    }

    // gets table data from the blockchain
    // and saves it into the component state: "attendanceTable"
    getTable() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "lokchain",   // contract who owns the table
            "scope": "lokchain",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.setState({ attendance_table: result.rows }));
    }

    exportToCsvFile(jsonData) {
        const fields = ['prim_key', 'user', 'xval', 'yval', 'timestamp'];
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
            "code": "lokchain",   // contract who owns the table
            "scope": "lokchain",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => this.exportToCsvFile(result.rows));
    }

    componentDidMount() {
        this.getTable();
    }

    render() {
        const { classes } = this.props;
        const last7DatesString = []
        for (var i = 0; i < 7; i++) {
            let today = new Date();
            today.setDate(today.getDate() - i);
            let date = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            last7DatesString.push(year + '/' + month + '/' + date);
        }

        var data = [
            {
                label: 'Attended',
                values: [{ x: last7DatesString[6], y: 6 }, { x: last7DatesString[5], y: 8 }, { x: last7DatesString[4], y: 5 },
                { x: last7DatesString[3], y: 6 }, { x: last7DatesString[2], y: 8 }, { x: last7DatesString[1], y: 5 }, { x: last7DatesString[0], y: 5 }]
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
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="crn-required">CRN</InputLabel>
                            <Select
                                value={this.state.crn}
                                onChange={this.handleChange}
                                name="crn"
                                inputProps={{
                                    id: 'crn-required',
                                }}
                                className={classes.selectEmpty}>
                                <MenuItem value={0}>All CRNs</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
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