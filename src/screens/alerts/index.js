import React, { Component } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { View, StatusBar, Dimensions, ScrollView, StyleSheet, Image } from "react-native";
import { Input, Block, Text, CardN } from '../../components';
import { sizes, colors } from "../../components/theme";



export default class Notification extends Component {
  renderNotification() {
    return (
      <Block>
        <Block>
          <Text h3 weight="bold" row style={styles.header}>Notificação</Text>
        </Block>
        <CardN style={styles.card} >
          <Block row space="between">
            <Image
              source={require('../../assets/images/icons/distance.png')}
            />

            <Block style={styles.cargo} row>
              <Text caption weight="bold">notificação de Jardineiro  </Text>
              <Text caption> ...</Text>
            </Block>
          </Block>

        </CardN>
      </Block>

    )
  }

  render() {
    return (
      <View>
        <View>
          <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderNotification()}
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: sizes.base * 2,
    marginTop: sizes.base * 2
  },
  card: {
    borderRadius: 3
  },
  cargo: {
    padding: 5,
    marginTop: 8,

  },
});
