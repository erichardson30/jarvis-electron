import React, { Component } from 'react';
import styles from './Home.css';
import axios from 'axios';
import jarvis from 'file!../jarvis-bkrd.png';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
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
      notifyModalOpen: false,
      synth: null,
      voices: [],
      friday: 39,
      jarvis: 16
    }
  }

  componentDidMount() {
    debugger;
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
    //responsiveVoice.speak(message, (voice ? voice : "UK English Male"), {rate: 0.8});
    const talk = new SpeechSynthesisUtterance(message);
    if (voice.toLowerCase() == 'jarvis') {
      talk.voice = this.state.voices[this.state.jarvis];
      talk.rate = 0.8;
      talk.pitch = 0.8;
    } else if (voice.toLowerCase() == 'friday') {
       talk.voice = this.state.voices[this.state.friday];
    } else {
      talk.voice = this.state.voices[this.state.jarvis];
      talk.rate = 0.8;
      talk.pitch = 0.8;
    }

    this.state.synth.speak(talk);
  }

  closeModal = () => {
        this.setState({ modalIsOpen: false});
    }

    closeNotifyModal = () => {
      this.setState({ notifyModalOpen: false });
    }

  checkIn = () => {
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
    console.log("notifying slack channel")
    this.setState({ employeeName: 'someone', notifyModalOpen: true });
    const talk = new SpeechSynthesisUtterance("Thank you I will let someone know you are here.");
    talk.voice = this.state.voices[this.state.jarvis];
    talk.rate = 0.8;
    talk.pitch = 0.8;
    this.state.synth.speak(talk);
    // responsiveVoice.speak("Thank you I will let someone know you are here.", "UK English Male", {rate: 0.8});
    this.closeModal();
    let data = {
      firstName: 'Cardinal - RDU',
      channel: 'C44F3SSDD',
      expecting: 'A visitor',
      date: new Date(),
      checkedIn : true,
      checkedInDate : new Date()
    };
    Camera.takePicture(data);
  }

  notifyEmployee = (data) => {
    this.setState({ employeeName: data.firstName, notifyModalOpen: true });
    const talk = new SpeechSynthesisUtterance("Thank you. I will let " + data.firstName + "know you are here.");
    talk.voice = this.state.voices[this.state.jarvis];
    talk.rate = 0.8;
    talk.pitch = 0.8;
    this.state.synth.speak(talk);
    // responsiveVoice.speak("Thank you. I will let " + data.firstName + "know you are here.", "UK English Male", {rate: 0.8});
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
            notifyGroup = {this.notifyGroup} />
          <NotifyModal
            open={this.state.notifyModalOpen}
            closeModal={this.closeNotifyModal}
            employeeName = {this.state.employeeName} />
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
