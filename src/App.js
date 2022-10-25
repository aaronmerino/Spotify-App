import React from "react";
import "./style.css";
import {UserTopTracks} from "./components/UserTopTracks.js";
import {UserProfile} from "./components/UserProfile.js";
import {LoginPage} from "./components/LoginPage.js";
import {UserCurrentPlayback} from "./components/UserCurrentPlayback.js";
import {Navbar} from "./components/Navbar.js";
import {MenuItems} from "./components/NavbarMenuItems.js";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comp = MenuItems[this.props.currentMenuItem].component;

    return (
      <div className="MainContent"> 
      {React.createElement(comp, 
        {
          accessToken: this.props.accessToken, 
          refreshToken: this.props.refreshToken
        }, 
        null)
      } 
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentMenuItem: 0};
    this.handleNavbarClick = this.handleNavbarClick.bind(this);

  }

  static getHashParams() {
    let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    let access_token = urlParams.get('access_token');
    let refresh_token = urlParams.get('refresh_token');
    let error = urlParams.get('error');
    let params = {
      access_token: access_token,
      refresh_token: refresh_token,
      error: error
    };

    return params;
  }

  handleNavbarClick(i) {
    this.setState({currentMenuItem: i});
  }

  render() {
    let params = App.getHashParams();

    if (params.error) {
      return(
        <div className="App">
          params.error
        </div>
      );
    }

    if (params.access_token && params.refresh_token) {
      return(
        <div className="App LoggedIn">
          <Navbar onHandleNavbarClick={this.handleNavbarClick} />
          
          <UserProfile  accessToken={params.access_token} 
                        refreshToken={params.refresh_token} />
                        
          <UserCurrentPlayback  accessToken={params.access_token} 
                        refreshToken={params.refresh_token} />

          <MainContent  accessToken={params.access_token} 
                          refreshToken={params.refresh_token} 
                          currentMenuItem={this.state.currentMenuItem}/>
        </div>
      );
  
    } else {
      return(
        <div className="App">
          <LoginPage />
        </div>
      );
    }
  }
}

export default App;