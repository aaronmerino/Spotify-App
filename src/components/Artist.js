import React from "react";

class Artist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let artist = this.props.artist;

    return (
      <div className="artist">
        <img src={artist.images[0].url} />
        <div className="artist-info">
          <h3>
            <span className="label">NAME</span> 
            <a href={artist.external_urls.spotify}>
              {artist.name}
            </a>
          </h3>
        </div>
      </div>
    );
  }
}

export {Artist};