import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Text from "../text";
import * as theme from "../theme";
import { TextInputMask } from 'react-native-masked-text';
const { width } = Dimensions.get("window");

export default class InputMask extends Component {
  render() {
    const {
      label,
      full,
      style,
      mask,
      keyboardType,
      options,
      ...props
    } = this.props;
    const inputStyles = [styles.input, full && styles.full, style];
    return (
      <View>
        <View style={styles.labelContainer}>
          <Text caption medium style={styles.label}>
            {label}
          </Text>
        </View>
        <TextInputMask
          style={inputStyles}
          type={mask}
          options={options}
          autoCapitalize="none"
          keyboardType={keyboardType}
          {...props}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.input,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    borderRadius: 5,
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    height: 45,
    paddingVertical: 11,
    paddingHorizontal: 16
  },
  label: {
    textTransform: "uppercase"
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  full: {
    width: width - 50
  }
});