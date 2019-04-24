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
                        <div style={{height: 500}}>
                        </div>
                    </Parallax>
                    <div style={{height: 350}}>
                        <p style={{paddingTop: 35}}>
                            What the fuck did you just fucking say about me, you little bitch? I'll have you know I
                            graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids
                            on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm
                            the top sniper in the entire US armed forces. You are nothing to me but just another target.
                            I will wipe you the fuck out with precision the likes of which has never been seen before on
                            this Earth, mark my fucking words. You think you can get away with saying that shit to me
                            over the Internet? Think again, fucker. As we speak I am contacting my secret network of
                            spies across the USA and your IP is being traced right now so you better prepare for the
                            storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're
                            fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred
                            ways, and that's just with my bare hands. Not only am I extensively trained in unarmed
                            combat, but I have access to the entire arsenal of the United States Marine Corps and I will
                            use it to its full extent to wipe your miserable ass off the face of the continent, you
                            little shit. If only you could have known what unholy retribution your little "clever"
                            comment was about to bring down upon you, maybe you would have held your fucking tongue. But
                            you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit
                            fury all over you and you will drown in it. You're fucking dead, kiddo.
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
                </div>
            </Fade>
        );
    }
}

export default withStyles(style)(About);