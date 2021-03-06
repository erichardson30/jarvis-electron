import React, { Component } from 'react';
import styles from './Home.css';
import axios from 'axios';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import Modal from 'react-modal';
import VisitorModal from './VisitorModal';
import NotifyModal from './NotifyModal';
import Motion from '../sensors/motion';
import * as Camera from '../sensors/camera';
import io from 'socket.io-client';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.socket = io(`http://jarviscsg.herokuapp.com:80`);
    this.state = {
      visitors: [],
      modalIsOpen: false,
      employeeName: null,
      notifyModalOpen: false
    }
  }

  componentDidMount() {
    this.setState({synth: window.speechSynthesis}, () => {
      this.setState({voices: this.state.synth.getVoices()});
    });
    
    this.socket.on('knock-knock', (event) => {
        this.knock(event);
      })
      this.socket.on('speak', (event) => {
        this.speak(event.message, event.voice);
      })
  }

  knock = (event) => {
    event.seeFront = true;
    Camera.takePicture(event);
  }

  speak = (message, voice) => {
    let jarvisVoice = 'UK English Male';
    if(voice && voice.toLowerCase() == 'friday') {
      jarvisVoice = 'UK English Female';
    }
    responsiveVoice.speak(message, jarvisVoice, {rate: 0.8});
  }

  closeModal = () => {
        this.setState({ modalIsOpen: false});
    }

    closeNotifyModal = () => {
      this.setState({ notifyModalOpen: false });
    }

    forceCloseNotifyModal = () => {
      setTimeout(this.closeNotifyModal(), 5000);
    }

  checkIn = () => {
    console.debug("GUEST CHECKED IN " + new Date());
    let self = this;

    axios.get('http://jarviscsg-api.herokuapp.com/api/schedules/now?officeLocation=RDU').then(function(response) {
      if (response.data.length > 0) {
        self.setState({
          visitors: response.data,
          modalIsOpen: true
        });
      } else {
        self.notifyGroup();
      }
    });
  }

  notifyGroup = () => {
    console.debug("ABOUT TO TAKE PICTURE " + new Date());
    let data = {
      firstName: 'Cardinal - RDU',
      channel: 'C44F3SSDD',
      expecting: 'A visitor',
      date: new Date(),
      checkedIn : true,
      checkedInDate : new Date()
    };
    Camera.takePicture(data);
    console.debug("NOTIFYING GROUP " + new Date());
    this.setState({ employeeName: 'someone', notifyModalOpen: true });
    responsiveVoice.speak("Thank you I will let someone know you are here.", "UK English Male", {rate: 0.8});
    this.closeModal();
  }

  notifyEmployee = (data) => {
    Camera.takePicture(data);
    this.setState({ employeeName: data.firstName, notifyModalOpen: true });
    responsiveVoice.speak("Thank you. I will let " + data.firstName + "know you are here.", "UK English Male", {rate: 0.8});
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
          />
          <VisitorModal
            open={this.state.modalIsOpen}
            close = {this.closeModal}
            visitors = {this.state.visitors}
            notifyEmployee = {this.notifyEmployee}
            notifyGroup = {this.notifyGroup} />
          <NotifyModal
            open={this.state.notifyModalOpen}
            closeModal={this.closeNotifyModal}
            forceClose={this.forceCloseNotifyModal}
            employeeName = {this.state.employeeName}
            timeout = {5000} />
        </div>
      </div>
    );
  }
}

const style = {
  button : {
    display: 'block',
    height: '200px',
    width: '90%',
    bottom: '2%',
    position: 'fixed',
    marginLeft: '5%',
    borderRadius: '20px'
  },
  label : {
    fontSize: '90px'
  },
}
