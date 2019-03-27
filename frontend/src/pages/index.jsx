import React, {Component} from 'react';
import {Api, JsonRpc, RpcError} from 'eosjs'; // https://github.com/EOSIO/eosjs
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'
import {TextDecoder, TextEncoder} from 'text-encoding';
import { Parser as Json2csvParser } from 'json2csv';

// material-ui dependencies
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab";

import Geofencer from './Geofencer'

// eosio endpoint
const endpoint = "http://localhost:8888";

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const klasses = [
    {"crn": "100", "bounds": "(0,0),(0, 100),(100,100),(100,0)"},
    {"crn": "200", "bounds": "(200,200),(200,250),(250,250),(250,200)"},
    {"crn": "500", "bounds": "(500,500),(500,600),(600,600),(600,500)"}
]
const accounts = [
    {
        "name": "useraaaaaaaa",
        "privateKey": "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
        "publicKey": "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
    },
    {
        "name": "useraaaaaaab",
        "privateKey": "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg",
        "publicKey": "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"
    },
    {
        "name": "useraaaaaaac",
        "privateKey": "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
        "publicKey": "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"
    },
    {
        "name": "useraaaaaaad",
        "privateKey": "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx",
        "publicKey": "EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"
    },
    {
        "name": "useraaaaaaae",
        "privateKey": "5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg",
        "publicKey": "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"
    },
    {
        "name": "useraaaaaaaf",
        "privateKey": "5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK",
        "publicKey": "EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"
    },
    {
        "name": "useraaaaaaag",
        "privateKey": "5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo",
        "publicKey": "EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"
    }
];
// set up styling classes using material-ui "withStyles"
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

const tabStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

function exportToCsvFile(jsonData) {    
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


// Index component
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteTable: [] // to store the table rows from smart contract
        };
        this.handleFormEvent = this.handleFormEvent.bind(this);
        this.handleAddClass = this.handleAddClass.bind(this);
    }

    // generic function to handle form events (e.g. "submit" / "reset")
    // push transactions to the blockchain by using eosjs
    async handleFormEvent(event) {
        // stop default behaviour
        event.preventDefault();

        // collect form data
        let account = event.target.account.value;
        let privateKey = event.target.privateKey.value;
        let xval = event.target.xval.value;
        let yval = event.target.yval.value;
        let crn = event.target.crn.value;

        // prepare variables for the switch below to send transactions
        let actionName = "";
        let actionData = {};

        // define actionName and action according to event type
        switch (event.type) {
            case "submit":
                actionName = "record";
                actionData = {
                    user: account,
                    xval: xval,
                    yval: yval,
                    crn: crn
                };
                break;
            default:
                return;
        }

        // eosjs function call: connect to the blockchain
        const rpc = new JsonRpc(endpoint);
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        try {
            var trans = {
                actions: [{
                    account: "lokchain",
                    name: actionName,
                    authorization: [{
                        actor: account,
                        permission: 'active',
                    }],
                    data: actionData,
                }]
            };
            console.log(trans)

            var trans2 = {
                blocksBehind: 3,
                expireSeconds: 30,
            };

            const result = await api.transact(trans, trans2);

            console.log(result);
            this.getTable();
        } catch (e) {
            console.log('Caught exception: ' + e);
            if (e instanceof RpcError) {
                console.log(JSON.stringify(e.json, null, 2));
            }
        }
    }

// push transactions to the blockchain by using eosjs
    async handleAddClass(event) {
        // stop default behaviour
        event.preventDefault();

        // collect form data
        let account = event.target.account.value;
        let privateKey = event.target.privateKey.value;
        let crn = event.target.crn.value;
        let x_min = event.target.x_min.value;
        let x_max = event.target.x_max.value;
        let y_min = event.target.y_min.value;
        let y_max = event.target.y_max.value;
        let x_bounds = [x_min, x_max];
        let y_bounds = [y_min, y_max];

        // prepare variables for the switch below to send transactions
        let actionName = "";
        let actionData = {};

        // define actionName and action according to event type
        switch (event.type) {
            case "submit":
                actionName = "create";
                actionData = {
                    user: account,
                    crn: crn,
                    xs: x_bounds,
                    ys: y_bounds,
                };
                break;
            default:
                return;
        }


        // eosjs function call: connect to the blockchain
        const rpc = new JsonRpc(endpoint);
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        try {
            var trans = {
                actions: [{
                    account: "lokchain",
                    name: actionName,
                    authorization: [{
                        actor: account,
                        permission: 'active',
                    }],
                    data: actionData,
                }]
            };
            console.log(trans)

            var trans2 = {
                blocksBehind: 3,
                expireSeconds: 30,
            };

            const result = await api.transact(trans, trans2);

            console.log(result);
            this.getTable();
        } catch (e) {
            console.log('Caught exception: ' + e);
            if (e instanceof RpcError) {
                console.log(JSON.stringify(e.json, null, 2));
            }
        }
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

    downloadTable() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "lokchain",   // contract who owns the table
            "scope": "lokchain",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi
            "limit": 100,
        }).then(result => exportToCsvFile(result.rows));
    }


    //creates a default set of classes
    async populate() {
        // collect form data
        let account = "useraaaaaaaa";
        let privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5";
        let actionName = "populate"
        let actionData = {user: account};

        // eosjs function call: connect to the blockchain
        const rpc = new JsonRpc(endpoint);
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
        try {
            var trans = {
                actions: [{
                    account: "lokchain",
                    name: actionName,
                    authorization: [{
                        actor: account,
                        permission: 'active',
                    }],
                    data: actionData,
                }]
            };
            console.log(trans)

            var trans2 = {
                blocksBehind: 3,
                expireSeconds: 30,
            };

            const result = await api.transact(trans, trans2);

            console.log(result);
            this.getTable();
        } catch (e) {
            console.log('Caught exception: ' + e);
            if (e instanceof RpcError) {
                console.log(JSON.stringify(e.json, null, 2));
            }
        }
    }


    componentDidMount() {
        this.getTable();
    }

    render() {
        const {noteTable} = this.state;
        const {classes} = this.props;

        // generate each record as a card
        const generateCard = (key, timestamp, user, note, xval, yval) => (
            <Card className={classes.card} key={key}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {user}
                    </Typography>
                    <Typography style={{fontSize: 12}} color="textSecondary" gutterBottom>
                        {new Date(timestamp * 1000).toString()}
                    </Typography>
                    <Typography component="pre">
                        {xval}|{yval}
                    </Typography>
                </CardContent>
            </Card>
        );
        let noteCards = noteTable.map((row, i) =>
            generateCard(i, row.timestamp, row.user, row.note, row.xval, row.yval));

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Lo-K-Chain
                        </Typography>
                    </Toolbar>
                </AppBar>
                {noteCards}
                <Paper className={classes.paper}>
                    <form onSubmit={this.handleFormEvent}>
                        <TextField
                            name="account"
                            autoComplete="off"
                            label="Account"
                            margin="normal"
                            defaultValue="useraaaaaaaa"
                            fullWidth
                        />
                        <TextField
                            name="privateKey"
                            autoComplete="off"
                            label="Private key"
                            margin="normal"
                            defaultValue="5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"
                            fullWidth
                        />
                        <TextField
                            name="crn"
                            autoComplete="off"
                            label="crn"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            name="xval"
                            autoComplete="off"
                            label="xval"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            name="yval"
                            autoComplete="off"
                            label="yval"
                            margin="normal"
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.formButton}
                            type="submit">
                            Add / Update location
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formButton}
                        onClick={() => this.downloadTable()}>
                        Download Location History
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formButton}
                        onClick={() => this.populate()}>
                        Populate Classes
                    </Button>
                </Paper>
                <pre className={classes.pre}>
          Below is a list of pre-created accounts information for location tracking:
          <br/><br/>
          classes = {JSON.stringify(klasses, null, 2)}
                    <br/><br/>
          accounts = {JSON.stringify(accounts, null, 2)}
        </pre>
            </div>
        );
    }

}

const IndexComponent = withStyles(styles)(Index);

class AppHeader extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab value={0} label="Create a geo-fence"/>
                        <Tab value={1} label="Blockchain stuff"/>
                    </Tabs>
                </Paper>
                {value === 0 && <Geofencer/>}
                {value === 1 && <IndexComponent/>}
            </div>
        );
    }
}

const AppHeaderComponent = withStyles(tabStyles)(AppHeader);

export {
    AppHeaderComponent
}