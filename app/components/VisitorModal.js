import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Modal from 'react-modal';
import VisitorItem from './VisitorItem';
import ActionRecordVoiceOver from 'material-ui/lib/svg-icons/action/record-voice-over';
import Clear from 'material-ui/lib/svg-icons/content/clear';


export default class VisitorModal extends Component {
  closeModal = () => {
        this.props.close();
    }
    
  checkIn = (data) => {
    if(data.expecting) {
      this.props.notifyEmployee(data);
    } else {
      this.props.notifyGroup();
    }
  }
    
  renderData() {
      return this.props.visitors.map((data, index) => {
          let label = "Are you " + data.expecting + " looking for " + data.firstName + "?";
          return (
              <VisitorItem key={index} data={data} label={label} checkIn={this.checkIn} />
          )
      })
  }

  render() {

    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal}
        style={modalStyle} >
        <div>
          <RaisedButton
              backgroundColor="#c0c1c2"
              label="Cancel"
              labelColor="#000"
              labelStyle={buttonStyle.cancel.label}
              style={buttonStyle.cancel.button}
              onClick={this.closeModal}
              icon={<Clear />}
            />
            <div style={modalStyle.buttonGroup}>
              { this.renderData() }
            </div>
           <div>
           <RaisedButton
              backgroundColor="#bf871f"
              label="Notify someone else"
              labelColor="#FFF"
              labelStyle={buttonStyle.label}
              style={buttonStyle.button}
              onClick={this.checkIn}
              icon={<ActionRecordVoiceOver />}
            />
            </div>
           </div>
      </Modal>
    );
  }
}

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(36, 36, 36,0.9)'
  },
  content : {
    position                   : 'absolute',
    textAlign                  : 'center',
    top                        : '40px',
    left                       : '0px',
    right                      : '0px',
    bottom                     : '40px',
    border                     : '0px',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0px',
    outline                    : 'none',
    padding                    : '0px',
    backgroundColor   : 'rgba(36, 36, 36, 0.25)'
  },
  buttonGroup : {
    marginTop: '60px'
  }
}

const buttonStyle = {
  button : {
    bottom: '20px',
    height: '80px',
    width: '400px'
  },
  label : {
    fontSize: '25px'
  },
  cancel : {
    button : {
      position: 'fixed',
      top: '20px',
      left: '20px',
      height: '60px'
    },
    label : {
      fontSize: '16px'
    }
  }
}