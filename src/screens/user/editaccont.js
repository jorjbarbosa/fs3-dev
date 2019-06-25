import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView } from "react-native";
import { Text, Block, Input, InputMask, TInput } from "../../components";
import firebase from 'react-native-firebase';
import { sizes, colors } from "../../components/theme";

export default class EditAccount extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('usuario');
        this.state = {
            usuario: '',

        }
    }
    componentWillMount() {
        this.setState({ usuario: this.props.navigation.state.params.usuario });
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
                        <Block center middle style={styles.icon}>
                        </Block>
                        <Text paragraph color="shadow" weight="bold" >Meu Perfil</Text>

                        <Block style={styles.profile}>
                            <Input
                                full
                                label="Primeiro Nome"
                                style={{ marginBottom: 25 }}
                                onChangeText={((primeiroNome) => this.setState({ primeiroNome }))}
                                value={this.state.usuario.nome}
                            />
                            <Input
                                full
                                label="Segundo Nome"
                                style={{ marginBottom: 25 }}
                                onChangeText={((segundoNome) => this.setState({ segundoNome }))}
                                value={this.state.usuario.sobrenome}

                            />
                            <InputMask
                                full
                                label="Telefone"
                                mask={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true
                                }}
                                onChangeText={((contato) => this.setState({ contato }))}
                                value={this.state.usuario.contato}
                                style={{ marginBottom: 25 }}
                            />

                            <Input
                                full
                                label="Contato"
                                style={{ marginBottom: 25 }}
                                onChangeText={((segundoNome) => this.setState({ segundoNome }))}
                                value={firebase.auth().currentUser.email}
                            />
                            <Input

                                password
                                label="Senha"
                                style={{ marginBottom: 25 }}
                                onChangeText={((senha) => this.setState({ senha }))}
                                value={firebase.auth().currentUser.password}
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

                        <Block middle style={styles.inputs}>
                            <Block style={styles.label}>
                                <Text h4 bold color="purple" center onPress={() => navigation.navigate("editaccont")}
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
