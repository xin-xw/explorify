import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Avatar,
  withStyles,
  Button,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    marginBottom: 30,
  },
  large: {
    margin: 10,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  font: {
    fontFamily: "Yeseva One",
    fontSize: "3.3em",
    color: "#000",
  },
  gridItem: {},
}));

const CustomColor = withStyles({
  root: {
    fontSize: "3.3em",
    // background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // background: "linear-gradient(to right, #de6262, #ffb88c)",
    background: "linear-gradient(to right, #d3cce3, #e9e4f0)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
})(Typography);

export default function GetUserData({ auth, onChange }) {
  const classes = useStyles();
  const { token } = auth;
  // console.log("user_data", token);
  const [user_data, set_user_data] = useState(null);
  const [user_id, set_user_id] = useState("");
  const [user_name, set_user_name] = useState("");
  const [user_image, set_user_image] = useState("");

  useEffect(() => {
    async function retrieve_data() {
      const url = "https://api.spotify.com/v1/me";
      const { data } = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      if (data) {
        handle_retrieve_data(data);
      }
    }
    retrieve_data();
  }, [onChange, token]);

  useEffect(() => {
    onChange(user_id);
  }, [onChange, user_id]);

  function handle_retrieve_data(data) {
    set_user_data(data);
    set_user_name(data.display_name);
    set_user_image(data.images[0].url);
    set_user_id(data.id);
  }

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12} align="center">
        <Avatar
          src={user_image}
          alt="user_image"
          className={classes.large}
        ></Avatar>
      </Grid>
      <Grid item xs={12} align="center" className={classes.gridItem}>
        <Typography
          // style={{ textShadow: "1px 1px 1px black" }}
          className={classes.font}
          display="inline"
        >
          welcome to explorify,
        </Typography>
        <CustomColor className={classes.font} display="inline">
          {" "}
          {user_name}
        </CustomColor>
        <Typography className={classes.font} display="inline">
          {" "}
          👋
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button href="/auth/logout">
          <Typography style={{ fontWeight: 450 }}>Log Out</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
