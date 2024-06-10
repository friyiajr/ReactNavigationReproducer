import { NavigationContainer, useNavigation } from "@react-navigation/native";

import * as React from "react";

import { Platform } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Collections, CustomerDetails, More } from "./Screens";

const Stack = createNativeStackNavigator();
const InnerStack = createNativeStackNavigator();

const MoreStack = () => {
  return (
    <InnerStack.Navigator screenOptions={{}}>
      <InnerStack.Screen name="More" component={More} />
      <InnerStack.Screen name="Collections" component={Collections} />
    </InnerStack.Navigator>
  );
};

const universalOptions = {
  presentation: Platform.OS === "ios" ? "modal" : "transparentModal",
  headerShown: false,
};

const androidOptions = {
  ...universalOptions,
  contentStyle: {
    backfaceVisibility: "hidden",
    marginHorizontal: 50,
    marginTop: 50,
    overflow: "hidden",
  },
  animationTypeForReplace: "push",
  animation: "fade_from_bottom",
};

const stackOptions =
  Platform.OS === "android" ? androidOptions : universalOptions;

function App() {
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
          options={stackOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
