import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { useTailwind } from "tailwind-rn/dist";
import useOrders from "../hooks/useOrders";
import SafeAreaView from "react-native-safe-area-view";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../components/OrderCard";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

export type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

const OrdersScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        source={{
          uri: "https://links.papareact.com/m51",
        }}
        containerStyle={tw("w-full h-64")}
      />
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Button
          color={"pink"}
          titleStyle={{ color: "gray", fontWeight: "400" }}
          // style={{marginHorizontal: 10, marginVertical: 10}}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing: Oldest first" : "Showing: Most recent first"}
        </Button>
      </View>
      {orders
        .sort((a, b) => {
          if (ascending) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
          } else {
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
          }
        })
        .map((order) => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
    </ScrollView>
  );
};

export default OrdersScreen;
