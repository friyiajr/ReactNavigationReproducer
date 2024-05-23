import { useNavigation } from "@react-navigation/native";
import { View, Text, ViewStyle, Button, FlatList } from "react-native";

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
  return (
    <View style={[defaultStyle, { backgroundColor: "green" }]}>
      <Text>Customer Details</Text>
    </View>
  );
};

export const More = () => {
  return (
    <View style={[defaultStyle, { backgroundColor: "orange" }]}>
      <Text>More</Text>
    </View>
  );
};

export const AllProducts = () => {
  const { navigate } = useNavigation<any>();
  return (
    <View style={[defaultStyle, { backgroundColor: "grey" }]}>
      <Text>All Products</Text>
      <Button
        title="Navigate"
        onPress={() => {
          navigate("Products Subnavigation");
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
