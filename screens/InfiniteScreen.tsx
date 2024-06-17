import {
  UNSTABLE_usePreventRemove,
  useNavigation,
} from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { Home, chevron, exit } from "../MockScreens";

const getRandomRGBA = () => {
  return `rgba(${Math.floor(Math.random() * 255) + 1}, ${
    Math.floor(Math.random() * 255) + 1
  } ,${Math.floor(Math.random() * 255) + 1} ,0.5)`;
};

export const InfiniteScreen = ({ route }: any) => {
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
    dismiss,
    getParent,
  } = useNavigation<any>();
  const leftColor = useRef(getRandomRGBA());
  const rightColor = useRef(getRandomRGBA());
  const [preventCanGoBack, setPreventCanGoBack] = useState(false);

  const blockBackCallback = () => {
    setPreventCanGoBack(true);
  };

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
      // headerBackImageSource: {
      //   uri: "x",
      //   width: 50,
      //   height: 50,
      // },
      // headerTintColor: "white",
      headerBackImageSource:
        thisIndex % 2 === 0
          ? require("../img/chevron.png")
          : require("../img/x.png"),

      headerRight: () => (
        <Pressable
          onPress={() => {
            const parent = getParent();
            if (parent) {
              parent.goBack();
            } else {
              goBack();
            }
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

  return <Home thisIndex={thisIndex} blockBackCallback={blockBackCallback} />;
};
