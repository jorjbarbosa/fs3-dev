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
            tipoPessoa: 0,
            cnpj: '',
            certificacoes: '',
            error: '',
            load: true,
        }
    }

    render() {
        const pessoaFisica = <Input
            full
            label="CPF"
            style={{ marginBottom: 25 }}
            onChangeText={((cpf) => this.setState({ cpf }))}
            value={this.state.cpf}
        />;
        const pessoaJuridica = <Input
            full
            label="cnpj"
            style={{ marginBottom: 25 }}
            onChangeText={((cnpj) => this.setState({ cnpj }))}
            value={this.state.cnpj}
        />;
        return (
            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block center>
                    <Text h3 style={{ marginBottom: 6 }}>
                       Insira seus dados
                    </Text>
                    <Text paragraph color="black3">
                        Suas informações estão seguras, não se preocupe
                    </Text>
                    <Block center style={{ marginTop: 25 }}>
                        <Input
                            full
                            label="RG"
                            style={{ marginBottom: 25 }}
                            onChangeText={((registroGeral) => this.setState({ registroGeral }))}
                            value={this.state.registroGeral}
                        />
                        <ControlTab
                            full
                            label="Tipo"
                            multiple='false'
                            values={['Pessoa Fisica', 'Pessoa Juridica']}
                            selectedIndex={this.state.tipoPessoa}
                            onTabPress={((tipoPessoa) => this.setState({ tipoPessoa }))}
                            style={{ marginBottom: 25 }}
                        />
                        {this.state.tipoPessoa==0?pessoaFisica:pessoaJuridica}
                        <Input
                            full
                            password
                            label="Certificacoes"
                            style={{ marginBottom: 25 }}
                            onChangeText={((certificacoes) => this.setState({ certificacoes }))}
                            value={this.state.certificacoes}

                        />


                        <Button
                            full
                            style={{ marginBottom: 12 }}
                            onPress={() => this.check(navigation)}
                        >
                            <Text button>Avançar</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAwareScrollView>
        )
    }
}
