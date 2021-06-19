import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Card,
  Paper,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import "tachyons";

import SearchBar from "./component/search_bar";
import RecBoards from "./component/rec_boards";
import RecommendationResults from "./component/rec_results";
// import GetRecommendations from "./component/get_recommendations";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  title: {
    display: "grid",
    placeItems: "center",
    fontSize: "3rem",
  },
});

const Explorify = ({ auth }) => {
  const classes = useStyles();
  const { token } = auth;
  const [rec_values, set_rec_values] = useState([]);
  const [selected_artists, set_selected_artists] = useState([]);
  const [results, set_results] = useState(null);

  console.log("sa", selected_artists);
  console.log("rv", rec_values);
  console.log("a", auth);

  const get_recommendations = async () => {
    const url = "https://api.spotify.com/v1/recommendations";
    let selected_artists_string;
    if (selected_artists_string < 0) {
      return;
    } else {
      selected_artists_string = `seed_artists=${selected_artists.join(",")}`;
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
      `${url}?${selected_artists_string}&${min_string}&${max_string}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    set_results(data);
  };

  return (
    <Grid
      container
      style={{ padding: 10 }}
      spacing={10}
      className={classes.root}
    >
      <Grid item xs={12}>
        <h1 className={classes.title}>explorify</h1>
      </Grid>
      <SearchBar auth={auth} onChange={set_selected_artists}></SearchBar>
      <Grid item xs={8}>
        <RecBoards onChange={set_rec_values} />
      </Grid>
      <Grid item xs={4}>
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
      </Grid>
      <Grid item xs={12}>
        {results && <RecommendationResults results={results} />}
      </Grid>
    </Grid>
  );
};

export default Explorify;
