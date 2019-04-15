// React dependencies
import React, {Component} from 'react';

// EOS-IO dependencies
import {JsonRpc} from 'eosjs'; // https://github.com/EOSIO/eosjs
import {Parser as Json2csvParser} from 'json2csv';

// Materials-ui dependencies
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

const endpoint = "http://localhost:8888";

const styles = theme => ({
    card: {
        margin: 20,
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
});

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
        }).then(result => this.setState({attendance_table: result.rows}));
    }

    exportToCsvFile(jsonData) {
        const fields = ['prim_key', 'user', 'xval', 'yval', 'timestamp'];
        const opts = {fields};

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
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Lo-K-Chain
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.paper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formButton}
                        onClick={() => this.downloadTable()}>
                        Download Location History
                    </Button>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(Analytics);