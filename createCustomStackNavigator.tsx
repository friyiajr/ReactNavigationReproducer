import {
  createNavigatorFactory,
  EventArg,
  ParamListBase,
  StackActionHelpers,
  StackActions,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";
import * as React from "react";

import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { NativeStackView } from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { View, StyleSheet } from "react-native";
import { useSkrimId } from "./SkrimContextProvider";

function NativeStackNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  isModal,
  ...rest
}: NativeStackNavigatorProps) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      StackRouterOptions,
      StackActionHelpers<ParamListBase>,
      NativeStackNavigationOptions,
      NativeStackNavigationEventMap
    >(StackRouter, {
      id,
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
    });

  React.useEffect(
    () =>
      // @ts-expect-error: there may not be a tab navigator in parent
      navigation?.addListener?.("tabPress", (e: any) => {
        const isFocused = navigation.isFocused();

        // Run the operation in the next frame so we're sure all listeners have been run
        // This is necessary to know if preventDefault() has been called
        requestAnimationFrame(() => {
          if (
            state.index > 0 &&
            isFocused &&
            !(e as EventArg<"tabPress", true>).defaultPrevented
          ) {
            // When user taps on already focused tab and we're inside the tab,
            // reset the stack to replicate native behaviour
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: state.key,
            });
          }
        });
      }),
    [navigation, state.index, state.key]
  );

  return (
    <>
      <NavigationContent>
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "black",
              opacity: 0.5,
              elevation: 1,
            }}
          />

          <NativeStackView
            {...rest}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
          />
        </View>
      </NavigationContent>
    </>
  );
}

export default createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  typeof NativeStackNavigator
>(NativeStackNavigator);
