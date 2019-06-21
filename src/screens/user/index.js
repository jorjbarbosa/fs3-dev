import React, { Component } from "react";
import { Alert, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { Text, Block } from "../../components";
import firebase from 'react-native-firebase';
import { errorMessage } from '../../config/Erros';
import { sizes, colors } from "../../components/theme";
//import { } from "react-native-gesture-handler";
export default class User extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('usuario');
    this.state = {
      usuario: '',
    }
  }
  componentWillMount() {
    user = firebase.auth().currentUser;
    this.ref.doc(user.uid).get().then(doc => {
      this.setState({ usuario: doc.data() });
    }).catch(err => {
      console.log(err);//avisar falta de conexao
    });
  }
  logout = (navigate) => {
    firebase.auth().signOut().then(() => {
      navigate.navigate("Login");
    }).catch((error) => {
      Alert.alert(errorMessage(error.code));//aviso de erro
    });
  }
  check = (navigate) => {
    Alert.alert(
      "ALERTA",
      "Você será desconectado",
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar pressed') },
        {
          text: 'Confirmar',
          onPress: () => this.logout(navigate)
        }
      ]
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block >
        <Block>
          <Text h3 weight="bold" row style={styles.header}>Configurações</Text>
        </Block>

        <Block
          center
          middle
          style={styles.card}>
          <Block center middle style={styles.icon} >
          </Block>
          <Text h4 style={{ marginBottom: 11 }}>Olá {this.state.usuario.nome}!</Text>
          <Text paragraph center color="black3">O que desejas?</Text>
        </Block>


        <ScrollView showsVerticalScrollIndicator={false}>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between" >
                <Icon name="user" color="purple" size={30} />
                <Block >
                  <Text bold onPress={() => navigation.navigate("MyAccount", { usuario: this.state.usuario })}>Minha conta</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => navigation.navigate("MyAccount", { usuario: this.state.usuario })} >
                  <Icon name="chevron-right" color="purple" size={25} />
                </Text>
              </Block>
            </Block>
          </Block>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between">
                <Icon name="pencil" color="purple" size={30} />
                <Block>
                  <Text bold onPress={() => this.state.usuario.prestador
                    ? navigation.navigate("RegisterService")
                    : navigation.navigate("RegisterProvider")}>Registrar Serviço</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => this.state.usuario.prestador
                  ? navigation.navigate("RegisterService")
                  : navigation.navigate("RegisterProvider")}>
                  <Icon name="chevron-right" color="purple" size={25} />
                </Text>
              </Block>
            </Block>
          </Block>

          <Block style={styles.inputs}>
            <Block style={styles.label}>
              <Block row space="between">
                <Icon name="trophy" color="purple" size={30} />
                <Block>
                  <Text h4 bold onPress={() => navigation.navigate("EngagedService")}>Serviços Contratados</Text>
                </Block>
                <Text medium secundary color="purple" onPress={() => navigation.navigate("EngagedService")}>
                  <Icon name="chevron-right" color="purple" size={25} /></Text>
              </Block>
            </Block>
          </Block>


          <Block middle style={styles.inputs}>
            <Block style={styles.label}>
              <Text h4 bold color="purple" center onPress={() => this.check(navigation)}
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
    borderRadius: 2
  },
  inputs: {
    marginTop: sizes.base * 1,
    paddingHorizontal: sizes.base * 2,
  }

});
