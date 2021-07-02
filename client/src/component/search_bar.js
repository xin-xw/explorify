import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import SearchResults from "./search_results";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

const useStyles = makeStyles({
  root: {
    marginTop: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  search_bar: {
    display: "flex",
    "flex-direction": "row",
    maxWidth: 500,
    justify: "center",
    padding: 7,
    margin: "auto",
    backgroundColor: "#ffe8d6",
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
    // minHeight: 150,
    marginBottom: 30,
  },
  search_result: {
    // paddingTop: -10,
    // marginTop: -20,
    color: "#000",
  },
  selected_seeds: {
    // paddingTop: 10,
    // marginTop: 20,
    maxWidth: 400,
  },
  selected_seeds_header: {
    fontSize: 18,
    marginTop: -5,
    fontWeight: "600",
    marginLeft: 13,
    textAlign: "left",
    // paddingTop: 3,
    // marginTop: 20,
    // maxWidth: 350,
  },
  selected_seeds_songs: {
    fontSize: 14,
    lineHeight: 2,
    marginLeft: 20,
    textAlign: "left",
    // fontWeight: "600",
    // paddingTop: 3,
    // marginTop: 20,
    // maxWidth: 350,
  },
});

export default function SearchBar({ auth, onChange }) {
  const classes = useStyles();
  const { token } = auth;

  const [search_result, set_search_result] = useState([]);
  const [search_string, set_search_string] = useState("");
  const [seleceted_seeds, set_selected_seeds] = useState([]);

  async function spotify_search_songs() {
    const url = "https://api.spotify.com/v1/search";
    const search_query = encodeURIComponent(search_string);
    // console.log("search_query", search_query);
    const search_type_query = "type=track";
    // console.log("token", token);
    const { data } = await axios.get(
      `${url}?q=${search_query}&${search_type_query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    if (data && data.tracks) {
      set_search_result(data.tracks.items);
    }
  }

  useEffect(() => {
    onChange(seleceted_seeds);
  }, [onChange, seleceted_seeds]);

  // console.log("search_result", search_result);

  return (
    <Grid
      container
      // style={{ "align-items": "flex-end" }}
      spacing={0}
      justify="center"
    >
      <Grid item xs={12}>
        <Box className={classes.search_bar}>
          <TextField
            id={"outlined-basic"}
            variant={"outlined"}
            placeholder="enter reference tracks..."
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => set_search_string(e.target.value)}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                spotify_search_songs();
              }
            }}
            value={search_string}
          ></TextField>
          <Button
            style={{
              marginLeft: 5,
              backgroundColor: "#B7B7A4",
              color: "#2b2d42",
            }}
            onClick={spotify_search_songs}
            variant="contained"
          >
            <MusicNoteIcon style={{ fontSize: 35 }} />
          </Button>
        </Box>
      </Grid>
      {/* <Grid item xs={12} sm={6}> */}
      <Box className={classes.search_results}>
        <SearchResults results={search_result} onChange={set_selected_seeds} />
      </Box>
      {/* </Grid> */}
      {/* <Grid item xs={12} sm={6}> */}
      {/* <Typography className={classes.selected_seeds_header}>
          Your selected seeds will appear here
        </Typography> */}
      {/* <Paper className={classes.selected_seeds}>
          {seleceted_seeds.map((songs, index) => (
            <Typography className={classes.selected_seeds_songs}>
              {index + 1}. {songs}
            </Typography>
          ))}
        </Paper>
      </Grid> */}
    </Grid>
  );
}
