import React, {Component} from 'react';
import GeofencerStyles from './Geofencer.css';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import './bootstrap.min.css';

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates = [];
let color = ['#FF0000', '#4286f4', '#ffff00', '#ff00b2', '#bb00ff', '#00ffff', '#26ff00', '#00ff87'];

class Geofencer extends Component {

    constructor(props) {
        console.log("fuk ye");
        super(props);
        this.state = {
            options: [],
            selectedOptions: []
        }
        this._handleSearch = this._handleSearch.bind(this);
        this.renderCoordinate = this.renderCoordinate.bind(this);

    }

    componentDidMount() {
        this._initMap()
    }

    _initMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -6.226996, lng: 106.819894},
            zoom: 10,
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
        console.log("search!");
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
            position++
            return true;
        });
    }

    renderToMaps(selectedOptions) {
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
                map.setOptions({maxZoom: 15});
                map.fitBounds(bounds);

                coordinates = [];
            }
        })
    }

    _handleChange(option) {
        console.log("change!");
        this._initMap();
        this.renderToMaps(option);
    }

    render() {
        return (
            <div className="container" style={{height: `100%`}}>
                <div className="page-header">
                    <h1>Geofence</h1>
                </div>
                <p className="lead">
                    <br></br>
                    To create area geofencing we must find area boundaries and draw on google maps as polygon.
                    Area boundaries feature not available in the Google Maps API.
                    The solution is using OpenStreetMap API for getting area boundaries.
                </p>
                <br></br>&nbsp;
                <AsyncTypeahead
                    align="justify"
                    multiple
                    labelKey="display_name"
                    onSearch={this._handleSearch.bind(this)}
                    onChange={this._handleChange.bind(this)}
                    options={this.state.options}
                    placeholder="Search area, ex: tomang or jakarta selatan..."
                    renderMenuItemChildren={(option, props, index) => (
                        <div>
                            <span>{option.display_name}</span>
                        </div>
                    )}/>

                <div className="maps" id="map"></div>
            </div>
        );
    }
}

export default Geofencer;
