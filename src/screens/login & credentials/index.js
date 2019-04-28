import React, { Component } from "react";
import { View, KeyboardAvoidingView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Block, Text, Input } from "../../components";
//const { height } = Dimensions.get("window");

/**
 *
 * Este é o codigo do Login,
 *
 *
 */
class Login extends Component {
  render() {
    // const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding "
        style={{ flex: 1 }}
        keyboardVerticalOffset={600}
      >
        <View>
          <StatusBar backgroundColor="#BFC5D2" barStyle="light-content" />
        </View>
        <Block center middle>
          <Block middle>
            <Icon
              name="tools"
              color="#772ea2"
              size={50}
              style={{ height: 100, width: 102, marginLeft: 35, marginTop: 10 }}
            />
          </Block>

          <Block flex={3.5} center>
            <Text h3 style={{ marginBottom: 1 }}>
              Entre no Trampos
            </Text>
            <Text paragraph color="black3">
              Digite suas credenciais.
            </Text>
            <Block center style={{ marginTop: 40 }}>
              <Input full email label="Email " style={{ marginBottom: 15 }} />
              <Input
                full
                password
                label="Senha"
                style={{ marginBottom: 25 }}
                rightLabel={
                  <Text paragraph color="gray">
                    Esqueceu sua Senha?
                  </Text>
                }
              />

              <Button full style={{ marginBottom: 12 }}>
                <Text button>Entrar</Text>
              </Button>
              <Text paragraph color="gray">
                Não possui conta?{" "}
                <Text height={20} color="blue">
                  Cadastre-se
                </Text>
              </Text>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
