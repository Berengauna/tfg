import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

export function Signin({ navigation }) {
  const animation = useRef();

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, [animation.current]);

  function onNavigateSignup() {
    navigation.navigate('Signup');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Work shift</Text>
        <LottieView
            ref={animation}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#000000',
            }}
            source={require('../animations/login.json')}
          />
        <TextInput placeholder="E-mail" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
          <Text style={styles.signupText}>Don't you have an account?</Text>
          <TouchableOpacity onPress={onNavigateSignup}>
            <Text style={styles.signup}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    padding: 14,
    paddingTop: 40,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 24,
  },
  button: {
    backgroundColor: '#CB4437',
    width: '100%',
    height: 44,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16
  },
  signupText: {
    fontSize: 15,
    color: '#ffffff',
    marginRight: 4,
  },
  signup: {
    color: '#CB4437',
    fontSize: 15
  },
});
