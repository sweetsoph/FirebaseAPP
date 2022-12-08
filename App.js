import React from "react";
import Cadastro from "./components/screens/Cadastro";
import Home from "./components/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Cadastro" component={Cadastro} />
  //     <Stack.Screen
  //       name="Home"
  //       component={Home}
  //       options={{ headerShown: false }}
  //     />
  //   </Stack.Navigator>
  // </NavigationContainer>;
  return <Cadastro/>
}
