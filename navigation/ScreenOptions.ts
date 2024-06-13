import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const modalStackDefaultOptions: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "black",
  },
  headerBlurEffect: "systemThickMaterial",
  headerTintColor: "white",
  headerBackVisible: true,
  headerBackTitleVisible: false
}