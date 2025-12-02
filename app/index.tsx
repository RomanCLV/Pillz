import React from "react";
import { StyleSheet, Image } from "react-native";

import ThemedView from "../components/themedComponents/ThemedView";
import ThemedCard from "../components/themedComponents/ThemedCard";
import ThemedText from "../components/themedComponents/ThemedText";
import ThemedButtonLink from "../components/themedComponents/ThemedButtonLink";

import {GlobalStyles} from "../constants/global-styles";
import Logo from "../assets/favicon.png";

const Home = () => {
  return (
    <ThemedView style={GlobalStyles.container}>
      <ThemedText>This is the home page.</ThemedText>
      <ThemedCard>
        <ThemedText>Card Title</ThemedText>
        <ThemedText>Card Content</ThemedText>
      </ThemedCard>
       <ThemedCard>
        <ThemedText>Card Title</ThemedText>
        <ThemedText>Card Content</ThemedText>
      </ThemedCard>
      <Image source={Logo} style={styles.image} />
      <ThemedButtonLink href="/settings">Change theme</ThemedButtonLink>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    margin: 16,
    alignSelf: "center",
  }
});
