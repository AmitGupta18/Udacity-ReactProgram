import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  getMetricInfo,
  timeToString,
  getDailyReminderValue,
} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";

function AddEntry(props) {
  const [metrics, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  });

  const increment = (metricName) => {
    const { max, step } = getMetricInfo(metricName);

    const count = metrics[metricName] + step;

    setState({
      ...metrics,
      [metricName]: count > max ? max : count,
    });
  };

  const decrement = (metricName) => {
    const count = metrics[metricName] - getMetricInfo(metricName).step;

    setState({
      ...metrics,
      [metricName]: count < 0 ? 0 : count,
    });
  };

  const slide = (metricName, value) => {
    setState({
      ...metrics,
      [metricName]: value,
    });
  };

  const submit = () => {
    const key = timeToString();
    const entry = metrics;

    props.dispatch(
      addEntry({
        [key]: entry,
      })
    );

    setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });
    // Navigate to Home

    submitEntry({ key, entry });

    // Clear local notifications
  };

  const reset = () => {
    const key = timeToString();

    props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );
    // Navigate to home

    removeEntry(key);
  };

  if (props.alreadyLogged) {
    return (
      <View>
        <Ionicons name="md-happy" size={100} />
        <Text>You already looged in information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    );
  }

  const metaInfo = getMetricInfo();
  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = metrics[key];

        return (
          <View key={key}>
            {getIcon()}
            {type === "slider" ? (
              <UdaciSlider
                value={value}
                onChange={(value) => slide(key, value)}
                {...rest}
              />
            ) : (
              <UdaciStepper
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
      <SubmitBtn onPress={submit} />
    </View>
  );
}

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

function mapStateToProps(state, props) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}

export default connect(mapStateToProps)(AddEntry);
