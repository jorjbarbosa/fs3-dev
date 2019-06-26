import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView } from "react-native";
import { Text, Block, Input, InputMask, TInput } from "../../components";
import firebase from 'react-native-firebase';
import { sizes, colors } from "../../components/theme";

import { errorMessage } from '../../config/Erros';

db = firebase.firestore();
export default class EditAccount extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('usuario');
        this.state = {
            usuario: '',
            primeiroNome: '',
            segundoNome: '',
            telefone: '',
            telefoneRef: '',
            certificacoes: '',
            rg: ''
        }
    }
    componentWillMount() {
        const { usuario } = this.props.navigation.state.params;
        console.log(usuario);
        this.setState({
            usuario: usuario,
            primeiroNome: usuario.nome,
            segundoNome: usuario.sobrenome,
            telefone: usuario.telefone,
            rg: usuario.dados.rg,
            certificacoes: usuario.dados.certificacoes
        });
    }
    isPrestador() {
        if (this.state.usuario.prestador) {
            return (
                <Block>
                    <Input
                        full
                        keyboardType="number-pad"
                        label="RG"
                        style={{ marginBottom: 25 }}
                        onChangeText={((rg) => this.setState({ rg }))}
                        value={this.state.rg}
                    />
                    <TInput
                        multiline={true}
                        numberOfLines={5}
                        full
                        label="Certificações"
                        style={{ marginBottom: 25 }}
                        onChangeText={((certificacoes) => this.setState({ certificacoes }))}
                        value={this.state.certificacoes}
                    />
                </Block>

            );
        }
    }
    update(navigate) {
        var dados = {};
        if (this.state.usuario.dados.tipoPessoa) {
            dados = {
                rg: this.state.rg,
                certificacoes: this.state.certificacoes,
                cpf: this.state.usuario.dados.cpf,
                tipoPessoa: true
            }
        } else {
            dados = {
                rg: this.state.rg,
                certificacoes: this.state.certificacoes,
                cnpj: this.state.usuario.dados.cnpj,
                tipoPessoa: false
            }
        }

        user = {
            nome: this.state.primeiroNome,
            sobrenome: this.state.segundoNome,
            telefone: this.state.telefoneRef.getRawValue(),
            dados: dados
        }


        try {
            db.collection('usuario').doc(firebase.auth().currentUser.uid).update(user);
            Alert.alert(
                "Tudo certo...",
                "Seus dados foram atualizados",
                [
                  {
                    text: 'OK',
                    onPress: () => navigate.navigate("MyAccount",{ usuario: this.state.usuario })
                  }
                ]
              );
        } catch (error) {
            console.log(error);
            Alert.alert(
                'Aviso',
                errorMessage(error.code),
                [{
                    text:"Tente novamente",
                    onPress:()=>this.update(navigate)
                }]
            );
        }

    }
    check = (navigate) => {
        if (this.state.primeiroNome.trim() != "" &&
            this.state.segundoNome.trim() != "" &&
            this.state.telefone.trim() != "" && this.state.telefoneRef.getRawValue().trim() != "" &&
            this.state.rg.trim() != ""
        ) {
            this.update(navigate);
        } else {
            Alert.alert("Preencha os dados corretamente");
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Block >
                    <Block>
                        <Text h3 row weight="bold" style={styles.header}>Minha Conta</Text>
                    </Block>

                    <Block
                        center
                        middle
                        style={styles.card}>
                        {/* <Block center middle style={styles.icon}>
                        </Block> */}
                        <Text paragraph color="shadow" weight="bold" >Meu Perfil</Text>

                        <Block style={styles.profile}>
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
                            <InputMask
                                full
                                label="Telefone"
                                mask={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true
                                }}
                                reference={((ref) => this.state.telefoneRef = ref)}
                                onChangeText={((contato) => this.setState({ contato }))}
                                value={this.state.telefone}
                                style={{ marginBottom: 25 }}
                            />


                            {this.isPrestador()}
                        </Block>

                        <Block middle style={styles.inputs}>
                            <Block style={styles.label}>
                                <Text h4 bold color="purple" center onPress={() => this.check(navigation)}
                                >Salvar Dados</Text>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: sizes.base * 2,
        marginTop: sizes.base * 1.5,
        paddingBottom: sizes.base * 2,

    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 5,
        backgroundColor: colors.white,
        marginRight: 20,
        marginLeft: 20,
    },
    icon: {
        flex: 0,
        height: 120,
        width: 120,
        borderRadius: 48,
        marginBottom: 15,
        backgroundColor: colors.lightblue
    },
    inputs: {
        marginTop: sizes.base * 1,
        paddingHorizontal: sizes.base * 0.4,
    },
    profile: {
        paddingTop: 15,
    },

    label: {
        padding: sizes.base * 0.5,
        backgroundColor: colors.input,
        borderRadius: 10
    },




});
