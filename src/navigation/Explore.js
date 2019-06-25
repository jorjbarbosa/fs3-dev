import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Explore from "../screens/explore/index";
import Details from "../screens/explore/details";

const Exp = createStackNavigator(
    {
        Explore,
        Details

    },
    {
        defaultNavigationOptions: {
            header: null
        }
    }
);

Exp.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    } else
        tabBarVisible = true;

    return {
        tabBarVisible,
    };
}

export default Exp;
