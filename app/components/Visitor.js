import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import io from 'socket.io-client';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import * as Camera from '../actions/camera';
let socket = io(`http://10.104.100.30:8000`);

export default class Home extends Component {

  sendMessage = () => {
    Camera.takePicture();
  }

  render() {

    // parse this.props.data into text
    var label = "Click here if you are Jimmy Johns looking for Eric";
    var position = (this.props.index * 80) + 100;
    var top = position.toString() + 'px';

    const style = {
      position: 'fixed',
      top: top,
      left: '200px',
      height: '60px',
      width: '400px'
    }

    return (
      <div>
        <div className={styles.container}>
        <img src="./img/Cardinal.png" alt="Cardinal" className={styles.logo} />

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
      </div>
    );
  }
}
