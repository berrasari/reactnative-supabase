// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { supabase } from "./api/supabase";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createStackNavigator();

  const [authsession, setAuthsession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const { data, error } = response;

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      if (data) {
        const { session } = data;
        setAuthsession(session);
      }
    });

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthsession(session);
    });

    return () => { };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authsession ? "Home" : "Login"}
      >
        <Stack.Screen
          name="Home"
          initialParams={{ session: authsession }}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          initialParams={{ session: authsession }}
          component={LoginScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Register"
          initialParams={{ session: authsession }}
          component={RegisterScreen}
          options={{ headerShown: true }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}