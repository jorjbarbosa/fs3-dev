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
        var precoField;
        this.state = {
            descricao: '',
            cidade: '',
            estado:'',
            areaAtuacao: [],
            areas: [],
            pagamento: 0,
            preco: '',
            error: '',
            load: true,
        }
    }
    check = (navigator) => {
       if(this.state.descricao.trim()!="" && this.state.cidade.trim()!="" && this.state.estado.trim()!="" &&
        this.state.areaAtuacao.key!=-1 && this.precoField.getRawValue()>0){
            Alert.alert("Ta ok");
        }else{
            Alert.alert("Preencha os dados corretamente");
        }
    }
    componentWillMount() {
        const areas=[];
        areas.push({
            key:-1,
            nome:"Selecione"
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
                            if(component.types.indexOf('administrative_area_level_1')!=-1){
                                this.setState({ estado: component.short_name });
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
                areaAtuacao: areas[0],
                load:true
            });


        });

    }

    render() {
        const { navigation } = this.props;
        
        if(!this.state.load){//colocar animação de carregamento
            return (
            <View>
                <Text>Estou Carregando</Text>
            </View>
            )    
        }
        else
        return (

            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block center>
                    <Text h3 style={{ marginBottom: 6 }}>
                        Cadastre um serviço
                    </Text>
                    <Block center style={{ marginTop: 25 }}>                        
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

                        <ControlTab //forma de pagamento
                            full
                            label="Forma de pagamento"
                            multiple='false'
                            values={['Dinheiro', 'Cartão']}
                            selectedIndex={this.state.pagamento}
                            onTabPress={((pagamento) => this.setState({ pagamento }))}
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
