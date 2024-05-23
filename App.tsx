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
import {
  AllProducts,
  Collections,
  CustomerDetails,
  More,
  OrderDetails,
} from "./Screens";

const Tab = createCustomTabNavigator();
const Tab2 = createCustomTabNavigator();

const OrderDetailsNav = () => {
  return (
    <Tab.Navigator color="blue">
      <Tab.Screen name="All Products" component={AllProducts} />
      <Tab.Screen name="Collections" component={Collections} />
    </Tab.Navigator>
  );
};

function App() {
  const colorMode = useColorScheme() as COLORMODES;
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <NavigationContainer>
        <Tab.Navigator color="red">
          <Tab.Screen name="Order Details" component={OrderDetailsNav} />
          <Tab.Screen name="Customer Details" component={CustomerDetails} />
          <Tab.Screen name="More" component={More} />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
