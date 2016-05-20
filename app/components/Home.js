import React, { Component } from 'react';
import styles from './Home.css';
import axios from 'axios';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import Modal from 'react-modal';
import VisitorModal from './VisitorModal';
import Motion from '../sensors/motion';
import * as Camera from '../sensors/camera';
import fs from 'fs';
import io from 'socket.io-client';
let socket = io(`http://jarviscsg.herokuapp.com:80`);

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visitors: [],
      modalIsOpen: false
    }
  }

  closeModal = () => {
        this.setState({ modalIsOpen: false});
    }

  checkIn = () => {
    let self = this;
    responsiveVoice.speak(" ");

    axios.get('http://jarviscsg-api.herokuapp.com/api/schedules/now').then(function(response) {
      if (response.data.length > 0) {
        self.setState({
          visitors: response.data,
          modalIsOpen: true
        });
      } else {
        self.notifyManager();
      }
    });
  }

  notifyManager = () => {

    console.log("notifying channel")
    responsiveVoice.speak("Thank you I will let someone know you are here.", "UK English Male", {rate: 0.8});
    this.closeModal();
    // need to create proper data object for office manager // jeff
    let data = {
      firstName: "channel"
    };
    Camera.takePicture(data);
  }

  notifyEmployee = (data) => {

    responsiveVoice.speak("Thank you. I will let " + data.firstName + "know you are here.", "UK English Male", {rate: 0.8});
    Camera.takePicture(data);
    this.closeModal();
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <img src="./img/Cardinal.png" alt="Cardinal" className={styles.logo} />
          <RaisedButton
            backgroundColor="#207aa4"
            className={styles.button}
            style={style.button}
            label="Check In"
            labelColor="#FFF"
            labelStyle={style.label}
            onClick={this.checkIn}
            icon={<ActionRecordVoiceOver style={style.icon}/>}
          />
          <VisitorModal
            open={this.state.modalIsOpen}
            close = {this.closeModal}
            visitors = {this.state.visitors}
            notifyEmployee = {this.notifyEmployee}
            notifyManager = {this.notifyManager} />
        </div>
      </div>
    );
  }
}

const style = {
  button : {
    position: 'fixed',
    bottom: '20px',
    marginLeft: '-150px',
    height: '80px',
    width: '300px'
  },
  label : {
    fontSize: '30px'
  },
  icon : {
    height : '40px',
    width : '40px'
  }
}
