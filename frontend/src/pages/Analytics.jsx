// React dependencies
import React, {Component} from 'react';
import {BarChart} from 'react-d3-components';

// EOS-IO dependencies
import {JsonRpc} from 'eosjs';

// Materials-ui dependencies
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import * as ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

const endpoint = "http://localhost:8888";

const styles = theme => ({
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
    chooseClassRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60%"
    },
    selectFormControl: {
        margin: "auto",
        width: "45%",
        minWidth: 440,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class SelectLiveClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crn: "",
            name: "hai",
            labelWidth: 0,
            choices: [],
        };
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "classes",    // name of the table as specified by the contract abi,
            "limit": 100,
        }).then(result => {
            console.log(result);
            this.setState((prevState => {
                let newState = Object.assign(prevState);
                newState.choices = result.rows;
                return newState;
            }))
        });
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        let {choices} = this.state;
        let choicesMenuComponents = choices.map((choice) => {
            return (<MenuItem value={choice.crn}>{choice.courseName}</MenuItem>);
        });
        const {classes} = this.props;
        return (
            <div className={classes.chooseClassRoot}>
                <form autoComplete="off">
                    <FormControl className={classes.selectFormControl}>
                        <InputLabel ref={ref => {
                            this.InputLabelRef = ref;
                        }} htmlFor="crn">Select the class for which you wish to view live
                            attendance</InputLabel>
                        <Select
                            value={this.state.crn}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "crn",
                                id: "crn"
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {choicesMenuComponents}
                        </Select>
                    </FormControl>
                </form>
                <Button style={{marginTop: 15, marginLeft: 20}} variant={"outlined"}
                        onClick={() => {
                            this.props.setClass(this.state.crn);
                        }}>Go Live</Button>
            </div>
        );
    }
}

//edit render method
class LiveAnalyticsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [] // to store the table rows from smart contract
        };
    }

    getAttendance() {
        const rpc = new JsonRpc(endpoint);
        rpc.get_table_rows({
            "json": true,
            "code": "attendit",   // contract who owns the table
            "scope": "attendit",  // scope of the table
            "table": "attendance",    // name of the table as specified by the contract abi,
            "limit": 100,
        }).then(result => {
            this.setState({
                attendees: result.rows
            })
        });
    }

    componentDidMount() {
        this.liveAttendancePollingId = setInterval(() => {
            this.getAttendance.bind(this)();
        }, 1000);
    }

    componentWillUnmount() {
        if (this.liveAttendancePollingId) {
            clearInterval(this.liveAttendancePollingId);
        }
    }

    timeConverter(UNIX_timestamp, last7Dates) {
        let a = new Date(UNIX_timestamp * 1000);
        let a_date = a.getDate();
        let a_month = a.getMonth() + 1;
        let a_year = a.getFullYear();
        for (let i = 0; i < 7; i++) {
            let date = last7Dates[i].getDate();
            let month = last7Dates[i].getMonth() + 1;
            let year = last7Dates[i].getFullYear();
            if (a_year == year && a_month == month && a_date == date) {
                return i;
            }
        }
        return -1; //not in range of 7 days
    }

    render() {
        const {classes} = this.props;

        // Get the latest 7 days:
        const last7Dates = [];
        const last7DatesString = []
        for (let i = 0; i < 7; i++) {
            let today = new Date();
            today.setDate(today.getDate() - i);
            let date = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            last7Dates.push(today);
            last7DatesString.push(year + '/' + month + '/' + date);
        }

        // Get the population for latest 7 days:
        let last7Population = [0, 0, 0, 0, 0, 0, 0];
        let attendees = this.state.attendees.filter((record) => {
            return record.crn === this.props.crn;
        });

        for (let record of attendees) {
            let index = this.timeConverter(record.timestamp, last7Dates);
            if (index != -1) {
                last7Population[index] = last7Population[index] + 1;
            }
        }

        // Generate data for graphing:
        let data = [
            {
                label: 'Attended',
                values: [{x: last7DatesString[6], y: last7Population[6]}, {
                    x: last7DatesString[5],
                    y: last7Population[5]
                }, {x: last7DatesString[4], y: last7Population[4]},
                    {x: last7DatesString[3], y: last7Population[3]}, {
                        x: last7DatesString[2],
                        y: last7Population[2]
                    }, {x: last7DatesString[1], y: last7Population[1]}, {x: last7DatesString[0], y: last7Population[0]}]
            }
        ];

        return (
            <div style={{width: "100%"}}>
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
                            margin={{top: 30, bottom: 50, left: 50, right: 10}}/>
                    </Paper>
                </div>
            </div>
        );
    }
}

let LiveAnalyticsViewStyled = withStyles(styles)(LiveAnalyticsView);
let SelectLiveClassStyled = withStyles(styles)(SelectLiveClass);


class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.setClass = this.setClass.bind(this);
        this.state = {
            classCrn: -1,
        }
    }

    setClass(crn) {
        this.setState((prevState => {
            let newState = Object.assign(prevState);
            newState.classCrn = crn;
            return newState;
        }));
    }

    render() {
        let {classCrn} = this.state;
        return (
            classCrn === -1 ? <SelectLiveClassStyled setClass={this.setClass}/> :
                <LiveAnalyticsViewStyled crn={parseInt(this.state.classCrn)}/>
        );
    }
}

export default withStyles(styles)(Analytics);
