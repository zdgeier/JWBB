import React, {Component} from 'react';


// material-ui dependencies
import {withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab";

import Create from './Create.jsx'
import Analytics from "./Analytics.jsx";
import Live from "./Live";

// const classes = [
//     {"crn": "100", "bounds": "(0,0),(0, 100),(100,100),(100,0)"},
//     {"crn": "200", "bounds": "(200,200),(200,250),(250,250),(250,200)"},
//     {"crn": "500", "bounds": "(500,500),(500,600),(600,600),(600,500)"}
// ];
//
// const accounts = [
//     {
//         "name": "useraaaaaaaa",
//         "privateKey": "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
//         "publicKey": "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
//     },
//     {
//         "name": "useraaaaaaab",
//         "privateKey": "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg",
//         "publicKey": "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"
//     },
//     {
//         "name": "useraaaaaaac",
//         "privateKey": "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
//         "publicKey": "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"
//     },
//     {
//         "name": "useraaaaaaad",
//         "privateKey": "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx",
//         "publicKey": "EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"
//     },
//     {
//         "name": "useraaaaaaae",
//         "privateKey": "5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg",
//         "publicKey": "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"
//     },
//     {
//         "name": "useraaaaaaaf",
//         "privateKey": "5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK",
//         "publicKey": "EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"
//     },
//     {
//         "name": "useraaaaaaag",
//         "privateKey": "5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo",
//         "publicKey": "EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"
//     }
// ];

const tabStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class App extends Component {
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
                        <Tab value={0} label="Create new class"/>
                        <Tab value={1} label="Live"/>
                        <Tab value={2} label="Analytics"/>
                    </Tabs>
                </Paper>
                {value === 0 && <Create/>}
                {value === 1 && <Live/>}
                {value === 2 && <Analytics/>}
            </div>
        );
    }
}

export default withStyles(tabStyles)(App);
