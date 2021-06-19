// import React, { useState } from "react";
// // import RecBoards from "./rec_boards";
// import axios from "axios";
// import SearchResults from "./search_results";
// import { Button } from "@material-ui/core";

// export default async function GetRecommendations({
//   auth,
//   selected_artists,
//   rec_values,
// }) {
//   const { new_token } = auth;
//   const url = "https://api.spotify.com/v1/recommendations";
//   let selected_artists_string;
//   if (selected_artists_string < 0) {
//     return;
//   } else {
//     selected_artists_string = `seed_artists=${selected_artists.join(",")}`;
//   }

//   let min = [];
//   let max = [];
//   Object.keys(rec_values).forEach((rec) => {
//     if (rec_values[rec].enabled) {
//       min.push(`min_${rec}=${rec_values[rec].value[0]}`);
//       max.push(`min_${rec}=${rec_values[rec].value[1]}`);
//     }
//   });
//   const min_string = min.join("&");
//   const max_string = max.join("&");

//   const { data } = await axios.get(
//     `${url}?${selected_artists_string}&${min_string}&${max_string}`,
//     {
//       headers: {
//         Authorization: `Bearer ${new_token}`,
//       },
//     }
//   );
//   console.log(data);

//   return <Button variant={"contained"} Get Recommendations></Button>;
// }
