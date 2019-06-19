import React, { Component } from "react";
import { Alert, StyleSheet, ScrollView, ouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Block } from "../../components";
import firebase from 'react-native-firebase';
import { errorMessage } from '../../config/Erros';
import { throwStatement } from "@babel/types";
import { sizes, colors } from "../../components/theme";
//import { } from "react-native-gesture-handler";
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
      <Block >
        <Block>
          <Text h3 row style={styles.header}>Configurações</Text>
        </Block>

        <Block
          center
          middle
          style={styles.card}>
          <Block center middle style={styles.icon}>
          </Block>
          <Text h4 style={{ marginBottom: 11 }}>Olá Jose!</Text>
          <Text paragraph center color="black3">O que desejas?</Text>
        </Block>


        <ScrollView showsVerticalScrollIndicator={false}>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between">
                <Block>
                  <Text bold>Minha conta</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => navigation.navigate("MyAccount")} >Edit</Text>
              </Block>
            </Block>
          </Block>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between">
                <Block>
                  <Text bold>Registrar Serviço</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => navigation.navigate("RegisterService")}>Edit</Text>
              </Block>
            </Block>
          </Block>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between">
                <Block>
                  <Text h4 bold>Serviços Contratados</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => navigation.navigate("EngagedService")}>Edit</Text>
              </Block>
            </Block>
          </Block>


          <Block middle style={styles.inputs}>
            <Block style={styles.label}>
              <Text h4 bold color="purple" center onPress={() => this.logout(navigation)}
              >Sair</Text>
            </Block>
          </Block>
        </ScrollView>
      </Block>



    );
  }
}


const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginRight: 80,
    marginLeft: 80,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: colors.lightblue
  },
  header: {
    paddingHorizontal: sizes.base * 2,
    marginTop: sizes.base * 2
  },
  label: {
    padding: sizes.base * 0.5,
    backgroundColor: colors.input,
    borderRadius: 10
  },
  inputs: {
    marginTop: sizes.base * 1,
    paddingHorizontal: sizes.base * 2,
  }

});
