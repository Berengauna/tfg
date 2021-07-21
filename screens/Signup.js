import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { token } from "../utils";

const width = Dimensions.get("window").width;

export function Signup({ navigation }) {
  const animation = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [company, setCompany] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, [animation.current]);

  function onNavigateSignin() {
    navigation.navigate("Signin");
  }

  async function onSignUp() {
    if (password !== passwordConfirm) {
      return;
    }

    if (email.length && name.length && password.length && company.length) {
      const url = `https://api.businesscentral.dynamics.com/v2.0/a86d2c8a-6032-4e60-a2d5-95838d3800cc/Sandbox/ODataV4/Company('Rutland%20Cycling%20Ltd.%20TEST')/WorkShiftEmployeeWS`;

      let headers = new Headers();
      headers.append("Authorization", "Basic" + ` ${token}`);
      headers.append("Content-Type", "application/json");

      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          E_mail: email,
          Password: password,
          Name: name,
          Company: company,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error) {
            setError(null);
            navigation.replace("Home", {
              user: { ...json },
            });
          } else {
            setError("Invalid credentials");
          }
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.title}>sign up</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            style={styles.input}
            autoCapitalize="none"
            type="email"
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            value={company}
            onChangeText={setCompany}
            placeholder="Company"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.input}
            // secureTextEntry
          />
          <TextInput
            placeholder="Repeat password"
            style={styles.input}
            // secureTextEntry
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
          {error && <Text style={styles.error}>Invalid credentials</Text>}
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={onNavigateSignin}>
              <Text style={styles.signup}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    height: 44,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 24,
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
    color: "#CB4437",
    fontSize: 15,
    alignSelf: "center",
  },
});
