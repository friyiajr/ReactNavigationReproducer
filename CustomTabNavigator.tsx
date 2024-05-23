import * as React from "react";
import {
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  CommonActions,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";

import { DeviceType, getDeviceTypeAsync, deviceType } from "expo-device";

const { height } = Dimensions.get("screen");

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

const Layout = ({ state, contentStyle, descriptors }) => {
  return (
    <View style={[{ flex: 1 }]}>
      {state.routes.map((route, i) => {
        return (
          <View
            key={route.key}
            style={[
              StyleSheet.absoluteFill,
              { display: i === state.index ? "flex" : "none" },
            ]}
          >
            {descriptors[route.key].render()}
          </View>
        );
      })}
    </View>
  );
};

const LeftTabs = ({ color, tabBarStyle, state, navigation, descriptors }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          paddingHorizontal: 30,
          zIndex: 9999,
          elevation: 99999,
        },
        tabBarStyle,
      ]}
    >
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          onPress={() => {
            const isFocused = state.index === index;
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
              data: {
                isAlreadyFocused: isFocused,
              },
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key,
              });
            }
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{descriptors[route.key].options.title ?? route.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const Dropdown = ({ color, tabBarStyle, state, navigation, descriptors }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          zIndex: 9999,
          elevation: 99999,
          minHeight: 100,
          position: "absolute",
          alignSelf: "center",
          top: 200,
          paddingHorizontal: 30,
        },
        tabBarStyle,
      ]}
    >
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          onPress={() => {
            console.log("DAN: HELLO");
            const isFocused = state.index === index;
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
              data: {
                isAlreadyFocused: isFocused,
              },
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key,
              });
            }
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        >
          <Text>{descriptors[route.key].options.title ?? route.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const BottomTabs = ({ color, tabBarStyle, state, navigation, descriptors }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          paddingHorizontal: 30,
          zIndex: 9999,
          elevation: 99999,
          height: 100,
          flexDirection: "row",
        },
        tabBarStyle,
      ]}
    >
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          onPress={() => {
            const isFocused = state.index === index;
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
              data: {
                isAlreadyFocused: isFocused,
              },
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key,
              });
            }
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{descriptors[route.key].options.title ?? route.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
  color,
  isSubnavigation,
}: Props) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View
        style={{
          flex: 1,
          flexDirection:
            deviceType === DeviceType.TABLET ? "row" : "column-reverse",
        }}
      >
        {deviceType === DeviceType.TABLET ? (
          <LeftTabs
            color={color}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
            tabBarStyle={tabBarStyle}
          />
        ) : null}

        {deviceType !== DeviceType.TABLET && !isSubnavigation ? (
          <BottomTabs
            color={color}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
            tabBarStyle={tabBarStyle}
          />
        ) : null}

        <Layout
          state={state}
          contentStyle={contentStyle}
          descriptors={descriptors}
        />

        {deviceType !== DeviceType.TABLET && isSubnavigation ? (
          <Dropdown
            color={color}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
            tabBarStyle={tabBarStyle}
          />
        ) : null}
      </View>
    </NavigationContent>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
