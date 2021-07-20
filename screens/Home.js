import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const width = Dimensions.get("window").width;

export function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [startOrEnd, setStartOrEnd] = useState(null);
  const [dayTime, setDayTime] = useState(null);

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

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={startOrEnd}
        style={styles.input}
        mode="dropdown"
        onValueChange={(itemValue) => setStartOrEnd(itemValue)}
      >
        <Picker.Item label="Entrada" value="entrada" />
        <Picker.Item label="Salida" value="salida" />
      </Picker>
      <Picker
        selectedValue={dayTime}
        style={styles.input}
        mode="dropdown"
        onValueChange={(itemValue) => setDayTime(itemValue)}
      >
        <Picker.Item label="Almuerzo" value="almuerzo" />
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Jornada" value="Jornada" />
        <Picker.Item label="Médico" value="medico" />
      </Picker>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 14,
    paddingTop: 40,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 32,
  },
  input: {
    width: width - 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 10,
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
