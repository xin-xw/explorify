import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  Slider,
  Checkbox,
  makeStyles,
  Paper,
  Box,
} from "@material-ui/core";
import { palette } from "@material-ui/system";
/* 
1. key: The key of the object is the name of our metric
2. value: specifies the current set value of our nob
3. enabled: whether or not this nob is enabled (whether or not the user wants to include this metric in their search)
4. min: what is the minimum value this nob can be
5. max: what is the maximum value this nob can be
6. step: what increments does the slider change value
*/
const useStyles = makeStyles({
  checkboxes_root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  checkboxes_icon: {
    borderRadius: 3,
    width: 18,
    height: 18,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checked_icon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  paper_root: {
    // backgroundColor: "black:",
    padding: 10,
    width: "95%",
    // borderRadius: 10,
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.1)",
  },
});

const recs = {
  acousticness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  danceability: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  energy: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  instrumentalness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  liveness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  loudness: {
    value: [-60, 0],
    enabled: false,
    min: -60,
    max: 0,
  },
  popularity: {
    value: [0, 100],
    enabled: false,
    min: 0,
    max: 100,
    step: 1,
  },
  speechiness: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
  tempo: {
    value: [0, 200],
    enabled: false,
    min: 0,
    max: 200,
    step: 1,
  },
  valence: {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01,
  },
};

export default function RecBoards({ onChange }) {
  const classes = useStyles();
  const [board_values, set_board_values] = useState(recs);

  const handle_change = (rec, value) => {
    const new_board_values = { ...board_values };
    new_board_values[rec].value = value;
    set_board_values(new_board_values);
  };

  const toggle_rec = (rec, value) => {
    const new_board_values = { ...board_values };
    new_board_values[rec].enabled = value;
    set_board_values(new_board_values);
  };

  useEffect(() => {
    onChange(board_values);
  }, [onChange, board_values]);

  return (
    <Grid container spacing={0} style={{ padding: 0 }} justify="center">
      <Paper elevation={3} className={classes.paper_root}>
        {/* <Grid item xs={12}>  */}
        {Object.keys(recs).map((rec) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Checkbox
              className={classes.checkboxes_root}
              disableRipple
              color="default"
              checkedIcon={
                <span
                  className={clsx(
                    classes.checkboxes_icon,
                    classes.checked_icon
                  )}
                />
              }
              icon={<span className={classes.checkboxes_icon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
              checked={board_values[rec].enabled}
              onChange={(e, newValue) => toggle_rec(rec, newValue)}
            />
            <div style={{ flex: 1 }}>
              <Grid container>
                <Typography>{rec}</Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography>min</Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      disabled={!board_values[rec].enabled}
                      value={board_values[rec].value}
                      onChange={(e, new_value) => handle_change(rec, new_value)}
                      valueLabelDisplay={"auto"}
                      aria-labelledby={"range-slider"}
                      min={recs[rec].min}
                      max={recs[rec].max}
                      step={recs[rec].step}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>max</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        ))}
        {/* </Grid> */}
      </Paper>
    </Grid>
  );
}
