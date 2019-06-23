import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Text from "../text";
import * as theme from "../theme";
const { width } = Dimensions.get("window");
import SegmentedControlTab from 'react-native-segmented-control-tab'
export default class ControlTab extends Component {
    render() {
        const {
            label,
            full,
            style,
            selected,
            onTabPress,
            values,
            selectedIndex,
            multiples,
            selectedIndices,
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

                <SegmentedControlTab
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    multiple={multiples}
                    values={values}
                    selectedIndex={selectedIndex}
                    selectedIndices={selectedIndices}
                    onTabPress={onTabPress}
                    style={style}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        height: 50,
        width: 200,
        backgroundColor: '#F2F2F2',
        marginBottom: 25
    },
    tabStyle: {
        backgroundColor: '#F2F2F2',
        borderWidth: 0,
        borderColor: 'transparent'
    },
    tabTextStyle: { color: '#444444', fontWeight: 'bold' },
    activeTabStyle: {
        backgroundColor: theme.colors.purple,
        marginTop: 2
    },
    activeTabTextStyle: { color: theme.colors.gray2 },
    input: {
        backgroundColor: theme.colors.input,
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        borderRadius: 5,
        fontSize: theme.sizes.font,
        color: theme.colors.black2,
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
