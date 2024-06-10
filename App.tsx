import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import * as ScreenOrientation from "expo-screen-orientation";
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import { config } from "@gluestack-ui/config";
import { Button, Platform, View, useColorScheme } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AllProducts,
  Collections,
  CustomerDetails,
  More,
  ProductsSubscreen1,
} from "./Screens";
import { TabStateProvider } from "./TabDataProvider";
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();
const InnerStack = createNativeStackNavigator();

const CustomersIndexList = () => {
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

const MoreStack = () => {
  const { goBack } = useNavigation();
  return (
    <InnerStack.Navigator
      screenOptions={{
        headerRight: () => (
          <Button onPress={() => goBack()} title="X" color="black" />
        ),
      }}
    >
      <InnerStack.Screen name="More" component={More} />
      <InnerStack.Screen name="Collections" component={Collections} />
    </InnerStack.Navigator>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Customers"
          component={CustomerDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreStack"
          component={MoreStack}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            cardOverlayEnabled: false,
            cardStyle: {
              marginHorizontal: 50,
              marginTop: 80,
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return <Main />;
}

export default App;
