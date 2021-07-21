import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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

  // useEffect(() => {
  //   if (location) {
  //     console.log(
  //       `http://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&sensor=true`
  //     );
  //     fetch(
  //       `http://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&sensor=true`
  //     ).then((res) => console.log(res));
  //   }
  // }, [location]);

  function onSign() {
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
        Date2: new Date().toLocaleDateString(),
        Hour2: new Date(
          hour.setHours(hour.getHours() + 2)
        ).toLocaleTimeString(),
        "Entrance/Exit": startOrEnd,
        Type: dayTime,
        Location: "Alicante",
        // Location: `https://www.google.es/maps/place/40%C2%B026'07.7%22N+3%C2%B041'13.7%22W/@40.4354724,-3.689332,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d40.4354683!4d-3.6871433`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  }

  return (
    <View style={styles.container}>
      {user && <Text style={styles.title}>Welcome, {user.E_mail}</Text>}
      <Picker
        selectedValue={startOrEnd}
        style={styles.input}
        itemStyle={{ height: 200, backgroundColor: "white" }}
        onValueChange={(itemValue) => setStartOrEnd(itemValue)}
      >
        <Picker.Item label="Entrada" value="entrada" />
        <Picker.Item label="Salida" value="salida" />
      </Picker>
      <Picker
        selectedValue={dayTime}
        style={styles.input}
        onValueChange={(itemValue) => setDayTime(itemValue)}
      >
        <Picker.Item label="Almuerzo" value="almuerzo" />
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Jornada" value="Jornada" />
        <Picker.Item label="Médico" value="medico" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={onSign}>
        <Text style={styles.buttonText}>Sign</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#000000",
  },
  input: {
    width: width - 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: 24,
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
});
