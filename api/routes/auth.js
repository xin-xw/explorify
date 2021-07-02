const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();
/*

(how we get the big cheese) workflow explained:

1. user goes to /login via button on page
2. we res.redirect them to spotify.com/authorize
3. upon successful auth, SPOTIFY redirects them to /callback
4. in callback, we request refresh and access tokens
5. we then send these to user (via cookies) so they can hold onto them for us 
6. user is sent playlist_picker.html so they can send us tunes
7. user sends us playlist! (or liked songs or listening history)(for now just playlist)
8. we page spotify for artist/genre, tracks/features

b. if necessary, we can refresh access w/ refresh token

*/

// Have our application request authorization, and then have the user log in via spotify’s auth flow
router.get("/login", (req, res) => {
  var scope = "playlist-modify-public"; // What we ask to see
  res.redirect(
    // 2. & 3.
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI, // where we go after successful login
    })}`
  );
});

// After we receive our code back from our authentication, we can use that to get an access and refresh token. The access token is what we need to get data from the Spotify Web API, such as searching for tracks and using the recommendations endpoint
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const grant_type = "authorization_code";

  const basicHeader = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type,
      code,
      redirect_uri,
    }),
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const sessionJWTObject = {
    token: data.access_token,
    // refresh_token: data.refresh_token,
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);
  return res.redirect("/");
});

// This endpoint is verifying the jwt-token that is inside of our session object, and if its valid then we send the contents to the client in the request. If it’s not there, we send back false.
router.get("/current-session", (req, res) => {
  jwt.verify(
    req.session.jwt,
    process.env.JWT_SECRET_KEY,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        res.send(false);
      } else {
        res.send(decodedToken);
      }
    }
  );
});

// This is an endpoint to simply destroy our jwt token, which we will use to determine whether or not the user is authenticated with Spotify.
router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect(`/`);
});

module.exports = router;
