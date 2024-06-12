import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
  Extrapolation,
} from "react-native-reanimated";
import { useCallback, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export const ModalScreen = ({ children }) => {
  const { goBack } = useNavigation();
  const startValue = useSharedValue(0);
  const value = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const scrimStyles = useAnimatedStyle(() => ({
    opacity: interpolate(value.value, [0, height], [0, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }));

  const containerStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(value.value, [0, height], [height, 0], {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        }),
      },
    ],
  }));

  useFocusEffect(
    useCallback(() => {
      value.value = withSpring(height, {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      });

      return () => {
        console.log("unmount");
      };
    }, [])
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
          startValue.value = value.value;
        })
        .onChange((event) => {
          "worklet";

          value.value = startValue.value - event.translationY;
        })
        .onEnd((event) => {
          "worklet";

          console.log("test test event.translationY", value.value);
          if (event.translationY > height / 2 || event.velocityY > 300) {
            value.value = withSpring(
              0,
              {
                velocity: event.velocityY,
                stiffness: 1000,
                damping: 500,
                mass: 1,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
              },
              () => {
                runOnJS(goBack)();
              }
            );
          } else {
            value.value = withTiming(height, {
              velocity: event.velocityY,
              stiffness: 1000,
              damping: 500,
              mass: 1,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            });
          }
        }),
    []
  );

  return (
    <Reanimated.View style={[styles.container, { paddingTop: top }]}>
      <Reanimated.View style={[scrimStyles, styles.scrim]} />
      <GestureDetector gesture={pan}>
        <Reanimated.View
          style={[
            {
              flex: 1,
              maxWidth: Dimensions.get("window").width * 0.7,
              width: Dimensions.get("window").width,
              marginTop: 30,
              alignSelf: "center",
              overflow: "hidden",
              backgroundColor: "#181A1F",
              borderRadius: 8,
            },
            containerStyles,
          ]}
        >
          {children}
        </Reanimated.View>
      </GestureDetector>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  scrim: {
    backgroundColor: "rgba(150,0,150,0.25)",
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    overflow: "hidden",
  },
});
