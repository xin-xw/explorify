import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  makeStyles,
  Button,
  styled,
  Typography,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  withStyles,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: 50,
    fontSize: "4.5em",
    fontFamily: "Yeseva One",
    fontWeight: 500,
    marginBottom: -20,
    // color: "#9EB56F",
  },
  desc_root: {
    maxWidth: 500,
    margin: "auto",
    borderRadius: 5,
    position: "relative",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  desc_content: { padding: 20 },
  desc_cta: {
    display: "block",
    textAlign: "justify",
    color: "black",
    fontSize: 15,
    fontFamily: "Inter",
  },
  desc_title: {
    color: "black",
    // letterSpacing: "1x",
    fontSize: 30,
    textAlign: "left",
    marginTop: 0,
    fontFamily: "Inter",
    fontWeight: 500,
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Kanit", "Inter", "Kiwi Maru"],
  },
  palette: {
    background: {
      default: "#000",
    },
  },
});

const CustomColor = withStyles({
  root: {
    fontSize: "5em",
    // background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // background: "linear-gradient(to right, #de6262, #ffb88c)",
    background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    // background: "#000",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
})(Typography);

const LoginButton = styled(Button)({
  background:
    "linear-gradient(to right, #b2c9d4, #b8c4da, #c8bdd7, #d9b6ca, #e3b2b4)",
  border: 0,
  borderRadius: 10,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  // boxShadow: "5px 5px 15px 5px rgba(214,223,193,.5)",
  color: "black",
  fontSize: 20,
  fontWeight: 400,
  height: 45,
  padding: "0 30px",
});

function LoginPage() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <CustomColor className={classes.title}>explorify</CustomColor>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.desc_root}>
              <CardContent className={classes.desc_content}>
                <Typography className={classes.desc_title}>
                  What is this?
                </Typography>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  // minHeight={250}
                  color={"black"}
                  textAlign={"center"}
                  elevation={3}
                >
                  <Typography className={classes.desc_cta}>
                    Spotify provides developers a Recommendation API that can be
                    found{" "}
                    <a
                      href="https://developer.spotify.com/console/get-recommendations/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    {". "}
                    Essentially, Explorify aims to unleash the potential of
                    their API, allowing the general public to take advantage of
                    it more! Provided your favorite songs, Explorify aims to
                    recommend you other similar tracks (if there is sufficient
                    information). But, the cool thing is that Spotify's API also
                    allows you to customize your final matches with specific
                    track attributes such as: danceability, energy, popularity,
                    tempo, and more. Give it a try!
                  </Typography>
                </Box>
                <Typography className={classes.desc_title}>
                  How do I handle your data?
                </Typography>
                <Box marginBottom={3}>
                  <Typography className={classes.desc_cta}>
                    None of your data is stored on any database nor server. The
                    website is SSL encrypted, meaning when you login to the
                    website - your authentication information is safely
                    encrypted. When you login, you share an authorization token
                    with me. That token automatically expires within 1 hour. In
                    addition, once you have clicked the log out button,
                    everything is destroyed!
                  </Typography>
                </Box>
                <Typography className={classes.desc_cta}>
                  Check me out at:{" "}
                  <a
                    href="https://www.xinwang.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.xinwang.me
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <LoginButton href="/auth/login" endIcon={<ExitToAppIcon />}>
              LOGIN WITH SPOTIFY
            </LoginButton>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
