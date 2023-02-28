import { View, Text } from "react-native";
import React from "react";
import { Order } from "../typing";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  const tw = useTailwind();
  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-0" : " rounded-lg my-2"} `),
        {
          backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
          padding: 0,
          paddingTop: 10,
          height: fullWidth && "100%",
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" color={"white"} size={50} />
      </View>
      <View>
        <Text style={tw("text-xs text-center text-white uppercase font-bold")}>
          {order.carrier} - {order.trackingId}
        </Text>
        <Text style={tw("text-lg text-center text-white font-bold")}>
          Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Divider color="white" width={1} style={tw("mt-5")} />
      </View>
      <View style={tw("mx-auto")}>
        <Text style={tw("text-base text-center text-white font-bold mt-5")}>
          Address:{" "}
        </Text>
        <Text style={tw("text-sm text-center text-white")}>
          {order.Address}, {order.City}
        </Text>
        <Text style={tw("text-sm text-center text-white italic")}>
          Shipping cost: ${order.shippingCost}
        </Text>
      </View>
      <Divider color="white" width={1} style={tw("mt-5")} />
      <View style={tw("p-5")}>
        {order.trackingItems.items.map((item) => (
          <View
            style={tw("flex-row justify-between items-center")}
            key={item.item_id}
          >
            <Text style={tw("text-sm text-white italic")}>{item.name}</Text>
            <Text style={tw("text-sm text-white italic")}>
              x{item.quantity}
            </Text>
          </View>
        ))}
      </View>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tw("w-full"), { height: fullWidth ? "100%" : 200 }]}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{ latitude: order.Lat, longitude: order.Lng }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
