import React, { Component } from 'react';
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
            backgroundColor="#207aa4"
            label={this.props.label}
            style={style}
            labelColor="#FFF"
            labelStyle = {labelStyle}
            onClick={this.checkIn}
        />
      </div>
    )
  }
}

const style = {
  marginBottom : '20px',
  height : '70px',
}

const labelStyle = {
  fontSize: '25px'
}