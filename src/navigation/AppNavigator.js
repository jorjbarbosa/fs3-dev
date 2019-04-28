import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

//import Screens from "./Screens";
import Auth from "./Auth";

// Loading screen

const App = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth
  //Main: Screens
});

const AppMain = createAppContainer(App);
export default AppMain;
