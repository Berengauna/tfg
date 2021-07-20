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

const width = Dimensions.get("window").width;

export function Signup({ navigation }) {
  const animation = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [company, setCompany] = useState("");

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
    if (
      email.length &&
      name.length &&
      firstName.length &&
      password.length &&
      company.length
    ) {
      // navigation.navigate("Home");

      const xmls = "";

      await axios.post(
        "https://api.businesscentral.dynamics.com/v2.0/a86d2c8a-6032-4e60-a2d5-95838d3800cc/Sandbox/WS/Rutland%20Cycling%20Ltd.%20TEST/Page/WorkShiftEmployeeWS",
        xmls,
        { headers: { "Content-Type": "text/xml" } }
      );
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
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
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
            secureTextEntry
          />
          <TextInput
            placeholder="Repeat password"
            style={styles.input}
            secureTextEntry
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
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
});
