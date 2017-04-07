import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'react-material-icons/icons/navigation/close';
import Modal from 'react-modal';


export default class NotifyModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onAfterOpen={this.props.closeModal}
        onRequestClose={this.props.closeModal}
        closeTimeoutMS={5000}
        style={modalStyle} >
        <button type="button" style={buttonStyle} onClick={this.props.closeModal}><NavigationClose style={iconStyle}/></button>
        <div>
          <div style={textStyle}>
          Thank you, I will let {this.props.employeeName} know you are here.  
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
  }
}
const imgStyle = {
  marginTop: '10%'
}
const textStyle = {
  fontSize: '50px',
  marginTop: '50px'
}
const iconStyle = {
  fill: 'white'
}
const buttonStyle = {
  background: 'transparent',
  border: 'none',
  float: 'right'
}