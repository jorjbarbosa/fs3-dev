import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Block, Text, Input } from "../.././components";
import * as theme from "../.././components/theme";
class Register extends Component {
  state = {
    active: null
  };

  handleType = id => {
    const { active } = this.state;
    this.setState({ active: active === id ? null : id });
  };

  render() {
    const { navigation } = this.props;
    const { active } = this.state;

    const adminIcon = (
      <Image
        source={require("../.././assets/images/icons/energy.png")}
        style={{ height: 16, width: 14 }}
      />
    );

    const operatorIcon = (
      <Image
        source={require("../.././assets/images/icons/message.png")}
        style={{ height: 14, width: 14 }}
      />
    );

    const checkIcon = (
      <Image
        source={require("../.././assets/images/icons/check.png")}
        style={{ height: 18, width: 18 }}
      />
    );

    return (
      <KeyboardAwareScrollView
        style={{ marginVertical: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Block center middle>
          <Icon
            name="tools"
            color="#772ea2"
            size={50}
            style={{ height: 100, width: 102, marginLeft: 35, marginTop: 10 }}
          />
        </Block>
        <Block center>
          <Text h3 style={{ marginBottom: 6 }}>
            Cadastre-se
          </Text>
          <Text paragraph color="black3">
            Tão simples quanto fritar peixe.
          </Text>
          <Block row style={{ marginHorizontal: 28, marginTop: 40 }}>
            <TouchableWithoutFeedback
              onPress={() => this.handleType("prestador")}
              style={active === "prestador" ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  { marginRight: 20 },
                  active === "prestador" ? styles.active : null
                ]}
              >
                {active === "prestador" ? (
                  <Block center middle style={styles.check}>
                    {checkIcon}
                  </Block>
                ) : null}
                <Block center middle style={styles.icon}>
                  {adminIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11 }}>
                  Prestador
                </Text>
                <Text paragraph center color="black3">
                  Deixe que outros te encontrem
                </Text>
              </Block>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.handleType("operator")}
              style={active === "operator" ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  active === "operator" ? styles.active : null
                ]}
              >
                {active === "operator" ? (
                  <Block center middle style={styles.check}>
                    {checkIcon}
                  </Block>
                ) : null}
                <Block center middle style={styles.icon}>
                  {operatorIcon}
                </Block>
                <Text h4 style={{ marginBottom: 11 }}>
                  Cliente
                </Text>
                <Text paragraph center color="black3">
                  Nós vamos te dar aquele Help
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
          <Block center style={{ marginTop: 25 }}>
            <Input full label="Primeiro Nome" style={{ marginBottom: 25 }} />
            <Input full label="Segundo Nome" style={{ marginBottom: 25 }} />
            <Input
              full
              email
              label="Endereço de Email"
              style={{ marginBottom: 25 }}
            />
            <Input
              full
              number
              label="Numero de Telefone"
              style={{ marginBottom: 25 }}
            />
            <Input full password label="Senha" style={{ marginBottom: 25 }} />

            <Button
              full
              style={{ marginBottom: 12 }}
              onPress={() => navigation.navigate("Overview")}
            >
              <Text button>Criar Conta</Text>
            </Button>
            <Text paragraph color="gray">
              Já possui Conta?{" "}
              <Text
                height={18}
                color="blue"
                onPress={() => navigation.navigate("Login")}
              >
                Entrar
              </Text>
            </Text>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1
  },
  icon: {
    flex: 6,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightblue
  },
  check: {
    position: "absolute",
    right: -9,
    top: -9
  }
});
