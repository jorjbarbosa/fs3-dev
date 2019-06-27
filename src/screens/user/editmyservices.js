import React, { Component } from 'react'
import { View, Alert, Picker, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Block, Text, Input, InputMask, ControlTab,TInput } from "../.././components";
import { sizes, colors } from "../../components/theme";
import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();

export default class EditMyServices extends Component {
    constructor(){
        super();
        this.refArea = firebase.firestore().collection('areas');
        this.refUsuario = firebase.firestore().collection('usuario');
        var precoField;
        this.state = {
            titulo: '',
            descricao: '',
            areaAtuacao: [],
            areas: [],
            pagamento: [],
            preco: '',
            error: '',
            key:'',
            load: true,
        }
    }
    componentWillMount() {
        const areas = [];
        const areaSelecionada=[];
        areas.push({
            key: -1,
            nome: "Selecione"
        });
        const {service} = this.props.navigation.state.params;
        this.setState({
            areaAtuacao:service.area,
            descricao:service.descricao,
            key:service.key,
            pagamento:[service.pagamento.cartao?1:null,service.pagamento.dinheiro?0:null],
            preco:service.preco,
            titulo:service.titulo
        });
        this.refArea.get().then(snapshot => {
            snapshot.forEach(doc => {
                const { nome } = doc.data();
                if(service.area==nome){
                    areaSelecionada.push({
                        key:doc.id,
                        nome
                    });
                }
                    console.log(nome);
                areas.push({
                    key: doc.id,
                    nome
                });
            });
            console.log(areaSelecionada);
            this.setState({
                areas: areas,
                areaAtuacao: areaSelecionada[0],
                load: false
            });
        });
       
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
        const {navigation} = this.props;
        if (this.state.load) {//colocar animação de carregamento
            return (
                <View>
                    <Text>Estou Carregando</Text>
                </View>
            )
        }
        return (
 
            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block >
                    <Text h3 weight="bold" style={styles.header}>
                        Editar Serviço
                    </Text>
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
    check=(navigation)=>{
        if (this.state.titulo.trim() != "" && this.state.descricao.trim() != "" &&
        this.state.areaAtuacao.key != -1 && this.precoField.getRawValue() > 0 && this.state.pagamento.length > 0) {
            var servico = {
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                area: this.refArea.doc(this.state.areaAtuacao.key),
                preco: this.precoField.getRawValue(),
                pagamento: {
                    dinheiro: this.state.pagamento.includes(0),
                    cartao: this.state.pagamento.includes(1)
                }
            }
            try {
                db.collection('servicos').doc(this.state.key).update(servico);
                Alert.alert(
                    "Aviso",
                    "Serviço registrado com sucesso",
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate("MyServices")
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
        }else {
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
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: sizes.base * 2

    }
})
