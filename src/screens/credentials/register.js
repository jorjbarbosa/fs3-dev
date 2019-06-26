import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  View
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Block, Text, Input, InputMask, ControlTab } from "../.././components";


import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';
const db = firebase.firestore();

class Register extends Component {

  state = {
    active: null,
    isAuthenticated: false,
    primeiroNome: '',
    segundoNome: '',
    email: '',
    telefone: '',
    telefoneRef:'',
    senha: '',
    sexo:0,
    primeiroNomeErr: '',
    segundoNomeErr: '',
    emailErr: '',
    telefoneErr: '',
    senhaErr: '',
  }


  register = (navigate) => {
    data = {
      nome: this.state.primeiroNome,
      sobrenome: this.state.segundoNome,
      telefone: this.state.telefoneRef.getRawValue(),
      sexo: this.state.sexo
    }
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(function () {
        user = firebase.auth().currentUser;       
        db.collection('usuario').doc(user.uid).set(data);
        navigation.navigate("MyAccount", { usuario: this.state.usuario })   // redirecionar cadastro bem sucedido      
      })
      .catch(error => {
        Alert.alert(errorMessage(error.code));//aviso de erro
      });
  }
  check=(navigate)=>{
    if(this.state.primeiroNome.trim()!="" &&
      this.state.segundoNome.trim()!="" &&
      this.state.telefone.trim()!="" &&
      this.state.email.trim()!="" &&
      this.state.senha.trim()!=""
    ){
      this.register(navigate);
    }else{
      Alert.alert("Preencha os dados corretamente");
    }
  }
  render() {
    const { navigation } = this.props;
    
    return (
      <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
        <Block center middle>
          <Icon
            name="tools"
            color="#772ea2"
            size={50}
            style={{ height: 100, width: 102, marginLeft: 35, marginTop: 10 }}
          />
        </Block>
        <Block center>
          <Text h3 style={{ marginBottom: 6 }}>
            Cadastre-se
          </Text>
          <Text paragraph color="black3">
            Tão simples quanto fazer gelo.
          </Text>
          <Block center style={{ marginTop: 25 }}>
            <Input
              full
              label="Primeiro Nome"
              style={{ marginBottom: 25 }}
              onChangeText={((primeiroNome) => this.setState({ primeiroNome }))}
              value={this.state.primeiroNome}
            />
            <Input
              full
              label="Segundo Nome"
              style={{ marginBottom: 25 }}
              onChangeText={((segundoNome) => this.setState({ segundoNome }))}
              value={this.state.segundoNome}
              
            />
            <Input
              full
              email
              label="Endereço de Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={{ marginBottom: 25 }}
              onChangeText={((email) => this.setState({ email }))}
              value={this.state.email}
              
            />

            <InputMask
              full
              label="Contato"
              mask={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true
              }}
              onChangeText={((telefone) => this.setState({ telefone }))}
              value={this.state.telefone}
              style={{ marginBottom: 25 }}
              reference={((ref) => this.telefoneRef = ref)}
            />
            <Input
              full
              password
              label="Senha"
              style={{ marginBottom: 25 }}
              onChangeText={((senha) => this.setState({ senha }))}
              value={this.state.senha}
              
            />
            <ControlTab
              full
              label="Sexo"
              multiple='false'
              values={['Masculino','Feminino']}
              selectedIndex={this.state.sexo}
              onTabPress={((sexo) => this.setState({ sexo }))}
              style={{ marginBottom: 25 }}
            />

            <Button
              full
              style={{ marginBottom: 12 }}
              onPress={() => this.check(navigation)}
            >
              <Text button>Criar Conta</Text>
            </Button>
            <Text paragraph color="gray">
              Já possui Conta?{" "}
              <Text
                height={18}
                color="blue"
                onPress={() => navigation.navigate("Login")}
              >
                Entrar
              </Text>
            </Text>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}

export default Register;

const styles = StyleSheet.create({

});
