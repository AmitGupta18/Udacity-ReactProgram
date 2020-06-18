import React from "react";
import { View, Text, Slider } from "react-native";

export default function UdaciSlider({ unit, step, max, value, onChange }) {
  return (
    <View>
      <Slider
        step={step}
        maximumValue={max}
        minimumValue={0}
        value={value}
        onValueChange={onChange}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
}
