import React, { Component } from 'react'
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/EvilIcons";
import { Input, Block, Text } from '../../../components';
import { sizes, colors } from "../../../components/theme";
const { width, height } = Dimensions.get('window');

class Search extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null,
  }

  handleSearchFocus(status) {
    Animated.timing(
      this.state.searchFocus,
      {
        toValue: status ? 0.8 : 0.6, // status === true, increase flex size
        duration: 150, // ms
      }
    ).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;
    return (
      <Block animated middle flex={0.8} style={styles.search}>
        <Input
          placeholder="Pesquisar"
          placeholderTextColor={colors.caption}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon
              name={isEditing ? "close" : "search"}
              size={sizes.base}
              color={colors.balck2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    )
  }





  render() {
    return (
      <Block>
        <Block row center space="between" style={styles.header}>
          <Text h3 weight="bold" >Explore</Text>
          {this.renderSearch()}
        </Block>


      </Block>
    )
  }
}
export default Search;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: sizes.base * 2,
    marginTop: sizes.base * 3,
  },
  search: {
    height: sizes.base * 2,
    width: width - sizes.base * 2,
    marginBottom: sizes.base
  },
  searchInput: {
    fontSize: sizes.caption,
    height: sizes.base * 2.5,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: sizes.base / 1.5,
    paddingRight: sizes.base * 2,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent'
  },
  searchIcon: {
    position: 'absolute',
    right: sizes.base / 1.333,
    top: sizes.base + 22,
  },
  explore: {
    marginHorizontal: sizes.padding * 1.25,
    marginTop: 20
  }


})
