import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

//import Screens from "./Screens";
import Auth from "./Auth";
import Screens from "./Screens";
import User from "./User";
// Loading screen

const App = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth:Auth,
  Screens:Screens,
  User:User
  //Main: Screens
},
  {
    initialRouteName: 'Auth',
  }
);

const AppMain = createAppContainer(App);
export default AppMain;
