import React, { Component } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";

export default class Search extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.areaSerch}>
            <Icon
              name="tools"
              color={"#772ea2"}
              size={22}
              style={{ marginTop: 5, paddingBottom: 10, marginLeft: 30 }}
            />
            <TextInput
              style={styles.areaText}
              placeholder="Busque seu serviço "
              placeholderTextColor="white"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#772ea2"
    //borderBottomColor: "#dddddd"
  },

  areaSerch: {
    flexDirection: "row",
    marginHorizontal: 50,
    marginVertical: 20,
    backgroundColor: "#ddf4",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 1
  },

  areaText: {
    color: "white",
    //fontWeight: "700",
    //backgroundColor: "#ddf4",
    flex: 0.9,
    fontSize: 15
  }
});
