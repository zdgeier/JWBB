import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Parallax} from "react-parallax";

import groupImg from '../images/team.jpg';
import Fade from "@material-ui/core/Fade/Fade";

const style = {
    root: {
        fontFamily: "sans-serif",
        textAlign: "center",
        filter: "grayscale(100%)",
    },

};

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props;
        return (
            <Fade in={true} timeout={2000}>
                <div className={classes.root}>
                    <p style={{marginTop: 40, marginBottom: 40, fontFamily: "Helvetica Neue", fontSize: 40}}>
                        Meet the team.
                    </p>
                    <Parallax bgImage={groupImg}>
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 500}}>
                    </div>
                    <Parallax bgImage={groupImg}>
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 500}}>
                        <p>
                            we're a bunch of dogs doing doggy dog things
                        </p>
                    </div>
                    <Parallax bgImage={groupImg}>
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 500}}>
                        <p>
                            we're a bunch of dogs doing doggy dog things
                        </p>
                    </div>
                    <Parallax bgImage={groupImg}>
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 500}}>
                        <p>
                            we're a bunch of dogs doing doggy dog things
                        </p>
                    </div>
                    <Parallax bgImage={groupImg}>
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 500}}>
                        <p>
                            we're a bunch of dogs doing doggy dog things
                        </p>
                    </div>
                </div>
            </Fade>
        );
    }
}

export default withStyles(style)(About);