import React from "react";
import "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div id="login">
        <h1>This is an example of the Authorization Code flow</h1>
        <a href="/login" className="btn btn-primary">Log in with Spotify</a>
      </div>
    );
  }
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({response: data});
    }).catch((reason) => {
      console.error(reason);
    });

    this.state = {
      response: null
    };
  }

  render() {
    let response = this.state.response;
    if (!response) {
      return (
        <div id="user-profile">
          <h1>User Profile</h1>
        </div>
      );
    } 
      
    return (
      <div id="user-profile">
        <h1>Logged in as {response.display_name}</h1>
        <img className="media-object" width="150" src={response.images[0].url} />
      </div>
    );
    
  }
}


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
          <UserProfile accessToken={params.access_token} 
                      refreshToken={params.refresh_token} />
        </div>
      );
  
    } else {
      return(
        <div className="App">
          <Login />
        </div>
      );
    }
  }
}

export default App;