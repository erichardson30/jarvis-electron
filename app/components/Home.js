import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import io from 'socket.io-client';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import fs from 'fs';

let socket = io(`http://10.104.100.30:8000`)

export default class Home extends Component {

  sendMessage = () => {
    fs.readFile('./app/ironman.jpg', function(err, buf) {
      socket.emit('image', { image: true, buffer: buf.toString('base64') });
    })
    
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
          <RaisedButton
            backgroundColor="#218EC1"
            className={styles.button}
            style={style}
            label="Let someone know I'm here" 
            labelColor="#FFF"
            onClick={this.sendMessage}
            icon={<ActionRecordVoiceOver />} 
          />
          <RaisedButton
            backgroundColor="#218EC1"
            className={styles.button}
            style={style2}
            label="Let someone know I'm here" 
            labelColor="#FFF"
            onClick={this.sendMessage}
            icon={<ActionRecordVoiceOver />} 
          />
        </div>
      </div>
    );
  }
}
const style = {
  position: 'fixed',
  bottom: '0px',
  left: '0px',
  height: '60px',
  width: '300px'
}
const style2 = {
  position: 'fixed',
  bottom: '0px',
  right: '0px',
  height: '60px',
  width: '300px'
}