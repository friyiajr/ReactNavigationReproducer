import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

export const mobileWindowedModalStackOptions: NativeStackNavigationOptions = {
  presentation: "modal",
  headerShown: false,
  contentStyle: {
    flex: 1,
  },
  animationTypeForReplace: "push",
  animation: "fade_from_bottom",
};

export const tabletWindowedModalStackOptions: NativeStackNavigationOptions =  {
  presentation: Platform.OS === "ios" ? "modal" : "transparentModal",
  headerShown: false,
  contentStyle: {
    backfaceVisibility: "hidden",
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: Platform.OS === "android" ? "15%" : undefined,
    paddingTop: Platform.OS === "android" ? 50 : undefined,
  },
  animationTypeForReplace: "push",
  animation: Platform.OS === 'ios' ? "fade_from_bottom" : 'fade', 
  
}

export const mobileFullscreenModalStackOptions: NativeStackNavigationOptions = {
  presentation: "fullScreenModal",
  headerShown: false,
  contentStyle: {
    flex: 1,
  },
  animationTypeForReplace: "push",
  animation: "fade_from_bottom",
  gestureEnabled: false,
};

export const tabletFullscreenModalStackOptions: NativeStackNavigationOptions =  {
  presentation: Platform.OS === "ios" ? "fullScreenModal" : "transparentModal",
  headerShown: false,
  animationTypeForReplace: "push",
  animation: Platform.OS === 'ios' ? undefined : "fade_from_bottom",
}

