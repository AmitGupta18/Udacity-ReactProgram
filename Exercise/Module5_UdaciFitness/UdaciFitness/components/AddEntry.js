import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import {
  getMetricInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";
import { purple, white } from "../utils/colors";
import { NavigationActions } from "react-navigation";

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

    toHome();

    submitEntry({ key, entry });

    clearLocalNotification().then(setLocalNotification);
  };

  const reset = () => {
    const key = timeToString();

    props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );
    // Navigate to home
    toHome();

    removeEntry(key);
  };

  const toHome = () => {
    props.navigation.dispatch(
      NavigationActions.back({
        key: "AddEntry",
      })
    );
  };

  if (props.alreadyLogged) {
    return (
      <View style={styles.center}>
        <Ionicons
          name={Platform.OS === "ios" ? "happy-outline" : "md-happy"}
          size={100}
        />
        <Text>You already looged in information for today</Text>
        <TextButton onPress={reset} style={{ padding: 10 }}>
          Reset
        </TextButton>
      </View>
    );
  }

  const metaInfo = getMetricInfo();
  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key];
        const value = metrics[key];

        return (
          <View key={key} style={styles.row}>
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
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
  },
});

function mapStateToProps(state, props) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}

export default connect(mapStateToProps)(AddEntry);
