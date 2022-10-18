import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <div id="login-page">
        <div>
          <h1>Login to Spotify</h1>
          <a href="/login" className="btn btn-primary">Log in with Spotify</a>
        </div>
        
      </div>
    );
  }
}

export {LoginPage};