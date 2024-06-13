import { useNavigation } from "@react-navigation/native";
import { Button, View, ViewStyle, Image, Text } from "react-native";

export const chevron = require("./img/chevron.png");
export const exit = require("./img/x.png");

const defaultStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
};

export const Home = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={[defaultStyle, { backgroundColor: "lightgreen", gap: 20 }]}>
      <Text style={{ fontWeight: "bold", fontSize: 40 }}>DEBUG MODE</Text>
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
          navigate("InfiniteScreen2");
        }}
        title="Vanilla Navigation"
      />
    </View>
  );
};
