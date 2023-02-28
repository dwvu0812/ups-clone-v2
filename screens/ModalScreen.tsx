import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import SafeAreaView from "react-native-safe-area-view";
import { Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamsList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { userId, name },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <SafeAreaView style={tw("flex-1 mt-5")}>
      <TouchableOpacity
        style={tw("absolute top-5 right-5 z-10")}
        onPress={() => navigation.goBack()}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        <View style={[tw("py-5 border-b"), {borderColor: "#59C1CC"}]}>
          <Text style={[tw("text-center text-2xl font-bold"), {color: "#59C1CC"}]}>{name}</Text>
          <Text style={[tw("text-center italic text-sm")]}>deliveries</Text>
        </View>
      </View>
      <FlatList 
        data={orders}
        keyExtractor={order => order.trackingId}
        renderItem={({item: order}) => <DeliveryCard order={order}/>}
      />
    </SafeAreaView>
  );
};

export default ModalScreen;
