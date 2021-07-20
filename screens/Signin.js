import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const animation = useRef();

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, [animation.current]);

  function onNavigateSignup() {
    navigation.navigate("Signup");
  }

  function signIn() {
    navigation.replace("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.title}>Work shift</Text>
          <LottieView
            ref={animation}
            style={{
              width: 400,
              height: 250,
              backgroundColor: "#000000",
              alignSelf: "center",
            }}
            source={require("../animations/login.json")}
          />
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <Text style={styles.signupText}>Don't you have an account?</Text>
            <TouchableOpacity onPress={onNavigateSignup}>
              <Text style={styles.signup}>Sign up</Text>
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
    padding: 14,
    paddingTop: 40,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    textTransform: "uppercase",
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
