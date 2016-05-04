import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import io from 'socket.io-client';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import * as Camera from '../actions/camera';
let socket = io(`https://jarviscsg.herokuapp.com:13397`);

export default class Home extends Component {

  sendMessage = () => {
    responsiveVoice.speak("Thank you. I will let Eric know you are here.", "UK English Male", {rate: 0.8});
    socket.emit('notifyBot', "ERIC, your sub is HERE", function (err) {
      if (err) {
        return console.error("Socket error" + err);
      }
      callback();
    });
    Camera.takePicture();
  }

  render() {

    // parse this.props.data into text
    var label = "Are you Jimmy Johns looking for Eric";
    var position = (this.props.index * 80) + 100;
    var bottom = position.toString() + 'px';

    const style = {
      position: 'fixed',
      bottom: bottom,
      left: '240px',
      height: '60px',
      width: '400px'
    }

    return (
      <div>
          <RaisedButton
            backgroundColor="#218EC1"
            className={styles.button}
            style={style}
            label={label}
            labelColor="#FFF"
            onClick={this.sendMessage}
            icon={<ActionRecordVoiceOver />}
          />
      </div>
    );
  }
}
