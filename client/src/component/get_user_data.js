import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Typography, Avatar } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
  },
  large: {
    margin: 10,
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
}));

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
      console.log(data);
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
      <Grid item>
        <Typography variant="h4" fontWeight="fontWeightBold">
          hello 👋, {user_name}!
        </Typography>
      </Grid>
      <Grid item>
        <Avatar
          src={user_image}
          alt="user_image"
          className={classes.large}
        ></Avatar>
      </Grid>
    </Grid>
  );
}
