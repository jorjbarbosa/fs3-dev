import React, { Component } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { View, StatusBar, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { Input, Block, Text, Card, MaskText } from '../../components';
import { sizes, colors } from "../../components/theme";

import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
export default class Explore extends Component {
    constructor() {
        super();
        this.refUsuario = firebase.firestore().collection('usuario');
        this.refServicos = firebase.firestore().collection('servicos');
        this.refServicosContratados = firebase.firestore().collection('servicos_contratados');
        this.state = {
            servicos: '',
            serv:'',
            load: true,
            refreshing: false
        }
    }
    componentWillMount() {
        this.loadData();
    }
    // componentDidUpdate() {
    //     this.loadData();
    // }
    loadData() {
        const services = [];
        const userRef = this.refUsuario.doc(firebase.auth().currentUser.uid);
        this.refServicosContratados.get().then(snapshot => {
            snapshot.forEach(doc => {
                const service = doc.data();
                
                
                services.push(service);
            });
            this.setState({
                servicos: services,
                load: false,
                refreshing: false
            });
            this.loadServices();

        }).catch(err => {
            this.setState({
                load: false,
                refreshing: false
            });
            Alert.alert(
                "Ops...",
                "Ocorreu um erro",
                [{
                    text: 'Tentar novamente',
                    onPress: () => this.loadData()
                }]
            );
            console.log('Error getting documents', err);
        });
    }
    renderExplore(item) {

        return (
            <Card style={styles.card} >
                <Block row space="between">
                    <Image
                        source={require('../../assets/images/icons/distance.png')}
                    />
                    <Block style={styles.cargo} middle >
                        <Text h5 weight="bold">{item.servico.titulo}</Text>
                    </Block>
                    <MaskText h5 style={styles.cargo} mask="money" value={item.servico.preco} /> 
                </Block>
                
                 <Block row style={styles.stat}>
                    <Block style={styles.stat2}>
                        <Text caption >Pagamento</Text>
                        <Text paragraphGray >
                            {item.servico.dinheiro ? <Icon name="credit" color="teal" size={15} /> : null}
                            {item.servico.cartao ? <Icon name="credit-card" color="teal" size={15} /> : null}
                            
                        </Text> 
                    </Block>
                    <Block >
                        <Text caption>Dia</Text>
                        <Text paragraph>{item.data.seconds}</Text>
                    </Block>

                </Block>
            </Card>
        )
    }


    render() {
        if (this.state.load || this.state.refreshing) {
            return (
                <View>
                    <Text style={styles.item}>Carregando</Text>
                </View>
            );
        }
        return (
            <View>
                <View>
                    <Text h3 weight="bold" style={styles.header}>Serviços Contratados</Text>
                </View>
                <FlatList showsVerticalScrollIndicator={false} style={styles.explore}
                    data={this.state.servicos}
                    style={styles.explore}
                    renderItem={({ item }) =>
                        this.renderExplore(item)
                    }
                    keyExtractor={item => item.key}
                    refreshing={this.state.refreshing}
                    onRefresh={this.reloadList}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: sizes.base * 2,
        marginTop: sizes.base * 1.5,
        paddingBottom: sizes.base * 2,

    },
    card: {
        borderRadius: 3
    },
    cargo: {
        padding: 5,
        marginTop: 8,
        marginLeft: 5
    },
    stat: {
        marginLeft: 10
    },
    stat2: {
        marginRight: 0
    },
    explore: {
        marginHorizontal: sizes.padding * 0.5
    }


})