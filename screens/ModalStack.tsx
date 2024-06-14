import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, Pressable } from "react-native";

import { modalStackDefaultOptions } from "../navigation/ScreenOptions";

import { chevron, exit } from "../MockScreens";
import { InfiniteScreen } from "./InfiniteScreen";

const InnerStack = createNativeStackNavigator();

export const CardModalStack = () => {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <InnerStack.Navigator screenOptions={modalStackDefaultOptions}>
        <InnerStack.Screen name="InfiniteScreen" component={InfiniteScreen} />
      </InnerStack.Navigator>
    </View>
  );
};

export const FullscreenModalStack = () => {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <InnerStack.Navigator screenOptions={modalStackDefaultOptions}>
        <InnerStack.Screen name="InfiniteScreen" component={InfiniteScreen} />
      </InnerStack.Navigator>
    </View>
  );
};

export const ScreenStack = () => {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <InnerStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerBackTitleVisible: false,
        }}
      >
        <InnerStack.Screen name="InfiniteScreen" component={InfiniteScreen} />
      </InnerStack.Navigator>
    </View>
  );
};
