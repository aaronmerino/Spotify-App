import React from "react";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      response: null
    };
  }

  componentDidMount() {
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
  }

  render() {
    if (!this.state.response) {
      return (
        <div id="user-profile">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;

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

export {UserProfile};