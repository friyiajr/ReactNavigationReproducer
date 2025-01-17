import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import {
  mobileWindowedModalStackOptions,
  mobileFullscreenModalStackOptions,
  tabletWindowedModalStackOptions,
  tabletFullscreenModalStackOptions,
} from "./navigation/StackOptions";

import * as Device from "expo-device";
import {
  CardModalStack,
  FullscreenModalStack,
  ScreenStack,
} from "./screens/ModalStack";
import { Home } from "./MockScreens";
import { InfiniteScreen } from "./screens/InfiniteScreen";

const Stack = createNativeStackNavigator();

const Main = () => {
  // TODO: I don't have isTablet in this code base so this is my replacement
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    Device.getDeviceTypeAsync().then((device) => {
      setIsTablet(device === Device.DeviceType.TABLET);
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardModalStack"
        component={CardModalStack}
        options={
          isTablet
            ? tabletWindowedModalStackOptions
            : mobileWindowedModalStackOptions
        }
      />
      <Stack.Screen
        name="FullScreenModalStack"
        component={FullscreenModalStack}
        options={
          isTablet
            ? tabletFullscreenModalStackOptions
            : mobileFullscreenModalStackOptions
        }
      />
      <Stack.Screen
        name="InfiniteScreen"
        component={InfiniteScreen}
        options={{
          headerStyle: { backgroundColor: "grey" },
          headerTintColor: "white",
        }}
      />
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
