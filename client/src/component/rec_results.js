import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    direction: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer2: {
    direction: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  // cover_art: {
  //   width: theme.spacing(9),
  //   height: theme.spacing(9),
  // },
  track_name: {
    marginTop: 5,
    width: "100%",
    fontSize: "1em",
    fontWeight: 600,
    textAlign: "center",
    backgroundColor: "none",
  },
  artist_name: {
    width: "100%",
    fontSize: "1em",
    textAlign: "center",
    // top: "20%",
    // position: "absolute",
  },
  paper_result: {
    position: "relative",
    width: "180px",
    height: "220px",
    // minHeight: "300px",
    marginBottom: 30,
    borderRadius: 10,
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffe8d6",
  },
}));

const RecommendationResults = ({ results }) => {
  // console.log("results", results);
  const classes = useStyles();

  // const return_track_name = ({ track_name }) => {
  //   console.log("track_name", track_name);
  //   return track_name;
  // };

  if (!results.tracks || results.tracks.length === 0) {
    return (
      <Typography>
        Sorry, I couldn't find any results! Your modifications were too
        specific! Try selecting less track attributes or less referencee tracks.
      </Typography>
    );
  }

  return (
    <Grid container className={classes.gridContainer}>
      <Grid container spacing={3} className={classes.gridContainer2}>
        {results.tracks.map((track) => (
          <Grid item align="center">
            <Card className={classes.paper_result}>
              <CardContent
                styles={{
                  alignItems: "center",
                  align: "center",
                  justify: "center",
                }}
              >
                <CardMedia
                  style={{ position: "relative", width: "60%", height: "50%" }}
                  component="img"
                  image={track.album.images[2].url}
                ></CardMedia>
                <Typography className={classes.track_name}>
                  {track.name}
                </Typography>
                <Typography noWrap className={classes.artist_name}>
                  {track.artists[0].name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RecommendationResults;
