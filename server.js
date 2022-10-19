/**
 * Spotify Web API Authentication
 * 
 * Based on the article and implementation given here:
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 * https://github.com/spotify/web-api-auth-examples/tree/master/client_credentials
 * 
 */

const express = require('express');
const https = require('https');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const client_id = '1a0e86d1e6314915b19f43cd1dc69d0d'; // Your client id
const client_secret = '25de877534ed45af8c31787678e0bba4'; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

const app = express();

let stateKey = 'spotify_auth_state';

function genreateRandomString(length=16) {
  let str = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());


app.get('/login', (req, res) => {
  let state = genreateRandomString(16);
  res.cookie(stateKey, state);

  // redirect client to request authorization
  let scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state'
  let params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });
  
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

app.get('/callback', (req, res) => {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#error=state_mismatch');
  } else {
    res.clearCookie(stateKey);
    
    let authParam = Buffer.from(client_id + ':' + client_secret, 'utf8')
    let options = {
      host: 'accounts.spotify.com',
      path: '/api/token',
      headers: {
        'Authorization': 'Basic ' + authParam.toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    };

    let postData = new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    });

    let postReq = https.request(options, (response) => {
      let result = '';
      response.on('data', (chunk)=>{
        result += chunk;
      });

      response.on('end', ()=>{
        let body = JSON.parse(result);
        
        let params = new URLSearchParams({
          access_token: body.access_token,
          refresh_token: body.refresh_token
        });

        res.redirect('/#' + params.toString());
      });

      response.on('error', (err) => {
        res.redirect('/#error=' + err.message);
      });

    });
    
    console.log(postData.toString());
    postReq.write(postData.toString());
    postReq.end();
  }
});


console.log('Listening on 3000');
app.listen(3000);