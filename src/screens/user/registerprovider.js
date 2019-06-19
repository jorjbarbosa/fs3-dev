import React, { Component } from 'react'
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
export default class RegisterProvider extends Component {
    constructor() {
        super();
        this.state = {
            registroGeral: '',
            cpf: '',
            cnpj: '',
            certificacoes: '',
            error: '',
            load: true,
        }
    }
    render() {
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
                            label="RG"
                            style={{ marginBottom: 25 }}
                            onChangeText={((registroGeral) => this.setState({ registroGeral }))}
                            value={this.state.registroGeral}
                        />
                        <Input
                            full
                            label="CPF"
                            style={{ marginBottom: 25 }}
                            onChangeText={((cpf) => this.setState({ cpf }))}
                            value={this.state.cpf}

                        />
                        <Input
                            full
                            label="cnpj"
                            style={{ marginBottom: 25 }}
                            onChangeText={((cnpj) => this.setState({ cnpj }))}
                            value={this.state.cnpj}

                        />
                        <Input
                            full
                            password
                            label="Certificacoes"
                            style={{ marginBottom: 25 }}
                            onChangeText={((certificacoes) => this.setState({ certificacoes }))}
                            value={this.state.certificacoes}

                        />
                        <ControlTab
                            full
                            label="Sexo"
                            multiple='false'
                            values={['Masculino', 'Feminino']}
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
        )
    }
}
