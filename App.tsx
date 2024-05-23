import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

// import * as ScreenOrientation from "expo-screen-orientation";
// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import { config } from "@gluestack-ui/config";
import { useColorScheme } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import createCustomTabNavigator from "./CustomTabNavigator";
import {
  AllProducts,
  Collections,
  CustomerDetails,
  More,
  ProductsSubscreen1,
} from "./Screens";
import { TabStateProvider } from "./TabDataProvider";

const Tab = createCustomTabNavigator();
const Stack = createNativeStackNavigator();

const AllProductsNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main Products" component={AllProducts} />
      <Stack.Screen
        name="Products Subnavigation"
        component={ProductsSubscreen1}
      />
    </Stack.Navigator>
  );
};

const OrderDetailsNav = () => {
  return (
    <Tab.Navigator color="blue" isSubnavigation>
      <Tab.Screen name="All Products" component={AllProductsNav} />
      <Tab.Screen name="Collections" component={Collections} />
    </Tab.Navigator>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator color="red">
        <Tab.Screen name="Orders" component={OrderDetailsNav} />
        <Tab.Screen name="Customers" component={CustomerDetails} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function App() {
  const colorMode = useColorScheme() as COLORMODES;
  return (
    <TabStateProvider>
      <Main />
    </TabStateProvider>
  );
}

export default App;
