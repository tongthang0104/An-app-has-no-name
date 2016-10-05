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
    return <h5 className="login-status">Signin or Signup to save score!</h5>
  }

  // shouldComponentUpdate() {
  //   this.renderStatus();
  // }

  render() {
    return (
      <nav className="navbar navbar-default navbar-top">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Trivardy</Link>
            </li>
            <li>
              <Link to="/users/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/users/signin">Sign in</Link>
            </li>
            <li>
              <Link to="/users/signout">Signout</Link>
            </li>
            <li>
              <Link to="/scores/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/about"> About Us </Link>
            </li>
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
