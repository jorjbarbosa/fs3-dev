import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Index from "../screens/user";
import MyAccount from "../screens/user/myaccount";
import RegisterService from "../screens/user/registerservice";
import EngagedService from "../screens/user/engagedservice";
import MyServices from "../screens/user/myservices";
const AppNavigator = createStackNavigator(
  {
    Index,
    MyAccount,
    RegisterService,
    EngagedService,
    MyServices

  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
const User = createAppContainer(AppNavigator);

export default User;
