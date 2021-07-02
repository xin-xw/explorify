import React, { useState, useRef } from "react";
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
  styled,
} from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import SearchBar from "./component/search_bar";
import RecBoards from "./component/rec_boards";
import RecommendationResults from "./component/rec_results";
import GetUserData from "./component/get_user_data";
import BookOfTrackAttributes from "./component/book_track_attribute";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import AddBoxIcon from "@material-ui/icons/AddBox";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

const theme = createMuiTheme({
  typography: {
    allVariants: {
      fontFamily: ["Inter", "Kiwi Maru"],
      color: "black",
    },
  },
  palette: {
    background: {
      default: "#6b705c",
    },
    action: {
      disabledBackground: "#EBEBE4",
      disabled: "#000",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiSlider: {
      root: {
        // color: "#3880ff",
        height: 5,
        padding: "15px 0",
        width: "95%",
        // "&$disabled": {
        //   color: "#e6e4df",
        // },
      },
      switchBase: {
        // Controls default (unchecked) color for the thumb
        // color: "#ccc",
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: "#f2ff00",
        },
      },
      thumb: {
        height: 13,
        width: 13,
        // size: 50,
        // marginTop: -8,
        // marginLeft: -12,
        // color: "#2B2D25",
        border: "5px solid currentColor",
        "&:focus, &:hover, &$active": {
          boxShadow: "inherit",
        },
        "&$disabled": {
          opacity: 0.5,
          // color: "#e6e4df",
        },
      },
      track: {
        // color: "#2B2D25",
        height: 5,
        borderRadius: 4,
        "&$disabled": {
          opacity: 0.3,
          color: "#e6e4df",
        },
      },
      rail: {
        color: "#FFE8D6",
        height: 5,
        borderRadius: 4,
        // "&$disabled": {
        //   color: "#e6e4df",
        // },
      },
      valueLabel: { left: "calc(-50% - 12px)", color: "#2B2D25" },
    },
  },
});

const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "#C5C8BC",
    // border: "2px solid lightgreen",
    color: "#000",
    fontFamily: "Inter",
    fontSize: "15px",
    textAlign: "center",
  },
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: 10,
    spacing: 10,
    alignItems: "center",
    justify: "center",
    direction: "row",
  },
  gridItem: {
    paddingTop: 30,
    marginBottom: -10,
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
    padding: 10,
    maxWidth: 1000,
    marginBottom: 50,
    backgroundColor: "#ddbea9",
    borderRadius: 10,
  },
  step_header: {
    color: "black",
    textAlign: "left",
    fontSize: "1.7em",
    marginBottom: 10,
    fontWeight: "700",
  },
  step_desc: {
    color: "black",
    textAlign: "left",
    fontSize: "1.2em",
    marginBottom: 30,
    lineHeight: 1.5,
  },
  card: {
    // backgroundColor: "FFB4A2",
  },
  get_rec_button: {
    // background: "linear-gradient(to right, #ff9966, #ff5e62)",
    background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .2)",
    height: 50,
    // padding: "0 30px",
    fontSize: "1.2em",
  },
  button: {
    "&$disabled": {
      backgroundColor: "#EBEBE4",
      color: "#EBEBE4",
    },
  },
}));

const Explorify = ({ auth }) => {
  const classes = useStyles();
  const { token } = auth;

  const [user_id, set_user_id] = useState("");
  const [rec_values, set_rec_values] = useState([]);
  const [results, set_results] = useState(null);
  const [selected_seeds, set_selected_seeds] = useState([]);
  const [playlist_id, set_playlist_id] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [preventGetYourResults, setPreventGetYourResults] = useState(true);
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  // console.log("rv", rec_values);
  // console.log("user_id", user_id);
  // console.log("results");

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
    // console.log("data", data, results);
    // const uri = results.tracks.map((r) => "spotify:track:" + r.id);
    // console.log(uri);
  };

  const create_playlist = async () => {
    setDisabled(true);
    setPreventGetYourResults(false);
    openSnackbar("Successfully created playlist on your Spotify");
    const url = "https://api.spotify.com/v1/users/";
    const playlist_name = "brought to you by explorify";
    // const playlist_desc = "generated at ";
    return await axios
      .post(
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
      )
      .then((data) => set_playlist_id(data.data.id));

    // set_playlist_id(data.id);
    // return export_to_playlist();

    /* Add songs to playlist */
  };

  // const export_to_playlist = async () => {
  async function export_to_playlist() {
    // const playlist_id = await set_playlist_id;
    // console.log(playlist_id);

    const url = "https://api.spotify.com/v1/playlists/";
    const uri = results.tracks.map((r) => "spotify:track:" + r.id);
    const euri = encodeURIComponent(uri);
    // console.log(uri);
    const { data } = await axios
      .post(`${url}${playlist_id}/tracks?uris=${euri}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(openSnackbar("Successfully exported results to your Spotify"));

    // .try(openSnackbar("Error, cannot export results to your Spotify"))
    // if (data) {
    //   console.log("success", data);
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <GetUserData auth={auth} onChange={set_user_id}></GetUserData>
        </Grid>
        <Grid item xs={12} align="center">
          <Box className={classes.card}>
            <Card className={classes.step_root}>
              <CardContent className={classes.card_content}>
                <Typography className={classes.step_header}>
                  Step 1: Input Your Seeds
                </Typography>
                <Typography className={classes.step_desc}>
                  Include up to <b>5 seeds</b>, these "seeds" will serve as
                  reference tracks for the basis of your new set of recommended
                  songs. <br></br>Go ahead and search for some songs! When you
                  are done, scroll down to the next step.
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
          <Box className={classes.card}>
            <Card className={classes.step_root}>
              <CardContent className={classes.card_content}>
                <Typography className={classes.step_header}>
                  Step 2: Learn About Track Attributes
                </Typography>
                <Typography className={classes.step_desc}>
                  Spotify provides audio features and analysis for every single
                  track in their database, but they restrict this data for only
                  developers to see.
                  <br></br>
                  These audio features and analysis are also known as{" "}
                  <b>track attributes</b>. <br></br>
                  With Explorify, you can adjust these track attributes to your
                  liking - leading you to explore more songs based on those
                  redeeming qualities in supplement to your reference tracks!
                  <br></br>
                  Go ahead and learn about these track attributes in the{" "}
                  <b>Book of Track Attributes</b>, then scroll down to the{" "}
                  <b>Control Panel</b> in Step 3 to modify them yourself.
                </Typography>
                {/* <Card className={classes.book}> */}

                <BookOfTrackAttributes />
                {/* </Card> */}
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box>
            <Card className={classes.step_root}>
              <CardContent>
                <Typography className={classes.step_header}>
                  Step 3: Fine Tune Your Track Attributes
                </Typography>
                <Typography
                  className={classes.step_desc}
                  style={{ paddingBottom: 15 }}
                >
                  In this step, you have the ability to fine tune specific track
                  attributes that you want to look for in your recommended
                  songs. <br></br> Based on the track attributes up above, go
                  ahead and <b>check</b> the ones you want to modify. <br></br>
                  Then,{" "}
                  <b>
                    drag either just the min, the max, or both the min and max
                    sliders
                  </b>{" "}
                  to really specify your desired range!
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
                  Step 4: Get Your Results
                </Typography>
                <Typography
                  className={classes.step_desc}
                  style={{ paddingBottom: 15 }}
                >
                  Press the big <b>Get Recommendations</b> button to retrieve
                  your results! <br></br>
                  Go ahead and click the button as many times as you want until
                  you get a set of results that you like. <br></br> If you wish
                  to save your results, scroll down to{" "}
                  <b>Create Your Playlist</b> and <b>Export Your Results</b> to
                  the playlist!
                </Typography>
                <Button
                  className={classes.get_rec_button}
                  variant={"contained"}
                  onClick={get_recommendations}
                  style={{ marginTop: -25 }}
                >
                  {/* <Typography classes={classes.get_rec_button_font}> */}
                  GET RECOMMENDATIONS
                  {/* </Typography> */}
                  <DirectionsRunIcon style={{ marginLeft: 5, fontSize: 28 }} />
                </Button>
                {results && <RecommendationResults results={results} />}
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box>
            <Card className={classes.step_root}>
              <CardContent>
                <Typography className={classes.step_header}>
                  Step 5: Create Your Playlist and Export Your Results
                </Typography>
                <Typography
                  className={classes.step_desc}
                  style={{ paddingBottom: 15 }}
                >
                  Press <b>Create Playlist</b>. Then, press{" "}
                  <b>Export to Playlist</b>. <br></br>
                  <b>Note:</b> Once you have created your playlist, the{" "}
                  <b>Create Your Playlist</b> button will be disabled! But, the{" "}
                  <b>Export Your Results</b> button is still available.{" "}
                  <br></br> <b>What does this mean?</b> You can go back to
                  modify your reference tracks, tune your track attributes, and
                  get your recommendations over and over again. Once you are
                  ready, just press <b>Export To Playlist</b> again to keep
                  stacking your results top of the playlist that you already
                  created.
                  <br></br>This way, you'll have one gigantic playlist of new
                  songs that you can put on shuffle (and not 20 new playlists).
                </Typography>
                <Grid container className={classes.gridContainer}>
                  <Grid item align="center" xs={6}>
                    <Button
                      className={classes.get_rec_button}
                      variant={"contained"}
                      style={{
                        margin: "auto",

                        color: "#2b2d42",
                        justify: "center",
                      }}
                      disabled={disabled}
                      onClick={() => create_playlist()}
                    >
                      Create Your Playlist
                      <AddBoxIcon style={{ marginLeft: 5, fontSize: 28 }} />
                    </Button>
                  </Grid>
                  <Grid item align="center" xs={6}>
                    <Button
                      className={classes.get_rec_button}
                      variant={"contained"}
                      style={{
                        margin: "auto",

                        color: "#2b2d42",
                        justify: "center",
                      }}
                      disabled={preventGetYourResults}
                      onClick={export_to_playlist}
                    >
                      Export Your Results
                      <QueueMusicIcon style={{ marginLeft: 5, fontSize: 28 }} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography
            style={{
              fontFamily: "Inter",
              fontSize: "1.3em",
              fontWeight: "500",
              paddingBottom: "50px",
              color: "#fff",
            }}
          >
            Thank you for trying this out! Learn more about me at:{" "}
            <a href="https://www.xinwang.me" target="_blank" rel="noreferrer">
              https://www.xinwang.me.
            </a>
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Explorify;
