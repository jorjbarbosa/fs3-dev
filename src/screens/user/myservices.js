import React, { Component } from 'react'
import { View, FlatList, Dimensions, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { Button, Block, Text, InputMask, Card, MaskText } from "../.././components";
import { sizes, colors } from "../../components/theme";
import Icon from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get('window');

import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';


db = firebase.firestore();
export default class MyServices extends Component {
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
  componentWillUpdate(){
    this.loadData();
  }
  loadData() {
    const services = [];
    const userRef = this.refUsuario.doc(firebase.auth().currentUser.uid);
    this.refServicos.where('proprietario', '==', userRef).get().then(snapshot => {
      snapshot.forEach(doc => {
        var obj = {};
        const { titulo, descricao, localizacao, area, preco, pagamento, nota } = doc.data();
        obj.titulo = titulo;
        obj.descricao = descricao;
        obj.localizacao = localizacao;
        obj.preco = preco;
        obj.pagamento = pagamento;
        obj.nota = nota;
        obj.key = doc.id;
        area.get().then(dc => {
          const { nome } = dc.data();
          obj.area = nome;
        });
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
  deleteService(key) {
    Alert.alert(
      "AVISO",
      "Tem certeza que deseja excluir?",
      [
        {
          text: 'Cancelar',
          onPress: () => console.log("cancelar")
        },
        {
          text: 'Confirmar',
          onPress: () => this.delete(key)
        }
      ]
    );
  }
  delete(key) {
    db.collection('servicos').doc(key).delete().then(function () {
      Alert.alert(
        "Tudo certo...",
        'seu serviço foi deletado',
        [{
          text: 'OK'
        }]
      );
    }).catch(function (err) {
      Alert.alert(errorMessage(err));
    });
  }
  renderCard = (item) => {
    const { navigation } = this.props;
    return (
      <Card style={styles.card} >
        <Block row space="between">
          <Image
            source={require('../../assets/images/icons/distance.png')}
          />
          <Block style={styles.cargo} middle >
            <Text h5 weight="bold">{item.titulo}</Text>
          </Block>
          <MaskText h5 style={styles.cargo} mask="money" value={item.preco} />
        </Block>
        <Block row style={styles.stat}>
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
        <Block row style={styles.stat}>
          <Block style={styles.stat2}>
            <Text paragraphGray onPress={() => { console.log(item) }} color="yellow"
              onPress={() => navigation.navigate("EditMyServices", { service: item })}>
              Editar
            </Text>
          </Block>
          <Block style={styles.stat2}>
            <Text paragraphGray onPress={() => { this.deleteService(item.key) }} color="red">
              Excluir
            </Text>
          </Block>
        </Block>
      </Card >

    );
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
          <Text style={styles.item}>Carregando</Text>
        </View>
      );
    }
    return (
      <View>
        <View>
          <Text h3 weight="bold" style={styles.header}>Meus Serviços</Text>
        </View>
        <FlatList showsVerticalScrollIndicator={false}
          data={this.state.servicos}
          style={styles.explore}
          renderItem={({ item }) =>
            this.renderCard(item)
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
  header: {
    paddingHorizontal: sizes.base * 2,
    marginTop: sizes.base * 1.5,
    paddingBottom: sizes.base * 2,

  },
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
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
  }
})