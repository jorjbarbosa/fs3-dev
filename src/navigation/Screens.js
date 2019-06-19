import React, { Component } from "react";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import Explore from "../screens/explore";
import Save from "../screens/save";
import Notification from "../screens/alerts";
import User from "../screens/user";
//import Status from "./components/compositor";

export default Modulo = createBottomTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarLabel: "EXPLORAR",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" color={tintColor} size={25} />
        )
      }
    },
    Salvos: {
      screen: Save,
      navigationOptions: {
        tabBarLabel: "SALVOS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="star" color={tintColor} size={25} />
        )
      }
    },
    Notificação: {
      screen: Notification,
      navigationOptions: {
        tabBarLabel: "ALERTAS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" color={tintColor} size={25} />
        )
      }
    },
    Usuário: {
      screen: User,
      navigationOptions: {
        tabBarLabel: "USUÁRIO",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="navicon" color={tintColor} size={30} />
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


