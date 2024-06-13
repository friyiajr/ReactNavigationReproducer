import {
  UNSTABLE_usePreventRemove,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Alert, Button, Pressable, Text, View } from "react-native";
import { chevron, exit } from "../MockScreens";

let i = 1;

const getRandomRGBA = () => {
  return `rgba(${Math.floor(Math.random() * 255) + 1}, ${
    Math.floor(Math.random() * 255) + 1
  } ,${Math.floor(Math.random() * 255) + 1} ,0.5)`;
};

export const InfiniteScreen = ({ route }) => {
  const previous = route?.params?.previous ?? 0;
  const thisIndex: number = previous + 1;

  const {
    navigate,
    setOptions,
    push,
    addListener,
    dispatch,
    canGoBack,
    goBack,
  } = useNavigation<any>();
  const leftColor = useRef(getRandomRGBA());
  const rightColor = useRef(getRandomRGBA());
  const [preventCanGoBack, setPreventCanGoBack] = useState(false);

  const title = useRef(`S-${thisIndex}`);

  const showHeaderTitle = useRef(thisIndex % 2 === 0);

  const backImage = useRef(thisIndex % 2 === 0 ? exit : chevron);

  // We need to be on React navigation 7.X for this to be fully stable
  UNSTABLE_usePreventRemove(preventCanGoBack, ({ data }) => {
    // Prompt the user before leaving the screen
    Alert.alert(
      "Discard changes?",
      "You have unsaved changes. Are you sure to discard them and leave the screen?",
      [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Discard",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => dispatch(data.action),
        },
      ]
    );
  });

  useLayoutEffect(() => {
    setOptions({
      title: title.current,
      headerBackImageSource: backImage.current,
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigate("Home");
          }}
        >
          <Text style={{ color: "white" }}>Exit</Text>
        </Pressable>
      ),
      headerTitle: showHeaderTitle.current
        ? () => (
            <View
              style={{
                width: 200,
                height: 18,
                backgroundColor: "gray",
                padding: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "stretch",
              }}
            >
              <View
                style={{
                  flex: 2,
                  backgroundColor: leftColor.current,
                }}
              />
              <View
                style={{
                  flex: 1,
                  backgroundColor: rightColor.current,
                }}
              />
            </View>
          )
        : undefined,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Button
        title="Next Screen"
        onPress={() => {
          push("InfiniteScreen", {
            previous: thisIndex,
          });
        }}
      />
      <Button
        title="Block Back"
        onPress={() => {
          setPreventCanGoBack(true);
        }}
      />
    </View>
  );
};
