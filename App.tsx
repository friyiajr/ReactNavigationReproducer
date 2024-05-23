import { GluestackUIProvider, useColorMode } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { config } from "@gluestack-ui/config";
import { HomeScreen } from "./HomeScreen";
import { TodoScreen } from "./TodoScreen";
import { useColorScheme } from "react-native";
import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";

import createCustomTabNavigator from "./CustomTabNavigator";

const Tab = createCustomTabNavigator();

function App() {
  const colorMode = useColorScheme() as COLORMODES;
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Todo" component={TodoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
