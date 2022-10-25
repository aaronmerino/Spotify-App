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
        <div className="user-profile">
          <h1>...</h1>
        </div>
      );
    } 

    let response = this.state.response;
    
    if (response.images[0]) {
      return (
        <div className="user-profile">
          <img id="user-image" src={response.images[0].url} alt="profile picture" />
          <p>{response.display_name}</p>
          <p>country: {response.country}</p>
          <p>followers: {response.followers.total}</p>
        </div>
      );
    } else {
      return (
        <div className="user-profile">
          <div id="user-image">.</div>
          <p>{response.display_name}</p>
          <p>country: {response.country}</p>
          <p>followers: {response.followers.total}</p>
        </div>
      );
    }

    
  }
}

export {UserProfile};