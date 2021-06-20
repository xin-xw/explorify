import React, { useState, useEffect } from "react";
import axios from "axios";

// export default function ExportToPlaylist({ auth, user_id }) {
//   const { token } = auth;
//   const [playlist_name, set_playlist_name] = useState("");
//   const [playlist_desc, set_playlist_desc] = useState("");

//   useEffect(() => {
//     async function retrieve_data() {
//       const url = "https://api.spotify.com/v1/users/";
//       const uid = user_id;
//       console.log(uid);
//       const { data } = await axios.post(`${url}${uid}/playlists`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(data);
//       if (data) {
//         handle_playlist_config(data);
//       }
//     }
//     retrieve_data();
//   }, [auth, user_id]);

//   function handle_playlist_config(data) {
//     set_playlist_name("explorify playlist");
//     set_playlist_desc("created by explorify");
//   }
// }

const url = "https://api.spotify.com/v1/users/";
const playlist_name = "playlist by explorify";
export const create_playlist = ({ auth, user_id }) =>
  axios.post(
    `${url}${user_id}/playlists`,
    JSON.stringify({
      name: playlist_name,
      // epd,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
