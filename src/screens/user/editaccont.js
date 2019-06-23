import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView } from "react-native";
import { Text, Block, Input } from "../../components";
import firebase from 'react-native-firebase';
import { sizes, colors } from "../../components/theme";

export default class MyAccount extends Component {
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
    render() {
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

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Nome</Text>
                                <Input style={{ marginRight: 3, marginBottom: 3 }} >{this.state.usuario.nome}</Input>
                            </Block>
                            <Block center middle>
                                <Text h4 color="black3" >Sobrenome</Text>
                                <Input />
                            </Block>
                        </Block>

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Contato</Text>
                                <Input style={{ marginRight: 3, marginBottom: 3 }} />
                            </Block>
                            <Block center middle>
                                <Text h4 color="black3" >Email</Text>
                                <Input />
                            </Block>
                        </Block>

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Sexo</Text>
                                <Input style={{ marginRight: 3, marginBottom: 3 }} />
                            </Block>
                            <Block center middle>
                                <Text h4 color="black3" >Senha</Text>
                                <Input />
                            </Block>
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
        marginRight: 25,
        marginLeft: 25,
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
