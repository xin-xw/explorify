import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Grid,
  Typography,
  Slider,
  Checkbox,
  makeStyles,
  Paper,
  Card,
  CardContent,
  Box,
  Avatar,
} from "@material-ui/core";
/* 
1. key: The key of the object is the name of our metric
2. value: specifies the current set value of our nob
3. enabled: whether or not this nob is enabled (whether or not the user wants to include this metric in their search)
4. min: what is the minimum value this nob can be
5. max: what is the maximum value this nob can be
6. step: what increments does the slider change value
*/
const useStyles = makeStyles((theme) => ({
  checkboxes_root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  checkboxes_icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
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
      width: 16,
      height: 16,
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
    padding: 10,
    width: "100%",
    borderRadius: 10,
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
    backgroundColor: "#ffe8d6",
  },
  // rec_font: {
  //   color: "#000",
  //   // backgroundColor: "#B5838D",
  //   // backgroundColor: "#FFCDB2",
  // },
  rec_card_root: {
    maxWidth: 925,
    // height: "250px",
    marginBottom: 30,
    borderRadius: 10,
  },
  rec_font: {
    // color: "#000",
    color: "#2b2d42",
    fontFamily: "Sawarabi Mincho",
    paddingTop: 20,
    fontWeight: 1000,
    fontSize: "2.4em",
    textAlign: "center",
  },
  rec_font_2: {
    // color: "#000",
    color: "#2b2d42",
    // fontFamily: "Concert One",
    fontFamily: "Benne",
    fontWeight: 700,
    fontSize: "1.5em",
    textAlign: "left",
  },
  rec_font_3: {
    // color: "#000",
    color: "#2b2d42",
    // fontFamily: "Concert One",
    fontFamily: "Benne",
    // fontWeight: 700,
    fontSize: "1.5em",
    // textAlign: "left",
  },
  track_attribute_image: {
    margin: 10,
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  rec_root: {
    // padding: 5,
    marginTop: 15,
    marginBottom: 10,
    maxWidth: 825,
    maxHeight: 100,
    backgroundColor: "#C9C9BA",
    // backgroundColor: "transparent",
    // border: "2px solid #000",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
  },
  cb: {
    maxWidth: 925,
    // height: "250px",
    // marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#ffe8d6",
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
  },
  cb_title: {
    color: "#2b2d42",
    fontFamily: "Sawarabi Mincho",
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 1000,
    fontSize: "2.4em",
    textAlign: "center",
  },
  cb_paper: {
    backgroundColor: "transparent",
    padding: 3,
  },
}));

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
    <Card className={classes.cb}>
      <CardContent>
        <Typography className={classes.cb_title}>Control Panel 🎛</Typography>
      </CardContent>
      <Grid
        container
        direction="row"
        spacing={0}
        justify="center"
        alignItems="center"
      >
        {Object.keys(recs).map((rec) => (
          <Grid item xs={12} sm={6} align="center">
            <Paper className={classes.cb_paper} variant="outlined">
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} align="center">
                  <Typography className={classes.rec_font_2}>
                    <Checkbox
                      className={classes.checkboxes_root}
                      disableRipple
                      color="default"
                      style={{}}
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
                    {rec}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography className={classes.rec_font_3}>min</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Slider
                    disabled={!board_values[rec].enabled}
                    value={board_values[rec].value}
                    onChange={(e, new_value) => handle_change(rec, new_value)}
                    valueLabelDisplay={"auto"}
                    aria-labelledby={"range-slider"}
                    min={recs[rec].min}
                    max={recs[rec].max}
                    step={recs[rec].step}
                    style={{ marginTop: -3 }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography className={classes.rec_font_3}>max</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>

    // <Grid
    //   container
    //   spacing={2}
    //   style={{ padding: 0 }}
    //   justify="center"
    //   direction="row"
    // >
    //   <Grid item xs={12}>
    //     <Card
    //       className={classes.rec_card_root}
    //       style={{
    //         backgroundColor: "#ffe8d6",
    //         boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
    //         paddingBottom: 30,
    //       }}
    //     >
    //       <Typography className={classes.rec_font}>Control Panel 🎮</Typography>
    //       {Object.keys(recs).map((rec) => (
    //         <Grid item xs={5}>
    //           <Paper className={classes.rec_root} variant="elevation">
    //             <CardContent style={{}}>
    //               <Typography className={classes.rec_font_2}>
    //                 <Checkbox
    //                   className={classes.checkboxes_root}
    //                   disableRipple
    //                   color="default"
    //                   style={{ marginLeft: -6 }}
    //                   checkedIcon={
    //                     <span
    //                       className={clsx(
    //                         classes.checkboxes_icon,
    //                         classes.checked_icon
    //                       )}
    //                     />
    //                   }
    //                   icon={<span className={classes.checkboxes_icon} />}
    //                   inputProps={{ "aria-label": "decorative checkbox" }}
    //                   checked={board_values[rec].enabled}
    //                   onChange={(e, newValue) => toggle_rec(rec, newValue)}
    //                 />
    //                 {rec}
    //               </Typography>
    //               <Grid container style={{ paddingTop: 5 }}>
    //                 <Grid item xs={1} align="right">
    //                   <Typography className={classes.rec_font_3}>
    //                     min
    //                   </Typography>
    //                 </Grid>
    //                 <Grid item xs={10} align="center" justify="center">
    //                   <Slider
    //                     disabled={!board_values[rec].enabled}
    //                     value={board_values[rec].value}
    //                     onChange={(e, new_value) =>
    //                       handle_change(rec, new_value)
    //                     }
    //                     valueLabelDisplay={"auto"}
    //                     aria-labelledby={"range-slider"}
    //                     min={recs[rec].min}
    //                     max={recs[rec].max}
    //                     step={recs[rec].step}
    //                     style={{ marginTop: -3 }}
    //                   />
    //                 </Grid>
    //                 <Grid item xs={1}>
    //                   <Typography className={classes.rec_font_3}>
    //                     max
    //                   </Typography>
    //                 </Grid>
    //               </Grid>
    //             </CardContent>
    //           </Paper>
    //         </Grid>
    //       ))}
    //     </Card>
    //   </Grid>
    // </Grid>

    // <Grid container spacing={0} style={{ padding: 0 }} justify="center">
    //   <Paper elevation={3} className={classes.paper_root}>
    //     {/* <Grid item xs={12}>  */}
    //     {Object.keys(recs).map((rec) => (
    //       <div style={{ display: "flex", flexDirection: "row" }}>
    //         <Checkbox
    //           className={classes.checkboxes_root}
    //           disableRipple
    //           color="default"
    //           checkedIcon={
    //             <span
    //               className={clsx(
    //                 classes.checkboxes_icon,
    //                 classes.checked_icon
    //               )}
    //             />
    //           }
    //           icon={<span className={classes.checkboxes_icon} />}
    //           inputProps={{ "aria-label": "decorative checkbox" }}
    //           checked={board_values[rec].enabled}
    //           onChange={(e, newValue) => toggle_rec(rec, newValue)}
    //         />
    //         <div style={{ flex: 1 }}>
    //           <Grid container>
    //             <Typography className={classes.font_color}>{rec}</Typography>
    //             <Grid container spacing={1}>
    //               <Grid item>
    //                 <Typography className={classes.font_color}>min</Typography>
    //               </Grid>
    //               <Grid item xs>
    //                 <Slider
    //                   disabled={!board_values[rec].enabled}
    //                   value={board_values[rec].value}
    //                   onChange={(e, new_value) => handle_change(rec, new_value)}
    //                   valueLabelDisplay={"auto"}
    //                   aria-labelledby={"range-slider"}
    //                   min={recs[rec].min}
    //                   max={recs[rec].max}
    //                   step={recs[rec].step}
    //                 />
    //               </Grid>
    //               <Grid item>
    //                 <Typography className={classes.font_color}>max</Typography>
    //               </Grid>
    //             </Grid>
    //           </Grid>
    //         </div>
    //       </div>
    //     ))}
    //     {/* </Grid> */}
    //   </Paper>
    // </Grid>
  );
}
