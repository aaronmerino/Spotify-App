import React from "react";
import "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div id="login">
        <h1>Login to Spotify</h1>
        <a href="/login" className="btn btn-primary">Log in with Spotify</a>
      </div>
    );
  }
}

class UserTopTracks extends React.Component {
  constructor(props) {
    super(props);
    let query = new URLSearchParams({
      limit: 10,
      offset: 0,
      time_range: 'short_term'
    });

    fetch(`https://api.spotify.com/v1/me/top/tracks?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({response: data});
    }).catch((reason) => {
      console.log('error');
      console.error(reason);
    });

    this.state = {
      response: null
    };
  }

  render(){
    let response = this.state.response;
    
    return (
      <div id="user-top-tracks">

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
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({response: data});
    }).catch((reason) => {
      console.log('error');
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
          <h1>...</h1>
        </div>
      );
    } 

    if (response.images[0]) {
      return (
        <div id="user-profile">
          <img className="user-image" src={response.images[0].url} alt="profile picture" />
          <h1>{response.display_name}</h1>
          <h2>country: {response.country}</h2>
          <h2>followers: {response.followers.total}</h2>
        </div>
      );
    } else {
      return (
        <div id="user-profile">
          <div className="user-image">.</div>
          <h1>{response.display_name}</h1>
          <h2>country: {response.country}</h2>
          <h2>followers: {response.followers.total}</h2>
        </div>
      );
    }

    
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
          <UserProfile  accessToken={params.access_token} 
                        refreshToken={params.refresh_token} />
          <UserTopTracks  accessToken={params.access_token} 
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