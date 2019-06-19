import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Index from "../screens/user";
import MyAccount from "../screens/user/myaccount";
import RegisterService from "../screens/user/registerservice";
import RegisterProvider from "../screens/user/registerprovider";
import EngagedService from "../screens/user/engagedservice";
import MyServices from "../screens/user/myservices";
const User = createStackNavigator(
  {
    Index,
    MyAccount,
    RegisterService,
    RegisterProvider,
    EngagedService,
    MyServices

  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
User.navigationOptions=({navigation})=>{
  let tabBarVisible;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }else
    tabBarVisible=true;

  return {
    tabBarVisible,
  };
}



export default User;
