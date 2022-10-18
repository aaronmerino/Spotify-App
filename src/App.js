import React from "react";
import "./style.css";
import {UserTopTracks} from "./components/UserTopTracks.js";
import {UserProfile} from "./components/UserProfile.js";
import {LoginPage} from "./components/LoginPage.js";


class App extends React.Component {
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
        <div className="App">
          <UserProfile  accessToken={params.access_token} 
                        refreshToken={params.refresh_token} />
          <UserTopTracks  accessToken={params.access_token} 
                          refreshToken={params.refresh_token} />
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