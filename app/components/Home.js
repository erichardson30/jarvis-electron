import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import io from 'socket.io-client';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';

let socket = io(`http://localhost:8000`)

export default class Home extends Component {
  
  sendMessage = () => {
    socket.emit('notifyBot', "I'M HERE", function (err) {
      if (err) {
        return console.error("Socket error" + err);
      }
      callback();
    });
  }
  
  render() {
    return (
      <div>
        <div className={styles.container}>
        <img src="./img/Cardinal.png" alt="Cardinal" className={styles.logo} />
          <h2 className={styles.title}>Welcome</h2>
          <RaisedButton
            styles={styles.button}
            label="Let someone know I'm here" 
            onClick={this.sendMessage}
            icon={<ActionRecordVoiceOver />} 
          />
        </div>
      </div>
    );
  }
}
