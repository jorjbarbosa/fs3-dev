import React, { Component } from 'react'
import { View, Alert, Picker } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Block, Text, Input, InputMask, ControlTab } from "../.././components";

import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


const googleApiKey = "AIzaSyCcrDpAw-45eNuPCl-e8fbwXwErOfnugeY";
export default class RegisterService extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('areas');
        this.state = {
            descricao: '',
            cidade: '',
            areaAtuacao: [],
            areas: [],
            pagamento: '',
            preco: '',
            error: '',
            load: true,
        }
    }
    check = (navigator) => {

    }
    componentWillMount() {
        const areas = [];
        navigator.geolocation.getCurrentPosition(
            (position) => {
                url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + googleApiKey
                fetch(url).then((response) => response.json())
                    .then((responseJson) => {
                        responseJson.results[0].address_components.forEach(component => {
                            if (component.types.indexOf('administrative_area_level_2') != -1) {
                                this.setState({ cidade: component.long_name });
                            }
                        });
                    });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );

        this.ref.get().then(snapshot => {

            snapshot.forEach(doc => {
                const { nome } = doc.data();
                areas.push({
                    key: doc.id,
                    nome
                });
            });
            this.setState({
                areas: areas,
                areaAtuacao: areas[0]
            });


        });

    }



    render() {
        const { navigation } = this.props;
        // if(!this.state.load){
        //     return (
        //     <View>
        //         <Text>Estou Carregando</Text>
        //     </View>
        //     )    
        // }
        // else
        return (

            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block center>
                    <Text h3 style={{ marginBottom: 6 }}>
                        Cadastre um serviço
                    </Text>
                    <Block center style={{ marginTop: 25 }}>
                    <Block>
                        <Input
                            full
                            label="Descricao"
                            style={{ marginBottom: 25 }}
                            onChangeText={((descricao) => this.setState({ descricao }))}
                            value={this.state.descricao}
                        />
                    </Block>
                        
                        <Input
                            full
                            label="Descricao"
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
                            style={{ height: 50, width: 100 }}
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
                        <Input
                            full
                            email
                            label="Area de atuação"
                            textContentType="emailAddress"
                            style={{ marginBottom: 25 }}
                            onChangeText={((email) => this.setState({ email }))}
                            value={this.state.email}

                        />

                        <ControlTab //forma de pagamento
                            full
                            label="Forma de pagamento"
                            multiple='false'
                            values={['Dinheiro', 'Cartão']}
                            selectedIndex={this.state.sexo}
                            onTabPress={((sexo) => this.setState({ sexo }))}
                            style={{ marginBottom: 25 }}
                        />
                        <InputMask
                            full
                            label="Preço"
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
