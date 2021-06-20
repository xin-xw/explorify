import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    direction: "row",
    padding: 10,
  },
  cover_art: {
    marginLeft: -15,
    marginRight: 10,
    // width: theme.spacing(5.5),
    width: theme.spacing(6),
    // height: theme.spacing(5.5),
    height: theme.spacing(6),
  },
  track_name: {
    fontSize: 16,
    fontWeight: 500,
  },
  artist_name: {
    fontSize: 13,
  },
}));

const RecommendationResults = ({ results }) => {
  console.log(results);
  const classes = useStyles();
  if (!results.tracks || results.tracks.length === 0) {
    return <Typography>No Results!</Typography>;
  }
  return (
    <Grid container className={classes.gridContainer}>
      {/* <List> */}
      {results.tracks.map((track) => (
        <Grid item xs={6}>
          <ListItem key={track.id}>
            <Avatar
              src={track.album.images[2].url}
              variant="square"
              className={classes.cover_art}
            ></Avatar>
            <ListItemText>
              <Typography className={classes.track_name}>
                {track.name}
              </Typography>
              <Typography className={classes.artist_name}>
                {track.artists[0].name}
              </Typography>
            </ListItemText>
          </ListItem>
        </Grid>
      ))}
      {/* </List> */}
    </Grid>
  );
};

export default RecommendationResults;
