import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import acousticness from "../icon/acousticness.png";
import danceability from "../icon/danceability.png";
import instrumental from "../icon/instrumental.png";
import loudness2 from "../icon/loudness2.png";
import popularity from "../icon/popularity.png";
import tempo from "../icon/tempo.png";
import valence from "../icon/valence.png";
import liveness from "../icon/liveness.png";
import speechiness from "../icon/speechiness.png";
import energy from "../icon/energy.png";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: 10,
    spacing: 10,
    alignItems: "center",
    direction: "row",
  },
  gridItem: {
    backgroundColor: "#FFB4A2",
    background: "#000",
    color: "#000",
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
  card: {
    // backgroundColor: "FFB4A2",
  },
  card_content: {
    // backgroundColor: "#FFB4A2",
  },

  track_attribute_card_1: {
    width: "275px",
    height: "400px",
    marginBottom: 30,
    borderRadius: 10,
  },

  track_attribute_font_title: {
    color: "#000",
    fontFamily: "Benne",
    fontWeight: 700,
    fontSize: "1.7em",
  },
  track_attribute_font_title_2: {
    color: "#fff",
    fontFamily: "Benne",
    fontWeight: 700,
    fontSize: "1.7em",
  },
  track_attribute_font_type: {
    color: "#000",
    fontFamily: "Benne",
    fontWeight: 700,
    fontSize: "1.3em",
  },
  track_attribute_font_type_2: {
    color: "#fff",
    fontFamily: "Benne",
    fontWeight: 700,
    fontSize: "1.3em",
  },
  track_attribute_font_content: {
    marginTop: -5,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#18181F",
    fontFamily: "Benne",
    fontWeight: 600,
    fontSize: "1.2em",
    textAlign: "justify",
  },
  track_attribute_font_content_2: {
    marginTop: -5,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#e6e4df",
    fontFamily: "Benne",
    fontWeight: 600,
    fontSize: "1.13em",
    textAlign: "justify",
    // lineSpacing: "10",
  },
  track_attribute_image: {
    margin: 10,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  book: {
    maxWidth: 925,
    // height: "250px",
    // marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#ffe8d6",
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
  },
  book_title: {
    color: "#2b2d42",
    fontFamily: "Sawarabi Mincho",
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 1000,
    fontSize: "2.4em",
    textAlign: "center",
  },
}));

export default function BookOfTrackAttributes() {
  const classes = useStyles();
  return (
    <Card className={classes.book}>
      <CardContent>
        <Typography className={classes.book_title}>
          Book of Track Attributes 📖
        </Typography>
      </CardContent>
      <Grid
        container
        direction="row"
        spacing={2}
        style={
          {
            // paddingLeft: 45,
          }
        }
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#BDBAD5" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title}>
                acousticness
              </Typography>
              <Avatar
                variant="square"
                src={acousticness}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type}>
                  type: context
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content}>
                tracks with <i>higher</i> acousticness indicate tracks with{" "}
                <i>more</i> featurings of guitars, pianos, drumsets, etc.
                whereas, <i>lower</i> acousticness indicate tracks with
                <i> more</i> featurings of electronic or synthesized elements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#124E78", color: "#fff" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title_2}>
                danceability
              </Typography>
              <Avatar
                variant="square"
                src={danceability}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type_2}>
                  type: mood
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content_2}>
                an overall measurement of a track's suitability for dancing
                based on musical elements including tempo, rhythm, beat
                strength, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#F49D6E" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title}>
                energy
              </Typography>
              <Avatar
                variant="square"
                src={energy}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type}>
                  type: mood
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content}>
                an overall measurement of a track's intensity & activity.{" "}
                <i>higher</i> energy will restrict results to fast, loud, and
                noisy songs. psst: heavy metal = higher energy & mozart = lower
                energy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#F2CD5D" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title}>
                instrumentalness
              </Typography>
              <Avatar
                variant="square"
                src={instrumental}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type}>
                  type: properties
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content}>
                predicts whether a track contains vocals. rap songs are more
                vocal, whereas lofi study music are less vocal. the higher the
                value, the more likely the track contains NO vocal content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#C0D6DF" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title}>
                liveness
              </Typography>
              <Avatar
                variant="square"
                src={liveness}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type}>
                  type: context
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content}>
                liveness detects the presence of an audience in the recording.{" "}
                <i>higher</i> liveness will lead you to more tracks that were
                probably performed live. increase this value if you want to find
                tracks that are maybe from an artist's concert.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#FFA69E" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title}>
                loudness
              </Typography>
              <Avatar
                variant="square"
                src={loudness2}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type}>
                  type: properties
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content}>
                loudness represents an overall measurement of the decibels (dB)
                throughout a track. setting a <i>higher</i> loudness will lead
                you to songs that are more fun to blast on the speakers!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#BB342F" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title_2}>
                popularity
              </Typography>
              <Avatar
                variant="square"
                src={popularity}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type_2}>
                  type: other
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content_2}>
                popularity provides a measure of - well - how popular you want
                the tracks in your results to be. set it <i>lower</i> if you
                want to discover more low-key songs, and set it <i>higher</i> if
                you want to continue jamming out to tracks just as popular as
                Despacito or Gangnam Style.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#758E4F" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title_2}>
                speechiness
              </Typography>
              <Avatar
                variant="square"
                src={speechiness}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type_2}>
                  type: properties
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content_2}>
                kind of similar to instrumental, but inverse. setting
                speechiness to a <i>higher</i> value will lead you to songs that
                have a <i>higher</i> amount of spoken words. psst: setting this
                high will get you songs like Rap God by Eminem.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#AA4465" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title_2}>
                tempo
              </Typography>
              <Avatar
                variant="square"
                src={tempo}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type_2}>
                  type: mood
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content_2}>
                tempo means beats per minute! setting a tempo range = beats per
                minute range. setting minimum tempo to 140 restricts results to
                only those tracks with a tempo of greater than 140 bpm.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className={classes.track_attribute_card_1}
            style={{ backgroundColor: "#462255" }}
          >
            <CardContent>
              <Typography className={classes.track_attribute_font_title_2}>
                valence
              </Typography>
              <Avatar
                variant="square"
                src={valence}
                className={classes.track_attribute_image}
              ></Avatar>
              <CardContent>
                <Typography className={classes.track_attribute_font_type_2}>
                  type: mood
                </Typography>
              </CardContent>
              <Typography className={classes.track_attribute_font_content_2}>
                valence will control how happy a song sounds! tracks with higher
                valence sounds more happy & positive. tracks with lower valence
                sounds more negative (sad, angry, etc.)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}
