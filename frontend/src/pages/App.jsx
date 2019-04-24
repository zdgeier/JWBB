import React from 'react';

// material-ui dependencies
import {withStyles} from '@material-ui/core/styles';

import Create from './Create.jsx'
import Analytics from "./Analytics.jsx";
import Live from "./Live";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Drawer from "@material-ui/core/Drawer/Drawer";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import Fade from "@material-ui/core/Fade/Fade";
import Particles from "react-particles-js";
import About from "./About";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerItems: {
        padding: 35,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    home: {
        flexGrow: 1,
    },
    logo: {
        width: "70px",
        height: "70px",
        "justify-content": "center",
    },
    toolbar: theme.mixins.toolbar,
});

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
                                position: "absolute", "fontFamily": "Helvetica Neue",
                                top: "35%",
                                left: "50%",
                                transform: "translate(-35%)",
                                "whiteSpace": "nowrap",
                                "fontSize": 50
                            }}>Skipping class has never been harder.</p>
                        </Fade>
                        <Fade in={true} timeout={5000}>
                            <p style={{
                                position: "absolute", "fontFamily": "Helvetica Neue",
                                top: "55%",
                                left: "50%",
                                transform: "translate(-35%)",
                                "fontSize": 20
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
                                            "value": 0.1,
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
                                            "opacity": 0.1,
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
                        <Create style={{position: "absolute", "padding-top": 15}}/>
                    </main>);
            case "View Live Attendance":
                return (
                    <main className={classes.home}>
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
                        <Live style={{"padding-top": 15}}/>
                    </main>);
            case "About Us":
                return (
                    <main className={classes.home}>
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
                        <About/>
                    </main>);
            case "Attendance Analytics":
                return (
                    <main className={classes.home}>
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
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <List>
                        <ListItem style={{justifyContent: "center", paddingBottom: '0'}}>
                            <p>Powered by</p>
                        </ListItem>
                        <ListItem style={{justifyContent: "center", paddingTop: '0'}}>
                            <img alt={""} className={classes.logo}
                                 src="https://res.cloudinary.com/teepublic/image/private/s--e9T59x_f--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1548201494/production/designs/4060539_0.jpg"
                            />
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        {['Home', 'Create a class', 'View Live Attendance', 'Attendance Analytics', 'About Us'].map((text) => (
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

export default withStyles(styles)(App);
