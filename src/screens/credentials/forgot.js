import React, { Component } from "react";
import { StatusBar, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Block, Text, Input } from "../../components";
const { height } = Dimensions.get("window");




class Forgot extends Component {
  render() {
    return (
      <KeyboardAwareScrollView
        enabled
        behavior="padding "
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.1}
      >
        <StatusBar backgroundColor="#BFC5D2" barStyle="light-content" />

        <Block center middle>
          <Block middle>
            <Icon
              name="tools"
              color="#772ea2"
              size={50}
              style={{ height: 100, width: 102, marginLeft: 35, marginTop: 40 }}
            />
          </Block>

          <Block flex={3.5} center>
            <Text h3 style={{ marginBottom: 1 }}>
              Trampos
          </Text>
            <Text paragraph color="black3">
              Digite seu email para recuperar sua senha.
          </Text>
            <Block center style={{ marginTop: 40 }}>
              <Input full email label="Email " style={{ marginBottom: 15 }} />


              <Button
                full
                style={{ marginBottom: 12 }}

              >
                <Text button>Entrar</Text>
              </Button>

            </Block>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}

export default Forgot;
