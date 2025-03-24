import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import { icons } from "../../constants";

const TabIcon = ({ icon, name, color }) => {
  return (
    <View className="gap-2 flex-col items-center justify-center">
      <Image
        source={icon}
        resizeMethod="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className="text-center w-full"
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{
          color: color,
          fontSize: 10,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 1,
            height: 80,
            paddingTop: 10,
            paddingBottom: 0,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          title="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.home} name="Home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookings"
          time="Bookings"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.file} name="Bookings" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          title="Notifications"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.message} name="Messages" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          title="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.user} name="Profile" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
