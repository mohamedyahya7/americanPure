import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* <Text style={styles.text}>Loading...</Text> */}
      <LottieView
        style={{ width: 700, height: 700 }}
        autoPlay
        color={colors.primary}
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    opacity: 1,
    width: "100%",
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
  },
});

export default ActivityIndicator;
