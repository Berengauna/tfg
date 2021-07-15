import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

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

  function onSignUp() {
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
      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        style={styles.input}
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
      <View style={{ flexDirection: "row", marginTop: "auto" }}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={onNavigateSignin}>
          <Text style={styles.signup}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
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
    width: "100%",
    height: 44,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 24,
  },
  button: {
    backgroundColor: "#CB4437",
    width: "100%",
    height: 44,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
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
