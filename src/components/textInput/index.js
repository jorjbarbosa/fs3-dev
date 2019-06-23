import React, { Component } from "react";
import { StyleSheet, View, Dimensions, TextInput } from "react-native";
import Text from "../text";
import * as theme from "../theme";
const { width } = Dimensions.get("window");

export default class TInput extends Component {
    render() {
        const {
            label,
            full,
            style,
            textinput,
            keyboardType,
            options,
            reference,
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
                <TextInput
                    style={inputStyles}
                    type={textinput}
                    options={options}
                    autoCapitalize="none"
                    keyboardType={keyboardType}
                    ref={reference}
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
        height: 120,
        paddingVertical: 5,
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
