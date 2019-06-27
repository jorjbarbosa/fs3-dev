import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import Exp from "./Explore";
import Save from "../screens/save";
import Notification from "../screens/alerts";
import { Image } from "react-native";
//import User from "../screens/user";
import User from "./User";
//import Status from "./components/compositor";

export default Modulo = createBottomTabNavigator(
  {
    Explore: {
      screen: Exp,
      navigationOptions: {
        tabBarLabel: "Explorar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" color={tintColor} size={25} />
        )
      }
    },
    Salvos: {
      screen: Save,
      navigationOptions: {
        tabBarLabel: "Salvos",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="heart" color={tintColor} size={25} />
        )
      }
    },
    Notificação: {
      screen: Notification,
      navigationOptions: {
        tabBarLabel: "Notificação",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" color={tintColor} size={25} />
        )
      }
    },
    Usuário: {
      screen: User,
      navigationOptions: {
        tabBarLabel: "Usuário",
        tabBarIcon: ({ tintColor }) => (

          < Image source={require('../assets/images/icons/menu.png')} style={color = { tintColor }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#7159c1",
      inactiveTintColor: "grey",

      style: {
        backgroundColor: "#fff",
        borderTopColor: "#fff",
        shadowOffset: { width: 3, height: 10 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 5
      }
    }
  },
  {
    initialRouteName: "Explore"
    // StatusBar: { backgroundColor: "#7159c1", barStyle: "light-content" }
  }
);


