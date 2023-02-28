import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  OrderScreenNavigationProp,
  OrderScreenRouteProp,
} from "./OrdersScreen";
import DeliveryCard from "../components/DeliveryCard";

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#EB6A7C",
      headerBackTitle: "Deliveries",
      headerTitleStyle: { color: "#000" },
    });
  }, [order]);

  return (
    <View>
      <DeliveryCard order={order} fullWidth/>
    </View>
  );
};

export default OrderScreen;
