import React, {Component} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import './Create.css';

import './bootstrap.min.css';


import {Api, JsonRpc, RpcError} from 'eosjs'; // https://github.com/EOSIO/eosjs
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'
import {TextDecoder, TextEncoder} from 'text-encoding';

import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button/Button";

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates = [];
let color = ['#FF0000', '#4286f4', '#ffff00', '#ff00b2', '#bb00ff', '#00ffff', '#26ff00', '#00ff87'];
const endpoint = "http://localhost:8888";

const crnTextFieldstyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class outlinedTextField extends Component {

    constructor(props) {
        super(props);
        this.onChangeHandler = this.props.onChangeHandler;
    }

    render() {
        return (
            <TextField
                open={this.props.open}
                id="outlined-with-placeholder"
                label={this.props.label}
                placeholder={this.props.placeholder}
                onChange={this.onChangeHandler}
                margin="normal"
                variant="outlined"
                style={{
                    backgroundColor: 'white'
                }}
            />
        );
    }
}

function DialogTransition(props) {
    return <Slide direction="up" {...props} />;
}

class SlidingFeedbackDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.open}
                    TransitionComponent={DialogTransition}
                    keepMounted
                    onClose={() => {
                        this.props.handleClose(this.props.success, false)
                    }}>
                <DialogContent>
                    {this.props.success ? "Success! Your class was created." : "Failure! CRN already exists, invalid field entry or your connection broke!"}
                </DialogContent>
            </Dialog>
        );
    }
}

let CreateField = withStyles(crnTextFieldstyles)(outlinedTextField);

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOption: [],
            crn: -1,
            startTime: -1,
            endTime: -1,
            successDialogOpen: false,
            failDialogOpen: false,
        };
        this._handleSearch = this._handleSearch.bind(this);
        this.renderCoordinate = this.renderCoordinate.bind(this);
        this.renderToMaps = this.renderToMaps.bind(this);
        this._createClass = this._createClass.bind(this);
        this._handleCRNChange = this._handleCRNChange.bind(this);
        this._handleDialog = this._handleDialog.bind(this);
        this._handleStartTimeChange = this._handleStartTimeChange.bind(this);
        this._handleEndTimeChange = this._handleEndTimeChange.bind(this);
    }

    componentDidMount() {
        this._initMap();
    }

    _initMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.227600, lng: -80.422005},
            zoom: 16.9,
            zoomControl: true,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_CENTER
            },
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
        });
    }

    _handleSearch(query) {
        if (!query) {
            return;
        }
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`)
                .then(resp => resp.json())
                .then(data => {
                    let filterGeoJsonType = data.filter(function (data) {
                        return data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
                    });
                    this.setState({options: filterGeoJsonType});
                });
        }, 1000)
    }

    renderCoordinate(paths) {
        coordinates = [];
        let position = 0;
        paths.map((location) => {
            if (position % 10 === 0) {
                coordinates.push({"lat": location[1], "lng": location[0]});
                bounds.extend({"lat": location[1], "lng": location[0]});
            }
            position++;
            return true;
        });
    }

    renderToMaps(selectedOptions) {
        if (selectedOptions.length === 0) { // If the change was to remove a previously chosen selection by clicking on the 'x'
            this.setState({
                options: [],
                selectedOption: [],
            });
        } else { // Normal, new selection
            selectedOptions.forEach((option) => {

                if (option.geojson.type === "MultiPolygon") {
                    this.renderCoordinate(option.geojson.coordinates[0][0]);
                } else if (option.geojson.type === "Polygon") {
                    this.renderCoordinate(option.geojson.coordinates[0]);
                } else {
                    alert('option.geojson.type: MultiPolygon & Polygon');
                }

                if (coordinates.length > 1) {
                    sub_area = new window.google.maps.Polygon({
                        paths: coordinates,
                        strokeColor: color[1],
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: color[1],
                        fillOpacity: 0.35,
                        editable: true
                    });

                    sub_area.setMap(map);
                    map.fitBounds(bounds);
                    this.setState({
                        options: [],
                        selectedOption: coordinates, // soft copy aliasing fine here because reference lost in next line anyway
                    });
                    coordinates = [];
                }
            })
        }
    }

    _handleChange(selectedOption) {
        this._initMap();
        this.renderToMaps(selectedOption);
    }

    _handleCRNChange(event) {
        let crn = event.target.value;
        this.setState((prevState) => {
            let newState = Object.assign(prevState);
            newState.crn = crn;
            return newState;
        });
    }

    _handleStartTimeChange(event) {
        let startTime = event.target.value;
        this.setState((prevState) => {
            let newState = Object.assign(prevState);
            newState.startTime = startTime;
            return newState;
        });
    }

    _handleEndTimeChange(event) {
        let endTime = event.target.value;
        this.setState((prevState) => {
            let newState = Object.assign(prevState);
            newState.endTime = endTime;
            return newState;
        });
    }

    _handleDialog(success, open) {
        this.setState((prevState) => {
            let newState = Object.assign(prevState);
            if (open) {
                if (success) {
                    newState.successDialogOpen = true;
                } else {
                    newState.failDialogOpen = true;
                }
            } else {
                if (success) {
                    newState.successDialogOpen = false;
                } else {
                    newState.failDialogOpen = false;
                }
            }
            return newState;
        })
    }

    async _createClass(event) {
        // stop default behaviour
        event.preventDefault();
        // collect form data
        let account = "useraaaaaaaa";
        let privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5";
        let crn = this.state.crn;
        let startTime = this.state.startTime;
        let endTime = this.state.endTime;

        let x_bounds = [];
        let y_bounds = [];

        for (let coordinate of this.state.selectedOption) {
            console.log(coordinate);
            x_bounds.push(coordinate.lat);
            y_bounds.push(coordinate.lng);
        }

        let actionName = "create";
        let actionData = {
            user: account,
            crn: crn,
	    courseName: "Systems Capstone",
            startTime: startTime,
            endTime: endTime,
            xs: x_bounds,
            ys: y_bounds,
        };

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
            console.log(trans);

            var trans2 = {
                blocksBehind: 3,
                expireSeconds: 30,
            };

            const result = await
                api.transact(trans, trans2);

            this._handleDialog(true, true);
            console.log(result);
        } catch (e) {
            console.log('Caught exception: ' + e);
            if (e instanceof RpcError) {
                console.log(JSON.stringify(e.json, null, 2));
            }
            this._handleDialog(false, true);
        }
    }

    render() {
        return (
            <div style={{position: "relative", height: '100%'}}>
                <div>
                    <AsyncTypeahead
                        multiple
                        labelKey="display_name"
                        onSearch={this._handleSearch.bind(this)}
                        onChange={this._handleChange.bind(this)}
                        options={this.state.options}
                        placeholder="Search for class boundaries"
                        renderMenuItemChildren={(option) => (
                            <div>
                                <span>{option.display_name}</span>
                            </div>
                        )}/>
                </div>
                <div className="maps" id="map"/>
                <div style={{position: "absolute", marginLeft: '10px', top: '50px'}}>
                    <div>
                        <CreateField onChangeHandler={this._handleCRNChange} label={"CRN"} placeholder={"e.g. 12345"}/>
                    </div>
                    <div>
                        <CreateField onChangeHandler={this._handleStartTimeChange} label={"Start Time"}
                                     placeholder={"e.g. 12:00"}/>
                    </div>
                    <div>
                        <CreateField onChangeHandler={this._handleEndTimeChange} label={"End Time"}
                                     placeholder={"e.g. 2:00"}/>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Button variant="contained" style={{height: "55px"}}
                                onClick={this._createClass}>
                            Create class
                        </Button>
                    </div>
                </div>
                {console.log(this.state.successDialogOpen)}
                <SlidingFeedbackDialog success={true} open={this.state.successDialogOpen}
                                       handleClose={this._handleDialog}/>
                <SlidingFeedbackDialog success={false} open={this.state.failDialogOpen}
                                       handleClose={this._handleDialog}/>
            </div>
        );
    }
}

export default Create;
