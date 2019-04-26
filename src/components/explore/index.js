import React, { Component } from "react";
import Search from "./search";
import { View, StatusBar } from "react-native";

export default class Explore extends Component {
  render() {
    return (
      <View>
        <View>
          <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
        </View>
        <Search />
      </View>
    );
  }
}
