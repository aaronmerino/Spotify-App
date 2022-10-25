import React from "react";

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let track = this.props.track;
    let artists = track.artists.map( (artist, index) => <li key={index}><a href={artist.external_urls.spotify}>{artist.name}</a></li>);

    return (
      <div className="track">
        <img src={track.album.images[0].url} />
        <div className="track-info"> 
          <h3>
            <span className="label">NAME</span> 
            <a href={track.external_urls.spotify}>
              {track.name}
            </a>
          </h3>

          <h3>
            <span className="label">ALBUM</span> 
            <a href={track.album.external_urls.spotify}>
              {track.album.name}
            </a>
          </h3>

          <h3>
            <span className="label">ARTIST(S)</span> 
            <ul className="artists-list">{artists}</ul> 
          </h3>
          
        </div>

      </div>
    );
  }
}

export {Track};