/*
1. When the app loads, it will send a request to our backends “current-session” endpoint, where it will take that data and set the auth state.
2. This means that while our auth state is null (which is its initial state), the Loading screen will be returned, which just says “Loading…”
3. If auth exists and is not false, then we return our Explorify screen. We also pass in that auth state so we can use it later!
4. If auth is false, which is what happens if we aren’t logged in, then our App shows the home screen, offering a login to our users. Luckily, our login endpoint is already hooked up to our Spotify Authentication workflow!
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./pre_pages/login_page";
import Loading from "./pre_pages/loading";
import Explorify from "./explorify";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("/auth/current-session").then(({ data }) => {
      setAuth(data);
    });
  }, []);

  if (auth === null) {
    return <Loading />;
  }
  if (auth) {
    return <Explorify auth={auth} />;
  }
  return <LoginPage />;
}

export default App;
