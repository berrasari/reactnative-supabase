import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../api/supabase";

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert("Failed to log out: " + error.message);
        } else {
            navigation.replace("Login"); // Navigate back to the login screen
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
                <Text style={styles.instructionsText}>You are now logged in.</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        alignItems: "center",
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    instructionsText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    logoutButton: {
        backgroundColor: "#3662AA",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    logoutButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});
