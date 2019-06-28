import React, { Component } from "react";
import Search from "./search";
import Icon from "react-native-vector-icons/Entypo";
import { View, StatusBar, Dimensions, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { Input, Block, Text, Card, MaskText } from '../../components';
import { sizes, colors } from "../../components/theme";
const { width, height } = Dimensions.get('window');
import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
export default class Explore extends Component {

  constructor() {
    super();
    this.refUsuario = firebase.firestore().collection('usuario');
    this.refServicos = firebase.firestore().collection('servicos');
    this.state = {
      servicos: '',
      nome: '',
      load: true,
      refreshing: false
    }
  }
  componentWillMount() {
    this.loadData();
  }
  loadData() {
    const services = [];
    const userRef = this.refUsuario.doc(firebase.auth().currentUser.uid);
    this.refServicos.get().then(snapshot => {
      snapshot.forEach(doc => {
        var obj = {};
        const { titulo, descricao, localizacao, area, preco, pagamento, nota, proprietario } = doc.data();
        obj.titulo = titulo;
        obj.descricao = descricao;
        obj.localizacao = localizacao;
        obj.preco = preco;
        obj.pagamento = pagamento;
        obj.nota = nota;
        obj.key = doc.id;
        obj.area = area;
       
        proprietario.get().then(dc => {
          const { nome } = dc.data();
          obj.proprietario = nome;

        });
        obj.proprietarioRef = proprietario;
        console.log(proprietario);
        console.log(obj.proprietario);
        services.push(obj);
      });
      this.setState({
        servicos: services,
        load: false,
        refreshing: false
      });
    }).catch(err => {
      this.setState({
        load: false,
        refreshing: false
      });
      Alert.alert(
        "Ops...",
        "Ocorreu um erro",
        [{
          text: 'Tentar novamente',
          onPress: () => this.loadData()
        }]
      );
      console.log('Error getting documents', err);
    });
  }
  renderExplore(item) {
    const { navigation } = this.props;
    return (

      <Card style={styles.card}  >
        <Block row space="between" >
          <Image
            source={require('../../assets/images/icons/distance.png')}
          />
          <Block style={styles.cargo} middle >
            <Text h5 weight="bold" onPress={() => navigation.navigate("Details", { service: item })}>{item.titulo}</Text>
          </Block>
          <MaskText h5 style={styles.cargo} mask="money" value={item.preco} />
        </Block>
        <Block row style={styles.stat}>
          <Block>
            <Text caption>Nome</Text>
            <Text paragraph>{item.proprietario}</Text>
          </Block>
          <Block style={styles.stat2}>
            <Text caption >Pagamento</Text>
            <Text paragraphGray >
              {item.pagamento.cartao ? <Icon name="credit-card" color="teal" size={15} /> : null}
              {item.pagamento.dinheiro ? <Icon name="credit" color="teal" size={15} /> : null}
            </Text>
          </Block>
          <Block >
            <Text paragraphGray >
              {item.nota}
              <Icon name="star" color="purple" size={15} />
            </Text>
          </Block>

        </Block>
      </Card>



    )
  }
  reloadList = () => {
    this.setState({
      refreshing: true,
      load: true
    }, () => {
      this.loadData();
    });
  }

  render() {
    if (this.state.load || this.state.refreshing) {
      return (
        <View>
          <Text style={styles.item}></Text>
        </View>
      );
    }
    return (

      <View>
        <View>
          <StatusBar backgroundColor="#772ea2" barStyle="light-content" />
        </View>
        <Search />
        <FlatList showsVerticalScrollIndicator={false} style={styles.explore}
          data={this.state.servicos}
          style={styles.explore}
          renderItem={({ item }) =>
            this.renderExplore(item)
          }
          keyExtractor={item => item.key}
          refreshing={this.state.refreshing}
          onRefresh={this.reloadList}
        />

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