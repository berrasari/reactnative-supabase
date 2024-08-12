import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
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
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../api/supabase";

export default function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

    const navigation = useNavigation();

    const handleRegisterPress = () => {
        navigation.navigate("Register"); // Navigate to the Register screen
    };

    const insertUserIntoTable = async () => {
        try {
            const { data, error } = await supabase.from("user").insert([
                {
                    email: email,
                    password: password,
                },
            ]);

            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            Alert.alert("Login Error", error.message);
        } else {
            insertUserIntoTable();
            Alert.alert("Login Success", "You have successfully logged in!");
            navigation.navigate("Home");
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
                    <Text style={styles.title}>Login</Text>
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

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.orContainer}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.orLine} />
                    </View>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegisterPress}
                    >
                        <Text style={styles.registerButtonText}>
                            Not have an account yet?{" "}
                            <Text style={styles.registerButtonTextHighlight}>
                                Register now!
                            </Text>
                        </Text>
                    </TouchableOpacity>
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
    forgotPasswordButton: {
        alignSelf: "flex-end",
    },
    forgotPasswordButtonText: {
        color: "#3662AA",
        fontSize: 16,
        fontWeight: "500",
    },
    loginButton: {
        backgroundColor: "#3662AA",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    loginButtonText: {
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
    googleButton: {
        backgroundColor: "#F2F6F2",
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    googleButtonText: {
        color: "#4E5867",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    googleLogo: {
        width: 20.03,
        height: 20.44,
        position: "absolute",
        left: 14,
    },
    registerButton: {
        alignSelf: "center",
        marginTop: 40,
    },
    registerButtonText: {
        fontSize: 16,
        color: "#7C808D",
    },
    registerButtonTextHighlight: {
        fontSize: 16,
        color: "#3662AA",
        fontWeight: "500",
    },
});
