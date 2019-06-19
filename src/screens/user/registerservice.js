import React, { Component } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Block, Text, Input, InputMask, ControlTab } from "../.././components";


//import { errorMessage } from '../../config/Erros';
export default class RegisterService extends Component {
    state = {
        descricao: '',
        cidade: '',
        areaAtuacao: '',
        pagamento: '',
        preco: '',
    }
    check = (navigator) => {

    }
    render() {
        const { navigation } = this.props;
        return (
            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block center>
                    <Text h3 style={{ marginBottom: 6 }}>
                        Cadaste um serviço
                    </Text>
                    <Block center style={{ marginTop: 25 }}>
                        <Input
                            full
                            label="Primeiro Nome"
                            style={{ marginBottom: 25 }}
                            onChangeText={((descricao) => this.setState({ descricao }))}
                            value={this.state.descricao}
                        />
                        <Input
                            full
                            label="Cidade"
                            style={{ marginBottom: 25 }}
                            onChangeText={((cidade) => this.setState({ cidade }))}
                            value={this.state.cidade}
                        />
                        <Input
                            full
                            email
                            label="Endereço de Email"
                            keyboardType="email-address"
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
                            <Text button>Criar Conta</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAwareScrollView>
        )
    }
}
