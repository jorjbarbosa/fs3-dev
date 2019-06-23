import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Button, Block, Input, InputMask, ControlTab } from "../.././components";

import { errorMessage } from '../../config/Erros';
import firebase from 'react-native-firebase';

db = firebase.firestore();
export default class MyServices extends Component {
  constructor() {
    super();
    this.refServicos = firebase.firestore().collection('servicos');
    this.refUsuario = firebase.firestore().collection('usuario');
    this.state = {
      servicos: '',
      nome: '',
      load: true
    }
  }
  componentWillMount() {
    const services = [];
    const userRef = this.refUsuario.doc(firebase.auth().currentUser.uid);
    console.log(userRef);
    this.refServicos.where('proprietario', '==',userRef).get().then(snapshot => {
      snapshot.forEach(doc => {
        const { descricao, cidade, areaAtuacao, preco } = doc.data();
        areaAtuacao.get().then(doc => {
          const { nome } = doc.data();
          services.push({
            key: doc.id,
            descricao,
            cidade,
            areaAtuacao: nome,
            preco
          });
        });

      });
      this.setState({
        servicos: services,
        load: false
      });
      console.log(this.state.servicos);
    }).catch(err => {
      console.log('Error getting documents', err);
    });
  }
  render() {
    if (this.state.load) {
      return (
        <View>
          <Text style={styles.item}>Carregando</Text>
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.item}>Meus serviços</Text>
          </View>

          <FlatList
            data={this.state.servicos}
            renderItem={({ item }) =>
            <Block>
              <View>
                <Text style={styles.item}>Nome {item.descricao}</Text>
              </View>
              <View>
                <Text style={styles.item}>Cidade {item.cidade}</Text>
              </View>
              <View>
                <Text style={styles.item}>{item.areaAtuacao}</Text>
              </View>
              <View>
                <Text style={styles.item}>Preco {item.preco}</Text>
              </View>
              <View>
                <Text style={styles.item}>Nota {item.preco}</Text>
              </View>
              <View>
                <Text style={styles.item}>Editar</Text>
              </View>
              <View>
                <Text style={styles.item}>Excluir</Text>
              </View>
              </Block>
            }
            keyExtractor={item => item.key}
          />

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})