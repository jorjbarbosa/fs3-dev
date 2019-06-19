import React, { Component } from "react";
import UserBar from "./userbar";
import { StatusBar, Dimensions, Alert } from "react-native";
import { Button, Block, Text, Input } from "../../components";
import { View, StyleSheet } from "react-native";
import firebase from 'react-native-firebase';
// import { Container } from './styles';
import { errorMessage } from '../../config/Erros';
export default class User extends Component {

  logout = (navigate) => {
    firebase.auth().signOut().then(() => {
      navigate.navigate("Login");
    }).catch((error) => {
      Alert.alert(errorMessage(error.code));//aviso de erro
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <View>
          <View>
            <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
          </View>
          <UserBar />
        </View>

        <Block middle>
          <Block middle>
            <Text
              onPress={() => navigation.navigate("MyAccount")}
            >
              Minha Conta</Text>
          </Block>
          <Block middle>
            <Text
              onPress={() => navigation.navigate("RegisterService")}
            >
              Cadastrar serviço</Text>
          </Block>
          <Text
            onPress={() => navigation.navigate("RegisterService")}
          >
            Meus Serviços
          </Text>
        </Block>
        <Block middle>
          <Text
            onPress={() => navigation.navigate("EngagedService")}
          >Serviços contratados</Text>
        </Block>
        <Block middle>
          <Text
            onPress={() => this.logout(navigation)}
          >LogOut</Text>
        </Block>
      </Block>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
