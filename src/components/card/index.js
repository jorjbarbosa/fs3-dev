import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Block from "../block";
import Text from "../text";
// import Icon from "./icon";
import * as theme from "../theme";

export default class Card extends Component {
  static defaultProps = {
    shadow: true,
    border: true,
    title: null
  };

  renderHeader = () => {
    const { title } = this.props;
    if (!title) return null;

    return (
      <Block row space="between" style={styles.header}>
        <Text caption>{title}</Text>
        <TouchableOpacity>{/* <Icon options /> */}</TouchableOpacity>
      </Block>
    );
  };

  render() {
    const { shadow, border, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      shadow && styles.shadow,
      border && styles.border,
      style
    ];

    return (
      <Block style={cardStyles} {...props}>
        {this.renderHeader()}
        {children}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.white,
    marginTop: 5
  },
  header: {
    paddingBottom: 24
  },
  border: {
    borderColor: theme.colors.card,
    borderWidth: 0.2
  },
  shadow: {
    shadowColor: theme.colors.green,
    shadowOpacity: 2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2
  }
});
