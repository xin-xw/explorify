import React, { useState } from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";

export default function SearchResults({ results, onChange }) {
  const [checked, set_checked] = useState([]);
  console.log(checked);

  const handle_toggle = (value) => () => {
    const cur_index = checked.indexOf(value);
    const new_checked = [...checked];
    if (cur_index === -1) {
      if (checked.length < 3) {
        new_checked.push(value);
      }
    } else {
      new_checked.splice(cur_index, 1);
    }
    set_checked(new_checked);
    onChange(new_checked);
  };

  return (
    <List>
      {results.map((item, index) => (
        <ListItem key={item.id} button onClick={handle_toggle(item.id)}>
          <ListItemIcon>
            <Checkbox
              edge={"start"}
              checked={checked.indexOf(item.id) !== -1}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
