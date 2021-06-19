import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import SearchResults from "./search_results";

const useStyles = makeStyles({
  root: {
    marginTop: "5px",
    alignItems: "center",
  },
  search_bar: {
    display: "flex",
    "flex-direction": "row",
    maxWidth: 500,
    justify: "center",
    padding: 7,
    margin: "auto",
    "background-color": "white",
    borderRadius: 5,
  },
});

export default function SearchBar({ auth, onChange }) {
  const classes = useStyles();
  const { token } = auth;

  const [search_result, set_search_result] = useState([]);
  const [search_string, set_search_string] = useState("");
  const [selected_artists, set_selected_artists] = useState([]);

  async function spotify_search_artists() {
    const url = "https://api.spotify.com/v1/search";
    const search_query = encodeURIComponent(search_string);
    console.log("search_query", search_query);
    const search_type_query = "type=artist";
    console.log("token", token);
    const { data } = await axios.get(
      `${url}?q=${search_query}&${search_type_query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data && data.artists) {
      set_search_result(data.artists.items);
    }
  }

  useEffect(() => {
    onChange(selected_artists);
  }, [onChange, selected_artists]);

  console.log("search_result", search_result);

  return (
    <Grid
      container
      // style={{ "align-items": "flex-end" }}
      spacing={0}
      justify="center"
    >
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.search_bar}>
          <TextField
            id={"outlined-basic"}
            variant={"outlined"}
            label={"Search"}
            placeholder="Enter Artist Name"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => set_search_string(event.target.value)}
            value={search_string}
          ></TextField>
          <Button
            style={{
              marginLeft: 5,
              backgroundColor: "#1DB954",
              color: "white",
            }}
            onClick={spotify_search_artists}
          >
            <Search />
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        {selected_artists.map((artist, index) => (
          <Typography>
            {index + 1}. {artist}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12}>
        <SearchResults
          results={search_result}
          onChange={set_selected_artists}
        />
      </Grid>
    </Grid>
  );
}
