import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Login from "../screens/credentials";
import Register from "../screens/credentials/register";
import Forgot from "../screens/credentials/forgot";
const AppNavigator = createStackNavigator(
  {
    Login,
    Register,
    Forgot,

  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
const Auth = createAppContainer(AppNavigator);

export default Auth;
