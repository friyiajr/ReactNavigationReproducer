import { useNavigation } from "@react-navigation/native";
import { Button, View, ViewStyle, Image } from "react-native";

export const chevron = require("./assets/chevron.png");
export const exit = require("./assets/x.png");

const defaultStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
};

export const Home = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={[defaultStyle, { backgroundColor: "lightgreen", gap: 20 }]}>
      <Button
        onPress={() => {
          console.log("OK");
          navigate("CardModalStack");
        }}
        title="Windowed Modals"
      />
      <Button
        onPress={() => {
          console.log("OK");
          navigate("FullScreenModalStack");
        }}
        title="Full Screen Modals"
      />
      <Button
        onPress={() => {
          console.log("OK");
          navigate("ScreenStack");
        }}
        title="Vanilla Navigation"
      />
    </View>
  );
};