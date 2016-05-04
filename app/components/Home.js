import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import Visitor from './Visitor';
import Motion from '../actions/motion';
import * as Camera from '../actions/camera';


// import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost/my_database');

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visitors: []
    };
  }

  sendMessage = () => {
    responsiveVoice.speak("Thank you. I will let someone know you are here.", "UK English Male", {rate: 0.8});
    Camera.takePicture();
  }

  loadExpectingVisitors = () => {


  }

  render() {

    var visitors = [];

    // visitors = this.state.visitors.map(visitor, i) {
    //   return (
    //     <Visitor data=visitor index=(i+ 1) />
    //   );
    // }

    return (
      <div>
        <div className={styles.container}>
        <img src="./img/Cardinal.png" alt="Cardinal" className={styles.logo} />

          <RaisedButton
            backgroundColor="#218EC1"
            className={styles.button}
            style={style}
            label="Let someone know I'm here"
            labelColor="#FFF"
            onClick={this.sendMessage}
            icon={<ActionRecordVoiceOver />}
          />

          <Visitor />

          <div>
            {visitors}
          </div>

        </div>
      </div>
    );
  }
}

const style = {
  position: 'fixed',
  bottom: '20px',
  left: '240px',
  height: '60px',
  width: '400px'
}
