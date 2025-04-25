import { View, Text, Image, ScrollView } from "react-native";
import { icons } from "../../constants";
import React from "react";
import BookingCard from "../../components/bookingCard";

const bookings = () => {
  const totalTrips = 20;
  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="font-psemibold mb-2">Total Trips: {totalTrips}</Text>
      <ScrollView className="flex" showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
          <BookingCard
            origin="Douglas Crescent Road"
            destination="Logan Avenue"
            date="Thu 23,Sept 03:40 PM"
            price="50.00"
          />
        </View>
      </ScrollView>
      <View className="flex-row justify-center gap-4 pt-4 items-center">
        <Image className="w-6 h-6" source={icons.leftCaret} />
        <View className="flex-row gap-3">
          <Text className="text-xl">1</Text>
          <Text className="text-xl">2</Text>
          <Text className="text-xl">3</Text>
          <Text className="text-xl">4</Text>
          <Text className="text-xl">5</Text>
          <Text className="text-xl">6</Text>
        </View>
        <Image className="w-10 h-6" source={icons.rightCaret} />
      </View>
    </View>
  );
};

export default bookings;
