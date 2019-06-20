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
import { TextInputMask } from 'react-native-masked-text';

import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';

export default class RegisterProvider extends Component {
    constructor() {
        super();
        var cpfField;
        var cnpjField;
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
    displayCPF() {
        return (<InputMask
            key='cpf'
            full
            keyboardType="number-pad"
            label="CPF"
            placeholder="cpf"
            mask={'cpf'}
            onChangeText={((cpf) => this.setState({ cpf }))}
            value={this.state.cpf}
            style={{ marginBottom: 25 }}
            reference={((ref) => this.cpfField = ref)}
        />);
    }
    displayCNPJ() {
        return (<InputMask
            key='cnpj'
            full
            keyboardType="number-pad"
            label="CNPJ"
            mask={'cnpj'}
            onChangeText={((cnpj) => this.setState({ cnpj }))}
            value={this.state.cnpj}
            style={{ marginBottom: 25 }}
            reference={((ref) => this.cnpjField = ref)}
        />)
    }
    check = (navigate) => {
        data=[];
        if (
            this.state.registroGeral.trim() != "" && !isNaN(this.state.registroGeral) &&
            ((this.state.tipoPessoa == 0 && this.cpfField.isValid()) ||
             (this.state.tipoPessoa == 1 && this.cnpjField.isValid()))

        ) {
            if(this.state.tipoPessoa==0){
                data={
                    rg:this.state.registroGeral,
                    tipoPessoa:true,
                    cpf:this.state.cpf,
                    certificacoes:this.state.certificacoes.trim()!=""?this.state.certificacoes:"Nenhuma"
                }
            }else{
                data={
                    rg:this.state.registroGeral,
                    tipoPessoa:false,
                    cnpj:this.state.cpf,
                    certificacoes:this.state.certificacoes.trim()!=""?this.state.certificacoes:"Nenhuma"
                }
            }
            navigate.navigate('RegisterService',data);
        } else {
            Alert.alert("Preencha os dados corretamente");
        }
    }
    render() {
        const { navigation } = this.props;
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
                            keyboardType="number-pad"
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
                        {this.state.tipoPessoa == 0 ? this.displayCPF() :this.displayCNPJ()}
                        <Input
                            full
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
