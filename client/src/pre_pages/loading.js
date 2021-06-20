import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  makeStyles,
  Button,
  styled,
  Typography,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: 20,
    fontSize: "4.5em",
    fontFamily: "Kiwi Maru",
    fontWeight: 500,
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
    fontSize: 20,
  },
  desc_title: {
    color: "black",
    letterSpacing: "1x",
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Kanit", "Kiwi Maru"],
  },
  palette: {
    background: {
      default: "#E2E2E2",
    },
  },
});

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

function Loading() {
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
            <Typography className={classes.title}>explorify</Typography>
          </Grid>
          <Grid item>
            <Card className={classes.desc_root}>
              <CardContent className={classes.desc_content}>
                <Typography className={classes.desc_title} variant="h5">
                  Uh oh... Something went wrong!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <LoginButton
              href="/auth/login"
              endIcon={<ExitToAppIcon />}
              disabled
            >
              LOGIN WITH SPOTIFY
            </LoginButton>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Loading;
