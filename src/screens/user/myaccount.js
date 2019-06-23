import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView } from "react-native";
import { Text, Block } from "../../components";
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
    componentDidMount(){
        this.setState({ usuario: this.props.navigation.state.params.usuario});
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
                        <Text paragraph color="blue" weight="bold" >Meu Perfil</Text>

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Nome</Text>
                                <Text paragraph   >{this.state.usuario.nome}</Text>
                            </Block>
                            <Block center middle>
                                <Text h4 color="black3" >Sobrenome</Text>
                                <Text paragraph >{this.state.usuario.sobrenome}</Text>
                            </Block>
                        </Block>

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Contato</Text>
                                <Text paragraph   >{this.state.usuario.telefone}</Text>
                            </Block>
                            <Block center middle>
                                <Text h4 color="black3" >Email</Text>
                                <Text paragraph >{firebase.auth().currentUser.email}</Text>
                            </Block>
                        </Block>

                        <Block row style={styles.profile}>
                            <Block center middle>
                                <Text paragraph color="black3"  >Sexo</Text>
                                <Text paragraph >{this.state.usuario.sexo==0?"Masculino":"Feminino"}</Text>
                            </Block>
                            
                        </Block>

                        <Block middle style={styles.inputs}>
                            <Block style={styles.label}>
                                <Text h4 bold color="purple" center onPress={() => navigation.navigate("EditAccount",{usuario:this.state.usuario})}
                                >Alterar Dados</Text>
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
        paddingTop: 15
    },

    label: {
        padding: sizes.base * 0.5,
        backgroundColor: colors.input,
        borderRadius: 10
    },




});
