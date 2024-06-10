import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ViewStyle,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useTabPosition } from "./TabDataProvider";

const defaultStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
};

export const OrderDetails = () => {
  return (
    <View style={[defaultStyle, { backgroundColor: "yellow" }]}>
      <Text>Order Details</Text>
    </View>
  );
};

export const CustomerDetails = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={[defaultStyle, { backgroundColor: "green" }]}>
      <Button
        onPress={() => {
          console.log("OK");
          navigate("MoreStack");
        }}
        title="Customer Details"
      />
    </View>
  );
};

export const More = () => {
  const { navigate } = useNavigation<any>();
  return (
    <Pressable
      style={[defaultStyle, { backgroundColor: "orange" }]}
      onPress={() => {
        console.log("MORE PRESSED");
      }}
    >
      <Pressable
        onPress={() => {
          navigate("Collections");
        }}
      >
        <Text>More</Text>
      </Pressable>
    </Pressable>
  );
};

export const AllProducts = () => {
  const { navigate } = useNavigation<any>();
  const { setPosition } = useTabPosition();
  return (
    <View style={[defaultStyle, { backgroundColor: "grey" }]}>
      <Text>All Products</Text>
      <Button
        title="Navigate"
        onPress={() => {
          navigate("Products Subnavigation");
        }}
      />
      <Button
        title="Move"
        onPress={() => {
          // navigate("Products Subnavigation");
          setPosition({ top: 250 });
        }}
      />
    </View>
  );
};

export const Collections = () => {
  return (
    <View style={[defaultStyle, { backgroundColor: "lightblue" }]}>
      <Text>Collections</Text>
    </View>
  );
};

export const ProductsSubscreen1 = () => {
  const data = [
    "Steve Fox",
    "Jin Kazama",
    "Lili De Rochefort",
    "Ling Xiaoyu",
    "Marshall Law",
    "Nina Williams",
    "Kuma",
    "Panda",
    "Sergei Dragunov",
    "Shaheen",
    "Victor Chevalier",
  ];
  return (
    <View
      style={[
        defaultStyle,
        {
          backgroundColor: "lightgreen",
          justifyContent: undefined,
          alignItems: undefined,
        },
      ]}
    >
      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>{item.item}</Text>
            </View>
          );
        }}
      />
      {/* <Text>Product Subscreen</Text> */}
    </View>
  );
};
