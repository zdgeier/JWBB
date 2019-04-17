import React, {Component} from 'react';
import {Parallax} from "react-parallax";
import ParticleAnimation from 'react-particle-animation';

// material-ui dependencies
import {withStyles} from '@material-ui/core/styles';

import Create from './Create.jsx'
import Analytics from "./Analytics.jsx";
import Live from "./Live";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import Fade from "@material-ui/core/Fade/Fade";
import Particles from "react-particles-js";

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

const image1 =
    "https://media1.giphy.com/media/3oKIPpFhwsMNrRIjN6/giphy.gif?cid=790b76115cb678eb776f446a63c91bee";
const image2 =
    "https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg";
const image3 =
    "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001";
const image4 =
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/empire-state-building-black-and-white-square-format-john-farnan.jpg";

const drawerWidth = 240;

const tabStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const clippedDrawerStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#000000"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerItems: {
        padding: 25,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    home: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
});

const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "Home"
        };
    }

    choosePage(pageName) {
        const {classes} = this.props;
        switch (pageName) {
            case "Home":
                return (
                    <main className={classes.home}>
                        <div className={classes.toolbar}/>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <Particles
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 80,
                                            "density": {
                                                "enable": true,
                                                "value_area": 800
                                            }
                                        },
                                        "color": {
                                            "value": "#000000"
                                        },
                                        "shape": {
                                            "type": "circle",
                                            "stroke": {
                                                "width": 0,
                                                "color": "#000000"
                                            },
                                            "polygon": {
                                                "nb_sides": 5
                                            },
                                            "image": {
                                                "src": "img/github.svg",
                                                "width": 100,
                                                "height": 100
                                            }
                                        },
                                        "opacity": {
                                            "value": 0.5,
                                            "random": false,
                                            "anim": {
                                                "enable": false,
                                                "speed": 1,
                                                "opacity_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "size": {
                                            "value": 3,
                                            "random": true,
                                            "anim": {
                                                "enable": false,
                                                "speed": 40,
                                                "size_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "line_linked": {
                                            "enable": true,
                                            "distance": 150,
                                            "color": "#111111",
                                            "opacity": 0.4,
                                            "width": 1
                                        },
                                        "move": {
                                            "enable": true,
                                            "speed": 6,
                                            "direction": "none",
                                            "random": false,
                                            "straight": false,
                                            "out_mode": "out",
                                            "bounce": false,
                                            "attract": {
                                                "enable": false,
                                                "rotateX": 600,
                                                "rotateY": 1200
                                            }
                                        }
                                    },
                                    "interactivity": {
                                        "detect_on": "canvas",
                                        "events": {
                                            "onhover": {
                                                "enable": true,
                                                "mode": "repulse"
                                            },
                                            "onclick": {
                                                "enable": true,
                                                "mode": "push"
                                            },
                                            "resize": true
                                        },
                                        "modes": {
                                            "grab": {
                                                "distance": 400,
                                                "line_linked": {
                                                    "opacity": 1
                                                }
                                            },
                                            "bubble": {
                                                "distance": 400,
                                                "size": 40,
                                                "duration": 2,
                                                "opacity": 8,
                                                "speed": 3
                                            },
                                            "repulse": {
                                                "distance": 200,
                                                "duration": 0.4
                                            },
                                            "push": {
                                                "particles_nb": 4
                                            },
                                            "remove": {
                                                "particles_nb": 2
                                            }
                                        }
                                    },
                                    "retina_detect": true
                                }}
                            />
                        </div>
                        <Fade in={true} timeout={5000}>
                            <p style={{
                                position: "absolute", "font-family": "Helvetica Neue",
                                top: "35%",
                                left: "50%",
                                transform: "translate(-35%)",
                                "white-space": "nowrap",
                                "font-size": 50
                            }}>Skipping class has never been harder.</p>
                        </Fade>
                        <Fade in={true} timeout={5000}>
                            <p style={{
                                position: "absolute", "font-family": "Helvetica Neue",
                                top: "55%",
                                left: "50%",
                                transform: "translate(-35%)",
                                "font-size": 20
                            }}>Locachain brings the power of the blockchain to a robust peer-to-peer and geofencing
                                based
                                attendance
                                validation scheme.</p>
                        </Fade>
                    </main>
                );
            case "Create a class":
                return (
                    <main className={classes.home}>
                        <div className={classes.toolbar}/>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <Particles
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 80,
                                            "density": {
                                                "enable": true,
                                                "value_area": 800
                                            }
                                        },
                                        "color": {
                                            "value": "#000000"
                                        },
                                        "shape": {
                                            "type": "circle",
                                            "stroke": {
                                                "width": 0,
                                                "color": "#000000"
                                            },
                                            "polygon": {
                                                "nb_sides": 5
                                            },
                                            "image": {
                                                "src": "img/github.svg",
                                                "width": 100,
                                                "height": 100
                                            }
                                        },
                                        "opacity": {
                                            "value": 0.5,
                                            "random": false,
                                            "anim": {
                                                "enable": false,
                                                "speed": 1,
                                                "opacity_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "size": {
                                            "value": 3,
                                            "random": true,
                                            "anim": {
                                                "enable": false,
                                                "speed": 40,
                                                "size_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "line_linked": {
                                            "enable": true,
                                            "distance": 150,
                                            "color": "#111111",
                                            "opacity": 0.4,
                                            "width": 1
                                        },
                                        "move": {
                                            "enable": true,
                                            "speed": 6,
                                            "direction": "none",
                                            "random": false,
                                            "straight": false,
                                            "out_mode": "out",
                                            "bounce": false,
                                            "attract": {
                                                "enable": false,
                                                "rotateX": 600,
                                                "rotateY": 1200
                                            }
                                        }
                                    },
                                    "interactivity": {
                                        "detect_on": "canvas",
                                        "events": {
                                            "onhover": {
                                                "enable": true,
                                                "mode": "repulse"
                                            },
                                            "onclick": {
                                                "enable": true,
                                                "mode": "push"
                                            },
                                            "resize": true
                                        },
                                        "modes": {
                                            "grab": {
                                                "distance": 400,
                                                "line_linked": {
                                                    "opacity": 1
                                                }
                                            },
                                            "bubble": {
                                                "distance": 400,
                                                "size": 40,
                                                "duration": 2,
                                                "opacity": 8,
                                                "speed": 3
                                            },
                                            "repulse": {
                                                "distance": 200,
                                                "duration": 0.4
                                            },
                                            "push": {
                                                "particles_nb": 4
                                            },
                                            "remove": {
                                                "particles_nb": 2
                                            }
                                        }
                                    },
                                    "retina_detect": true
                                }}
                            />
                        </div>
                        <Create style={{position: "absolute", "padding-top": 35}}/>
                    </main>);
            case "View Live Attendance":
                return (
                    <main className={classes.home}>
                        <div className={classes.toolbar}/>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <Particles
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 80,
                                            "density": {
                                                "enable": true,
                                                "value_area": 800
                                            }
                                        },
                                        "color": {
                                            "value": "#000000"
                                        },
                                        "shape": {
                                            "type": "circle",
                                            "stroke": {
                                                "width": 0,
                                                "color": "#000000"
                                            },
                                            "polygon": {
                                                "nb_sides": 5
                                            },
                                            "image": {
                                                "src": "img/github.svg",
                                                "width": 100,
                                                "height": 100
                                            }
                                        },
                                        "opacity": {
                                            "value": 0.05,
                                            "random": false,
                                            "anim": {
                                                "enable": false,
                                                "speed": 1,
                                                "opacity_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "size": {
                                            "value": 3,
                                            "random": true,
                                            "anim": {
                                                "enable": false,
                                                "speed": 40,
                                                "size_min": 0.1,
                                                "sync": false
                                            }
                                        },
                                        "line_linked": {
                                            "enable": true,
                                            "distance": 150,
                                            "color": "#111111",
                                            "opacity": 0.05,
                                            "width": 1
                                        },
                                        "move": {
                                            "enable": true,
                                            "speed": 6,
                                            "direction": "none",
                                            "random": false,
                                            "straight": false,
                                            "out_mode": "out",
                                            "bounce": false,
                                            "attract": {
                                                "enable": false,
                                                "rotateX": 600,
                                                "rotateY": 1200
                                            }
                                        }
                                    },
                                    "interactivity": {
                                        "detect_on": "canvas",
                                        "events": {
                                            "onhover": {
                                                "enable": false,
                                                "mode": "repulse"
                                            },
                                            "onclick": {
                                                "enable": false,
                                                "mode": "push"
                                            },
                                            "resize": true
                                        },
                                        "modes": {
                                            "grab": {
                                                "distance": 400,
                                                "line_linked": {
                                                    "opacity": 1
                                                }
                                            },
                                            "bubble": {
                                                "distance": 400,
                                                "size": 40,
                                                "duration": 2,
                                                "opacity": 8,
                                                "speed": 3
                                            },
                                            "repulse": {
                                                "distance": 200,
                                                "duration": 0.4
                                            },
                                            "push": {
                                                "particles_nb": 4
                                            },
                                            "remove": {
                                                "particles_nb": 2
                                            }
                                        }
                                    },
                                    "retina_detect": true
                                }}
                            />
                        </div>
                        <Live style={{"padding-top": 35}}/>
                    </main>);
            case "About us":
                return (
                    <main className={classes.nonhomePage}>
                        <Live/>
                    </main>);
            case "Attendance Analytics":
                return (
                    <main className={classes.nonhomePage}>
                        <Analytics/>
                    </main>);
            default:
                return (
                    <main className={classes.nonhomePage}>
                        <Live/>
                    </main>);

        }
    }

    render() {
        const {classes} = this.props;
        let page = this.choosePage(this.state.page);
        return (<div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Locachain
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <List>
                        {['Home', 'Create a class', 'View Live Attendance', 'Attendance Analytics', 'About Us'].map((text, index) => (
                            <ListItem button key={text} className={classes.drawerItems} onClick={() => {
                                this.setState({page: text});
                            }}>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </Drawer>
                {page}
            </div>
        );
    }

}

export default withStyles(clippedDrawerStyles)

(
    App
)
;
