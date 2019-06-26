import React, { Component } from 'react'
import { View, Alert, Picker, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Block, Text, Input, InputMask, ControlTab } from "../.././components";
import { sizes, colors } from "../../components/theme";
import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
const googleApiKey = "AIzaSyCcrDpAw-45eNuPCl-e8fbwXwErOfnugeY";
export default class EditMyServices extends Component {


    render() {

        return (

            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block >
                    <Text h3 weight="bold" style={styles.header}>
                        Editar Serviço
                    </Text>
                    <Block center style={{ marginTop: 25 }}>
                        <Input
                            full
                            label="Descrição"
                            style={{ marginBottom: 25 }}
                        /* onChangeText={((descricao) => this.setState({ descricao }))}
                        value={this.state.descricao} */
                        />
                        <Input
                            full
                            label="Cidade"
                            placeholder="Carregando..."
                            style={{ marginBottom: 25 }}
                        /* onChangeText={((cidade) => this.setState({ cidade }))}
                        value={this.state.cidade} */
                        />
                        <View>
                            <Text>Area de atuação</Text>
                        </View>
                        <Picker
                            //selectedValue={this.state.areaAtuacao.key}
                            mode="dropdown"
                            style={{ height: 50, width: 100 }}
                        /* onValueChange={(itemValue, itemIndex) =>
                            this.setState({
                                areaAtuacao: this.state.areas[itemIndex]
                            }) 
                        }*/
                        >
                            {
                                /* this.state.areas.map((item) => {
                                    return <Picker.Item label={item.nome} value={item.key} key={item.key} />
                                }) */
                            }
                        </Picker>

                        <ControlTab //forma de pagamento
                            full
                            label="Forma de pagamento"
                            multiples='true'
                            values={['Dinheiro', 'Cartão']}
                            //selectedIndices={this.state.pagamento}
                            //onTabPress={this.multIndexSelect}
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
                            //  onChangeText={((preco) => this.setState({ preco }))}
                            // value={this.state.preco}
                            style={{ marginBottom: 25 }}
                        // reference={((ref) => this.precoField = ref)}
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
        paddingHorizontal: sizes.base * 2

    }
})
