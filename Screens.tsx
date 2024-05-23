import { View, Text, ViewStyle } from "react-native";

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
  return (
    <View style={[defaultStyle, { backgroundColor: "grey" }]}>
      <Text>All Products</Text>
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
