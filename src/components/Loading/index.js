import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./loading.css";

class Loading extends Component {
  render() {
    return (
      <div>
        <Loader
          type="Rings"
          color="#000000"
          height={100}
          width={100}
          timeout={1000} //3 secs
          className="spinner"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Loading);