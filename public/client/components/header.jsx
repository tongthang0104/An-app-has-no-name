import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  forceUpdate() {
    return this.renderStatus();
  }
  renderStatus() {
    if(this.props.loginStatus){
      return (
        <div>{this.props.loginStatus.data}</div>
      )
    }
    if(this.props.signupStatus){
      return (
        <div>{this.props.signupStatus.data}</div>
      )
    }
    return <h5 className="auth-nav">Signin or Signup to save score!</h5>
  }

  // shouldComponentUpdate() {
  //   this.renderStatus();
  // }

  render() {
    return (
      <nav className="navbar navbar-default navbar-top">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li >
              <Link className="li-header" to="/">Home</Link>
            </li>
            <li>
              <Link to="/scores/leaderboard">Leaderboard</Link>
            </li>
            <div className="auth-nav">
            <li>
              <Link to="/users/signup">Create Account</Link>
            </li>
            <li>
              <Link to="/users/signin">Signin</Link>
            </li>
            <li>
              <Link to="/users/signout">Signout</Link>
            </li>
            </div>
            <span >{this.forceUpdate()}</span>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.SigninReducer,
    signupStatus: state.AuthReducer,
  };
}

export default connect(mapStateToProps)(Header);
