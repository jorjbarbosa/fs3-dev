import React, { Component } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Dimensions, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, Divider, Button, MaskText } from '../../components';
import { sizes, colors } from "../../components/theme";
const { width, height } = Dimensions.get('window');
import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
class Details extends Component {
    constructor() {
        super();
        this.refUsuario = firebase.firestore().collection('usuario');
        this.refServicos = firebase.firestore().collection('servicos');
        this.state = {
            service: '',
            load: true,
            refreshing: false
        }
    }
    componentWillMount() {
        this.setState({ service: this.props.navigation.state.params.service, load: false });
    }
    render() {
        if (this.state.load) {
            return (
                <View>
                    <Text style={styles.item}></Text>
                </View>
            );
        }
        return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <Image
                    // source={require('../../assets/images/icons/image.png')}
                    resizeMode="contain"
                    style={{ width, height: height / 2.8 }}
                />
                <Block style={styles.product}  >
                    <Block middle>
                        <Block row >
                            <Text h3 multiline={true}
                                numberOfLines={5}>{this.state.service.titulo}</Text>
                        </Block>
                        <MaskText h5 style={styles.cargo} mask="money" value={this.state.service.preco} />
                    </Block>


                    <Block row style={styles.stat}>
                        <Block style={{ marginLeft: 10 }}>
                            <Text caption row>Nome</Text>
                            <Text paragraph row>Jose</Text>
                        </Block>
                        <Block >
                            <Text caption row>Sobrenome</Text>
                            <Text paragraph row>Jose</Text>
                        </Block>
                    </Block>

                    <Block flex={false} row middle>
                        {this.state.service.pagamento.cartao ? <Icon name="credit-card" style={styles.tag} size={15} /> : null}
                        {this.state.service.pagamento.dinheiro ? <Icon name="credit" style={styles.tag} size={15} /> : null}

                        <Text paragraph>{this.state.service.nota}</Text>
                        <Text caption style={styles.tag}><Icon name="heart-outlined" color="red" size={15} /></Text>
                    </Block>
                    <Divider />
                    <Text semibold>Descrição</Text>
                    <Text color="gray" light height={22} >
                    {this.state.service.descricao}

                    </Text>
                    <Divider />
                   
                    <Block style={styles.footer}>
                        <Button style={styles.btn}>
                            <Text bold color="white">
                                <Icon name="phone" color="white" size={20} />
                                Contratar
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </ScrollView >
        )
    }
}

export default Details;

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: sizes.base * 2,
        paddingVertical: sizes.padding,

    },
    stat: {
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    tag: {
        borderColor: colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: sizes.base,
        paddingHorizontal: sizes.base,
        paddingVertical: sizes.base / 2.5,
        marginRight: sizes.base * 0.625,
    },
    image: {
        width: width / 3.26,
        height: width / 3.26,
        marginRight: sizes.base,
    },
    more: {
        width: 55,
        height: 55,
    },
    footer: {
        position: 'relative',
        bottom: 0,
        right: 0,
        left: 0,
        //overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        paddingBottom: sizes.base * 0.05,
    },

    btn: {
        width: width / 2.4,
        backgroundColor: colors.green
    }
})
