import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { token } from "../utils";

const width = Dimensions.get("window").width;

export function Home({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [user, setUser] = useState(null);

  const [startOrEnd, setStartOrEnd] = useState(null);
  const [dayTime, setDayTime] = useState(null);

  useEffect(() => {
    if (route && route.params && route.params.user) {
      setUser(route.params.user);
    }
  }, [route]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  function onSign() {
    if (!dayTime || !startOrEnd) {
      setErrorMsg("Please select entrance/exit and reason");
      return;
    }

    const { E_mail } = user;

    const url =
      "https://api.businesscentral.dynamics.com/v2.0/a86d2c8a-6032-4e60-a2d5-95838d3800cc/Sandbox/ODataV4/Company('Rutland%20Cycling%20Ltd.%20TEST')/EmployeessigningWS";

    let headers = new Headers();
    headers.append("Authorization", "Basic" + ` ${token}`);
    headers.append("Content-Type", "application/json");

    const hour = new Date();

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        Employee: E_mail,
        Date: new Date().toLocaleDateString(),
        Hour: new Date(hour.setHours(hour.getHours() + 2)).toLocaleTimeString(),
        Entrance_Exit: startOrEnd,
        Type: dayTime,
        Location: `http://www.google.com/maps/place/${location.coords.latitude},${location.coords.longitude}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setErrorMsg(null);
        alert("Successfully signed.");
      });
  }

  return (
    <ScrollView style={styles.container}>
      {user && <Text style={styles.title}>Welcome, {user.E_mail}</Text>}
      <Text style={styles.title}>{new Date().toLocaleString()}</Text>
      <View style={{ marginTop: 40 }}>
        <Picker
          selectedValue={startOrEnd}
          style={styles.input}
          itemStyle={{ height: 200, backgroundColor: "white" }}
          onValueChange={(itemValue) => setStartOrEnd(itemValue)}
        >
          <Picker.Item
            style={{ backgroundColor: "white" }}
            label="Choose entrance / exit"
            value={null}
          />
          <Picker.Item label="Entrance" value="Entrance" />
          <Picker.Item label="Exit" value="Exit" />
        </Picker>
        <Picker
          selectedValue={dayTime}
          style={styles.input}
          onValueChange={(itemValue) => setDayTime(itemValue)}
        >
          <Picker.Item label="Choose reason" value={null} />
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Sickness" value="Sickness" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={{ marginTop: "auto", marginBottom: "auto" }}>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        <TouchableOpacity style={styles.button} onPress={onSign}>
          <Text style={styles.buttonText}>Sign</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    paddingTop: 40,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  },
  input: {
    width: width - 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 25,
    marginTop: 24,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#CB4437",
    width: width - 30,
    height: 44,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  signupText: {
    fontSize: 15,
    color: "#ffffff",
    marginRight: 4,
  },
  signup: {
    color: "#CB4437",
    fontSize: 15,
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});
