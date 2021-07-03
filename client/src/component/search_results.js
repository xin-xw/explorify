import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Checkbox,
  makeStyles,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core";
import spotify_logo_green from "../icon/spotify_logo_green.png";
import spotify_logo_green_notext from "../icon/spotify_logo_green_notext.png";
import spotify_icon_black from "../icon/spotify_icon_black.png";

const useStyles = makeStyles((theme) => ({
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
  grid_container: {
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  search_results: {
    // paddingTop: 15,
    // paddingLeft: 20,
    // marginTop: 15,
    // width: 500,
    backgroundColor: "#ffe8d6",
    borderRadius: 10,
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
  },
  cover_art: {
    marginLeft: -25,
    marginRight: 10,
    // width: theme.spacing(5.5),
    width: theme.spacing(5.8),
    // height: theme.spacing(5.5),
    height: theme.spacing(5.8),
  },
  track_name: {
    fontSize: 15,
    fontWeight: 500,
    // fontSize: 13.5,
    color: "#000",
  },
  artist_name: {
    fontSize: 13,
    // fontSize: 11,
    color: "#000",
  },
  spotify_button: {
    background: "#B7B7A4",
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.4)",
    color: "white",
    paddingLeft: "10",
    "&:hover": "background: white",
  },
  spotify_logo_green: {
    // width: theme.spacing(5.8),
    // height: theme.spacing(5.8),

    width: "30px",
    height: "30px",
  },
}));

export default function SearchResults({ results, onChange }) {
  console.log(results);
  const classes = useStyles();
  const [checked, set_checked] = useState([]);
  const [seeds, set_seeds] = useState([]);
  // console.log(checked);

  const handle_toggle = (value, name) => () => {
    const cur_index = checked.indexOf(value);
    const new_checked = [...checked];
    const new_seed = [...seeds];
    if (cur_index === -1) {
      if (checked.length < 5) {
        new_checked.push(value);
        new_seed.push(name);
      }
    } else {
      new_checked.splice(cur_index, 1);
      new_seed.splice(cur_index, 1);
    }
    set_checked(new_checked);
    set_seeds(new_seed);
    // console.log("seeds", seeds);
    onChange(new_checked);
    // onChange(new_seed);
  };

  return (
    <Grid container className={classes.grid_container}>
      <Grid item xs={12} className={classes.search_results}>
        <List>
          {results.slice(0, 10).map((item, index) => (
            <ListItem
              key={item.id}
              button
              onClick={handle_toggle(item.id, item.name)}
              // margin={-4}
              style={{ maxWidth: 500 }}
            >
              <ListItemIcon>
                <Checkbox
                  className={classes.checkboxes_root}
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
                  disableRipple={true}
                  edge={"start"}
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <Avatar
                src={item.album.images[2].url}
                variant="square"
                className={classes.cover_art}
              ></Avatar>

              <ListItemText style={{ paddingRight: 20 }}>
                <Typography className={classes.track_name}>
                  {item.name}
                </Typography>
                <Typography className={classes.artist_name}>
                  {item.artists[0].name}
                </Typography>
              </ListItemText>
              <Button className={classes.spotify_button} href={item.uri}>
                <Avatar
                  className={classes.spotify_logo_green}
                  src={spotify_icon_black}
                  alt="spotify logo black"
                ></Avatar>
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
