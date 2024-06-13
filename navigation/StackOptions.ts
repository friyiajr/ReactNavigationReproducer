import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

export const mobileDeviceModalStack: NativeStackNavigationOptions = {
  presentation: "modal",
  headerShown: false,
  contentStyle: {
    flex: 1,
  },
  animationTypeForReplace: "push",
  animation: "fade_from_bottom",
};

export const tabletDeviceModalStack: NativeStackNavigationOptions =  {
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
  animation: Platform.OS === 'ios' ? "fade_from_bottom" : 'fade',
}

