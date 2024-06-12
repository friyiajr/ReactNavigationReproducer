import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform, View, Text, Pressable } from "react-native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Collections, CustomerDetails, More } from "./Screens";

const Stack = createNativeStackNavigator();
const InnerStack = createNativeStackNavigator();

const image = require("./arrow3.png");

const MoreStack = () => {
  const { goBack } = useNavigation();
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <InnerStack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "black",
          },
          headerBlurEffect: "systemThickMaterial",
          headerTintColor: "white",
          headerBackVisible: true,
          headerBackImageSource: image,

          // headerLeft: (props) => {
          //   return (
          //     <Pressable
          //       style={{ backgroundColor: "purple" }}
          //       onPress={() => {
          //         goBack();
          //       }}
          //     >
          //       <Text style={{ color: "white" }}>BACK BUTTON</Text>
          //     </Pressable>
          //   );
          // },
          headerTitle: (props) => {
            return (
              <View
                style={{
                  backgroundColor: "red",
                }}
              >
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View style={{ backgroundColor: "purple" }}>
                    <Text style={{ color: "white" }}>CUSTOM BUTTON 1</Text>
                  </View>
                  <View style={{ backgroundColor: "teal" }}>
                    <Text style={{ color: "white" }}>CUSTOM BUTTON 2</Text>
                  </View>
                </View>
              </View>
            );
          },
          headerRight: (props) => {
            return (
              <View
                style={{
                  backgroundColor: "red",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View style={{ backgroundColor: "purple" }}>
                  <Text style={{ color: "white" }}>PIN</Text>
                </View>
                <Pressable style={{ backgroundColor: "teal" }} onPress={goBack}>
                  <Text style={{ color: "white" }}>EXIT</Text>
                </Pressable>
              </View>
            );
          },
        }}
      >
        <InnerStack.Screen name="More" component={More} />
        <InnerStack.Screen name="Collections" component={Collections} />
      </InnerStack.Navigator>
    </View>
  );
};

const options: NativeStackNavigationOptions = {
  presentation: Platform.OS === "ios" ? "modal" : "transparentModal",

  headerShown: false,
  contentStyle: {
    backfaceVisibility: "hidden",
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: Platform.OS === "android" ? "15%" : undefined,
    paddingTop: Platform.OS === "android" ? 50 : undefined,
  },
  animationTypeForReplace: "push",
  animation: Platform.OS === "android" ? "fade" : "fade_from_bottom",
};

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customers"
        component={CustomerDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MoreStack" component={MoreStack} options={options} />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
