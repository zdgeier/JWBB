import React, {Component} from 'react';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Parallax} from "react-parallax";

import groupImg from '../images/team.jpg';
import nealImg from '../images/neal.jpg';
import zachImg from '../images/Zach_skinny.jpg';
import nickImg from '../images/Nick_skinny.jpg';
import jwImg from '../images/JW_skinny.jpg';
import mentorsImg from '../images/Mentors.jpg';
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
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 410}}>
                        <p style={{paddingTop: 35}}>
                        
                        JW and the Blockchain Bois is a team competing in the VT Blockchain Challenge. 
                        <br/>
                        <br/>
                        We are 4 passionate Virginia Tech Computer Science undergraduate students aiming to design and implement 
                        <br/>
                        an application using the EOS platform that truly benefits the VT community. To learn more about 
                        <br/>
                         our development process, check out our Twitter handle @JWBlockChainBo1.
                        <br/>
                        <br/>
                        <b>Special Thanks To:</b>
                        <br/>
                        <br/>
                        Dr. Kirk Cameron (CS@VT)
                        <br/>
                        Serguei and Zach (Block.one)
                        <br/>
                        Julia Costello and Amy (CS@VT)
                        <br/>
                        Greg (Block.one)
                        <br/>
                        An, Ryan, Bucky, John, and everyone from Block.one
                        <br/>
                        </p>
                    </div>
                    <Parallax bgImage={nealImg} bgImageStyle={{maxHeight: "150%", maxWidth: "100%"}}>
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 350}}>
                        <p style={{paddingTop: 35}}>
                            <b>Neal Mangaokar (Web Front-end + Web Back-end)</b>
                            <br/>
                            <br/>
                            Web Front-end Power: ⚔⚔⚔⚔⚔ ⚔⚔⚔⚔⚔
                            <br/>
                            Web Back-end Power: 🛡️🛡️🛡️🛡️🛡️ 🛡️🛡️🛡️🛡️🛡️
                            <br/>
                            🔰 Computer Science undergraduate at Virginia Tech
                            <br/>
                            🔰 Research Assistance for Dr. WHO?
                            <br/>
                            🔰 Level 21 Mage: unlimited Web Power with specialization in React
                            <br/>
                            🔰 Ranked No.1 for CS2505, CS2506, CS3114, CS3214 and more
                            <br/>
                            🔰 Gym Boi who drinks a gallon of milk per day
                            <br/>
                            🔰 Has a lot of fan girls
                            <br/>
                            🔰 Has a Dota addiction problem
                        </p>
                    </div>
                    <Parallax bgImage={zachImg}>
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 350}}>
                        <p style={{paddingTop: 35}}>
                            <b>Zachary Geier (Mobile Front-end + Mobile Back-end)</b>
                            <br/>
                            <br/>
                            Mobile Front-end Power: ⚔⚔⚔⚔⚔ ⚔⚔⚔⚔⚔
                            <br/>
                            Mobile Back-end Power: 🛡️🛡️🛡️🛡️🛡️ 🛡️🛡️🛡️🛡️🛡️
                            <br/>
                            🔰 Computer Science undergraduate at Virginia Tech
                            <br/>
                            🔰 University Honors + Years of Internship Experience
                            <br/>
                            🔰 Level 20 Warrior: your trustworthy and hardworking guild leader
                            <br/>
                            🔰 Winner of multiple hackathons + Designed game published on Steam
                            <br/>
                            🔰 Gym Boi who drinks a gallon of 2% milk per day
                            <br/>
                            🔰 Has one super fan girl
                            <br/>
                            🔰 Has a Rainbow Six Siege addiction problem
                        </p>
                    </div>
                    <Parallax bgImage={nickImg}>
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 350}}>
                        <p style={{paddingTop: 35}}>
                            <b>Nicolas Hardy (General Back-end + EOS)</b>
                            <br/>
                            <br/>
                            Back-end Power: ⚔⚔⚔⚔⚔ ⚔⚔⚔⚔⚔
                            <br/>
                            EOS Power: 🛡️🛡️🛡️🛡️🛡️ 🛡️🛡️🛡️🛡️🛡️
                            <br/>
                            🔰 Computer Science undergraduate at Virginia Tech
                            <br/>
                            🔰 Soon-to-be: Computer Science graduate at Virginia Tech
                            <br/>
                            🔰 Research Assistance for Dr. Kirk Cameron
                            <br/>
                            🔰 Level 21 Specialist: EOS Specialist, amazing back-end support
                            <br/>
                            🔰 Most reputable CS3214(System and Networking) Teaching Assistant
                            <br/>
                            🔰 Not a gym boi, drinks a concerning amount of Mountain Dew
                            <br/>
                            🔰 Has an anime addiction problem
                        </p>
                    </div>
                    <Parallax bgImage={jwImg}>
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 350}}>
                        <p style={{paddingTop: 35}}>
                            <b>Jiayi Lee (User Experience + Program Management)</b>
                            <br/>
                            <br/>
                            UX Power: ⚔⚔⚔⚔⚔ ⚔⚔⚔⚔⚔
                            <br/>
                            PM Power: 🛡️🛡️🛡️🛡️🛡️ 🛡️🛡️🛡️🛡️🛡️
                            <br/>
                            🔰 Computer Science undergraduate at Virginia Tech
                            <br/>
                            🔰 Research Assistance for Prof. Margaret Ellis
                            <br/>
                            🔰 Level 21 Support: handles anything that involves interacting with real human
                            <br/>
                            🔰 Food + Events (check out our social media! @JWBlockChainBo1)
                            <br/>
                            🔰 Completely re-designed CS2104 (Problem Solving In Computer Science)
                            <br/>
                            🔰 What is a gym?
                            <br/>
                            🔰 Has a Cities: Skylines addition problem
                        </p>
                    </div>
                    <Parallax bgImage={mentorsImg}>
                        <div style={{height: 550}}>
                        </div>
                    </Parallax>
                    <div style={{height: 210}}>
                        <p style={{paddingTop: 35}}>
                            <b>Serguei and Zach (Block.one Engineers)</b>
                            <br/>
                            <br/>
                            Serguei and Zach are our biggest supporters.
                            We really appreciate everything they have taught us --
                            <br/>
                            their unique insights on Blockchain and valuable industry experience were essential throughout the development process.
                        </p>
                    </div>
                </div>  
            </Fade>
        );
    }
}

export default withStyles(style)(About);