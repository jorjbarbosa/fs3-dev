import React, { Component } from "react";
import Search from "./search";
import Icon from "react-native-vector-icons/Entypo";
import { View, StatusBar, Dimensions, ScrollView, StyleSheet, Image } from "react-native";
import { Input, Block, Text, Card } from '../../components';
import { sizes, colors } from "../../components/theme";
const { width, height } = Dimensions.get('window');

export default class Explore extends Component {

  //Pode usar essa funcao para renderizar os dados!
  //para apresentação estou ocupando o espaço do scroll View
  renderExplore() {
    const { navigation } = this.props;
    return (

      <Card style={styles.card}  >
        <Block row space="between" >
          <Image
            source={require('../../assets/images/icons/distance.png')}
          />
          <Block style={styles.cargo} middle >
            <Text h5 weight="bold" onPress={() => navigation.navigate("Details")}>Jardineiro</Text>
          </Block>
          <Text h5 style={styles.cargo} > $30</Text>
        </Block>
        <Block row style={styles.stat}>
          <Block>
            <Text caption>Nome</Text>
            <Text paragraph>Jose</Text>
          </Block>
          <Block style={styles.stat2}>
            <Text caption >Pagamento</Text>
            <Text paragraphGray >
              <Icon name="credit-card" color="teal" size={15} />
              <Icon name="credit" color="teal" size={15} />
            </Text>
          </Block>
          <Block >
            <Text paragraphGray >
              <Icon name="star" color="purple" size={15} />
              <Icon name="star-outlined" color="purple" size={17} />
              <Icon name="star-outlined" color="purple" size={19} />
            </Text>
          </Block>

        </Block>
      </Card>



    )
  }


  render() {

    return (

      <View>
        <View>
          <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
        </View>
        <Search />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 3
  },
  cargo: {
    padding: 5,
    marginTop: 8,
    marginLeft: 5
  },
  stat: {
    marginLeft: 10
  },
  stat2: {
    marginRight: 0
  },
  explore: {
    marginHorizontal: sizes.padding * 0.5,
    marginTop: 80
  }


})