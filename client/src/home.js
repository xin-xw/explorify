import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "tachyons";
import "animate.css";
const useStyles = makeStyles({
  login: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    backgroundColor: "black",

    // "& img": {
    //   width: "50%",
    // },

    "& a": {
      padding: "20px",
      borderRadius: "99px",
      backgroundColor: "#1db954",
      fontWeight: 600,
      color: "white",
      textDecoration: "none",
    },

    "& a:hover": {
      backgroundColor: "white",
      borderColor: "#1db954",
      color: "#1db954",
    },
  },
});

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.login}>
      {/* <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify-Logo"
      /> */}
      <h1 class="f-subheadline lh-title near-white code animate__animated animate__bounce animate__slow animate__infinite">
        explorify
      </h1>
      <a
        href="/auth/login"
        class="ib link bw1 b--solid b--dark-blue dark-blue fw9 pa3 br3 hover-white hover-bg-dark-blue"
      >
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
}

export default Home;
