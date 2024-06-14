import { useNavigation } from "@react-navigation/native";
import { Button, View, ViewStyle, Image, Text, Platform } from "react-native";

export const chevron = require("./img/chevron.png");
export const exit = require("./img/x.png");

const defaultStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
};

interface Props {
  thisIndex?: number;
  blockBackCallback?: () => void;
}

export const Home = ({ thisIndex, blockBackCallback }: Props) => {
  const { navigate, push } = useNavigation<any>();
  return (
    <View
      style={[
        defaultStyle,
        {
          backgroundColor: Platform.OS === "android" ? "lightgreen" : "white",
          gap: 20,
        },
      ]}
    >
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
        INFINITE SCREEN DEMO
      </Text>
      <Button
        onPress={() => {
          push("CardModalStack", {
            previous: thisIndex ?? 0,
            type: "CardModalStack",
          });
        }}
        title="Windowed Modals"
      />
      <Button
        onPress={() => {
          push("FullScreenModalStack", {
            previous: thisIndex ?? 0,
            type: "FullScreenModalStack",
          });
        }}
        title="Full Screen Modals"
      />
      <Button
        onPress={() => {
          push("InfiniteScreen", {
            previous: thisIndex ?? 0,
            type: "InfiniteScreen",
          });
        }}
        title="Push Navigation"
      />
      {blockBackCallback ? (
        <Button
          onPress={() => {
            blockBackCallback();
          }}
          title="Block Back"
        />
      ) : null}
    </View>
  );
};
