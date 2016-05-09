import React, { Component } from 'react';
import styles from './Home.css';
import axios from 'axios';
import RaisedButton from 'material-ui/lib/raised-button';

export default class VisitorItem extends Component {
    
  checkIn = () => {
      this.props.checkIn(this.props.data);
      console.log(this.props.data);
  }
    
  
  render() {

    return (
      <div>
        <RaisedButton
            backgroundColor="#218EC1"
            label={this.props.label}
            labelColor="#FFF"
            onClick={this.checkIn}
        />
      </div>
    )
  }
}
