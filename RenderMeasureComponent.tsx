import React, { useRef } from "react";

import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface Props {
  children: React.ReactNode;
}

export const RenderMeasureComponent = ({ children }: Props) => {
  const renderCountRef = useRef(0);

  renderCountRef.current++;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 100,
          right: 0,
          height: 100,
          zIndex: 999999,
          elevation: 999999,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "lightgrey",
          }}
        >
          Render Measure
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert(`The Number of Renders is: ${renderCountRef.current}`);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Count Renders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            renderCountRef.current = 0;
          }}
          style={styles.button2}
        >
          <Text style={styles.buttonText}>Reset Count</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const defaultButtonStyles: ViewStyle = {
  height: 40,
  width: 125,
  zIndex: 9999,
  elevation: 9999,
  justifyContent: "center",
};

const styles = StyleSheet.create({
  button: {
    ...defaultButtonStyles,
    backgroundColor: "red",
  },
  button2: {
    ...defaultButtonStyles,
    backgroundColor: "yellow",
  },
  buttonText: {
    textAlign: "center",
  },
});
