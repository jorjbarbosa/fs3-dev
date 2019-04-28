/**
 * @format
 */

import { AppRegistry } from "react-native";
import AppMain from "./src/navigation/AppNavigator";
import { name as appName } from "./app.json";
AppRegistry.registerComponent(appName, () => AppMain);
