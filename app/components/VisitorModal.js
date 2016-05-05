import React, { Component } from 'react';
import styles from './Home.css';
import axios from 'axios';
import RaisedButton from 'material-ui/lib/raised-button';
import Modal from 'react-modal';
import VisitorItem from './VisitorItem';
// import * as Camera from '../actions/camera';

export default class VisitorModal extends Component {
  closeModal = () => {
        this.props.close();
    }
    
  checkIn = (data) => {
      this.props.notifyEmployee(data);
  }
    
  renderData() {
      return this.props.visitors.map((data, index) => {
          let label = "Are you " + data.expecting + " looking for " + data.firstName + "?";
          return (
              <VisitorItem key={index} data={data} label={label} checkIn={this.checkIn}/>
          )
      })
  }

  render() {

    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal} >
        <h1>Modal</h1>
        { this.renderData() }
      </Modal>
    );
  }
}
