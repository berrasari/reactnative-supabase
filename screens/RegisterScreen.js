import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import React from "react";
import { supabase } from "../api/supabase";
//import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
//const supabaseUrl = 'https://your-supabase-url.supabase.co';
//const supabaseKey = 'your-supabase-anon-key';
//const supabase = createClient(supabaseUrl, supabaseKey);

export default function RegisterScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Registration successful. Please check your email to verify your account.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="mail" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={!passwordIsVisible}
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setPassword}
                            value={password}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibleButton}
                            onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                        >
                            <Feather
                                name={passwordIsVisible ? "eye" : "eye-off"}
                                size={20}
                                color="#7C808D"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.icon}>
                            <Feather name="lock" size={22} color="#7C808D" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry={!passwordIsVisible}
                            placeholderTextColor="#7C808D"
                            selectionColor="#3662AA"
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.orContainer}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.orLine} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
    },
    icon: {
        marginRight: 15,
    },
    input: {
        borderBottomWidth: 1.5,
        flex: 1,
        paddingBottom: 10,
        borderBottomColor: "#eee",
        fontSize: 16,
    },
    passwordVisibleButton: {
        position: "absolute",
        right: 0,
    },
    registerButton: {
        backgroundColor: "#3662AA",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    registerButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    orLine: {
        height: 1,
        backgroundColor: "#eee",
        flex: 1,
    },
    orText: {
        color: "#7C808D",
        marginRight: 10,
        marginLeft: 10,
        fontSize: 14,
    },
    loginButton: {
        alignSelf: "center",
        marginTop: 40,
    },
    loginButtonText: {
        fontSize: 16,
        color: "#7C808D",
    },
    loginButtonTextHighlight: {
        fontSize: 16,
        color: "#3662AA",
        fontWeight: "500",
    },
});
