import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProp } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";

type Props = {
  email: string;
  name: string;
  userId: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MyModal", { userId, name })}
    >
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View style={tw("flex-row justify-between")}>
          <View>
            <Text style={tw("text-2xl font-bold")}>{name}</Text>
            <Text
              style={[tw("text-sm"), { color: "#59C1CC" }]}
            >{`ID: ${userId}`}</Text>
          </View>
          <View style={tw("flex-row items-center justify-end")}>
            <Text style={[tw("ml-auto"), { color: "#59C1CC" }]}>
              {loading ? "Loading..." : `${orders.length} x `}
            </Text>
            <Icon
              name="box"
              type="entypo"
              color={"#59C1CC"}
              size={50}
              style={tw("mb-5 ml-auto")}
            />
          </View>
        </View>
        <CardDivider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
