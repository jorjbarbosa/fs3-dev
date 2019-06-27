import React, { Component } from 'react'
import { View, Alert, Picker, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Block, Text, Input, InputMask, ControlTab,TInput } from "../.././components";
import { sizes, colors } from "../../components/theme";
import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
const googleApiKey = "AIzaSyCcrDpAw-45eNuPCl-e8fbwXwErOfnugeY";
export default class RegisterService extends Component {
    constructor() {
        super();
        this.refArea = firebase.firestore().collection('areas');
        this.refUsuario = firebase.firestore().collection('usuario');
        var precoField;
        this.state = {
            titulo: '',
            descricao: '',
            cidade: '',
            estado: '',
            areaAtuacao: [],
            areas: [],
            pagamento: [],
            preco: '',
            error: '',
            load: true,
        }
    }
    check = (navigator) => {
        if (this.state.titulo.trim() != "" && this.state.descricao.trim() != "" && this.state.cidade.trim() != "" && this.state.estado.trim() != "" &&
            this.state.areaAtuacao.key != -1 && this.precoField.getRawValue() > 0 && this.state.pagamento.length > 0) {

            var servico = {
                proprietario: this.refUsuario.doc(firebase.auth().currentUser.uid),
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                localizacao: {
                    cidade: this.state.cidade,
                    estado: this.state.estado
                },
                area: this.refArea.doc(this.state.areaAtuacao.key),
                preco: this.precoField.getRawValue(),
                pagamento: {
                    dinheiro: this.state.pagamento.includes(0),
                    cartao: this.state.pagamento.includes(1)
                },
                nota: 0
            }
            if (!navigator.state.params.usuario.prestador) {
                if (navigator.state.params.usuario.tipoPessoa) {
                    user = {
                        prestador: true,
                        dados: {
                            certificacoes: navigator.state.params.usuario.certificacoes,
                            rg: navigator.state.params.usuario.rg,
                            tipoPessoa: true,
                            cpf: navigator.state.params.usuario.cpf
                        }
                    }
                } else {
                    user = {
                        prestador: true,
                        dados: {
                            certificacoes: navigator.state.params.usuario.certificacoes,
                            rg: navigator.state.params.usuario.rg,
                            tipoPessoa: false,
                            cnpj: navigator.state.params.usuario.cnpj
                        }
                    }
                }
            }
            try {
                navigator.state.params.usuario.prestador ? null : db.collection('usuario').doc(firebase.auth().currentUser.uid).update(user);
                db.collection('servicos').doc().set(servico);
                Alert.alert(
                    "Aviso",
                    "Serviço registrado com sucesso",
                    [
                        {
                            text: 'OK',
                            onPress: () => navigator.navigate("Index")
                        }
                    ]
                );
            } catch (error) {
                console.log(error)
                Alert.alert(
                    "Aviso",
                    errorMessage(error.code),
                    [
                        {
                            text: 'Cancelar'
                        },
                        {
                            text: "Tentar novamente",
                            onPress: () => this.check(navigator)
                        }
                    ]
                );
            };
        } else {
            Alert.alert(
                "Aviso",
                "Preencha os dados corretamente",
                [
                    {
                        text: 'OK'
                    }
                ]
            );
        }
    }
    componentWillMount() {
        const areas = [];
        areas.push({
            key: -1,
            nome: "Selecione"
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + googleApiKey
                fetch(url).then((response) => response.json())
                    .then((responseJson) => {
                        responseJson.results[0].address_components.forEach(component => {
                            if (component.types.indexOf('administrative_area_level_2') != -1) {
                                this.setState({ cidade: component.long_name });
                            }
                            if (component.types.indexOf('administrative_area_level_1') != -1) {
                                this.setState({ estado: component.short_name });
                            }
                        });
                    });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );

        this.refArea.get().then(snapshot => {
            snapshot.forEach(doc => {
                const { nome } = doc.data();
                areas.push({
                    key: doc.id,
                    nome
                });
            });
            this.setState({
                areas: areas,
                areaAtuacao: areas[0],
                load: false
            });
        });
        console.log(this.props.navigation.state.params.usuario);
    }
    multIndexSelect = (index) => {
        const { pagamento } = this.state
        if (pagamento.includes(index)) {
            this.setState(prevState => ({
                ...prevState,
                pagamento: pagamento.filter((i) => i !== index),
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                pagamento: [
                    ...pagamento,
                    index,
                ],
            }))
        }
    }
    render() {
        const { navigation } = this.props;

        if (this.state.load) {//colocar animação de carregamento
            return (
                <View>
                    <Text>Estou Carregando</Text>
                </View>
            )
        }
        else
            return (

                <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                    <Block >
                        <Text h3 weight="bold" style={styles.header}>Registrar Serviço</Text>
                        <Block center style={{ marginTop: 25 }}>
                            <Input
                                full
                                label="Titulo"
                                style={{ marginBottom: 25 }}
                                onChangeText={((titulo) => this.setState({ titulo }))}
                                value={this.state.titulo}
                            />
                            <TInput
                                multiline={true}
                                numberOfLines={5}
                                full
                                label="Descricação"
                                style={{ marginBottom: 25 }}
                                onChangeText={((descricao) => this.setState({ descricao }))}
                                value={this.state.descricao}
                            />
                            <Input
                                full
                                label="Cidade"
                                placeholder="Carregando..."
                                style={{ marginBottom: 25 }}
                                onChangeText={((cidade) => this.setState({ cidade }))}
                                value={this.state.cidade}
                            />
                            <View>
                                <Text>Area de atuação</Text>
                            </View>
                            <Picker
                                selectedValue={this.state.areaAtuacao.key}
                                mode="dropdown"
                                style={{ height: 50, width: 200 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({
                                        areaAtuacao: this.state.areas[itemIndex]
                                    })
                                }
                            >
                                {
                                    this.state.areas.map((item) => {
                                        return <Picker.Item label={item.nome} value={item.key} key={item.key} />
                                    })
                                }
                            </Picker>

                            <ControlTab //forma de pagamento
                                full
                                label="Forma de pagamento"
                                multiples='true'
                                values={['Dinheiro', 'Cartão']}
                                selectedIndices={this.state.pagamento}
                                onTabPress={this.multIndexSelect}
                                style={{ marginBottom: 25 }}
                            />
                            <InputMask
                                full
                                label="Preço"
                                keyboardType="number-pad"
                                mask={'money'}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                onChangeText={((preco) => this.setState({ preco }))}
                                value={this.state.preco}
                                style={{ marginBottom: 25 }}
                                reference={((ref) => this.precoField = ref)}
                            />
                            <Button
                                full
                                style={{ marginBottom: 12 }}
                                onPress={() => this.check(navigation)}
                            >
                                <Text button>Criar Serviço</Text>
                            </Button>
                        </Block>
                    </Block>
                </KeyboardAwareScrollView>
            )
    }
}
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: sizes.base * 2,

    }
})