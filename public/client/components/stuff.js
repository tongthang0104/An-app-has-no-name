import React, { Component }  from 'react';
import ProfileList from '../containers/profile-list';
import ProfileDetail from '../containers/profile-detail';
import SearchBar from '../containers/search_bar';


export default class App extends Component {
  render(){
    return (
      <div>
        <SearchBar />
        <div>
          <ProfileList />
          <ProfileDetail />
        </div>
      </div>
    );
  }
}
