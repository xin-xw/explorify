import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import axios from "axios";

import SearchBar from "./component/search_bar";
import RecBoards from "./component/rec_boards";
import RecommendationResults from "./component/rec_results";
import GetUserData from "./component/get_user_data";
// import ExportToPlaylist from "./component/export_to_playlist";
// const querystring = require("querystring");

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Inter", "Kiwi Maru"],
  },
  palette: {
    background: {
      default: "white",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: 10,
    spacing: 10,
    alignItems: "center",
    direction: "row",
  },
  nav_title: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    placeItems: "left",
    fontSize: "1.5rem",
    fontFamily: "Kiwi Maru",
  },
  step_root: {
    // align: "center",
    maxWidth: 1000,
    marginBottom: 50,
  },
  step_header: {
    color: "black",
    textAlign: "left",
    fontSize: "1.55em",
    marginBottom: 10,
    fontWeight: "600",
  },
  step_desc: {
    color: "black",
    textAlign: "left",
    fontSize: "1.1em",
    marginBottom: 20,
  },
}));

const Explorify = ({ auth }) => {
  const classes = useStyles();
  const { token } = auth;

  const [user_id, set_user_id] = useState("");
  const [rec_values, set_rec_values] = useState([]);
  const [results, set_results] = useState(null);
  const [results_data, set_results_data] = useState([]);
  const [result_uri, set_result_uri] = useState("");
  const [selected_seeds, set_selected_seeds] = useState([]);
  const [playlist_id, set_playlist_id] = useState("");

  console.log("rv", rec_values);
  console.log("user_id", user_id);
  console.log("results");

  const get_recommendations = async () => {
    const url = "https://api.spotify.com/v1/recommendations";
    let seed_string;
    if (seed_string < 0) {
      return;
    } else {
      seed_string = `seed_tracks=${selected_seeds.join(",")}`;
    }
    let min = [];
    let max = [];
    Object.keys(rec_values).forEach((rec) => {
      if (rec_values[rec].enabled) {
        min.push(`min_${rec}=${rec_values[rec].value[0]}`);
        max.push(`min_${rec}=${rec_values[rec].value[1]}`);
      }
    });

    const min_string = min.join("&");
    const max_string = max.join("&");

    const { data } = await axios.get(
      `${url}?${seed_string}&${min_string}&${max_string}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    set_results(data);
    console.log("data", data, results);
    // const uri = results.tracks.map((r) => "spotify:track:" + r.id);
    // console.log(uri);
  };

  const create_playlist = async () => {
    const url = "https://api.spotify.com/v1/users/";
    const playlist_name = "playlist by explorify";
    // const playlist_desc = "generated at ";
    const { data } = await axios.post(
      `${url}${user_id}/playlists`,
      JSON.stringify({
        name: playlist_name,
        // epd,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    set_playlist_id(data.id);
    return export_to_playlist();

    /* Add songs to playlist */
  };

  const export_to_playlist = async () => {
    console.log("playlist_id", playlist_id);
    const url = "https://api.spotify.com/v1/playlists/";
    const uri = results.tracks.map((r) => "spotify:track:" + r.id);
    const euri = encodeURIComponent(uri);
    console.log(uri);
    const { data } = await axios.post(
      `${url}${playlist_id}/tracks?uris=${euri}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      console.log("success", data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
          <Typography className={classes.nav_title}>explorify</Typography>
        </Grid>
        <Grid item xs={12}>
          <GetUserData auth={auth} onChange={set_user_id}></GetUserData>
        </Grid>
        <Grid item xs={12} align="center">
          <Box>
            <Card className={classes.step_root}>
              <CardContent>
                <Typography className={classes.step_header}>
                  Step 1: Input Your Seeds
                </Typography>
                <Typography className={classes.step_desc}>
                  Include up to 5 "seeds", these seeds will serve as reference
                  tracks for the basis of your new set of recommended songs.{" "}
                  <br></br>Go ahead and search for some songs!
                </Typography>
                <SearchBar
                  auth={auth}
                  onChange={set_selected_seeds}
                ></SearchBar>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box>
            <Card className={classes.step_root}>
              <CardContent>
                <Typography className={classes.step_header}>
                  Step 2: Tune Track Attributes
                </Typography>
                <Typography className={classes.step_desc}>
                  In this step, you have the ability to fine tune specific track
                  attributes that you want to look for in your recommended
                  songs. <br></br> Make sure to check the track attribute you
                  want to modify. Then, drag the sliders to really specify your
                  desired range!
                </Typography>
                <RecBoards onChange={set_rec_values} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box>
            <Card className={classes.step_root}>
              <CardContent>
                <Typography className={classes.step_header}>
                  Step 3: Results
                </Typography>
                <Button
                  style={{
                    margin: "auto",
                    justify: "center",
                    backgroundColor: "#1DB954",
                    color: "white",
                  }}
                  variant={"contained"}
                  onClick={get_recommendations}
                >
                  Get Recommendations!
                </Button>
                {results && <RecommendationResults results={results} />}
                {results && (
                  <Button
                    style={{
                      margin: "auto",
                      justify: "center",
                      backgroundColor: "#1DB954",
                      color: "white",
                    }}
                    variant={"contained"}
                    onClick={function (event) {
                      create_playlist();
                    }}
                  >
                    Export to Playlist
                  </Button>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Explorify;
