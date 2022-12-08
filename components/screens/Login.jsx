import React, { useState } from 'react';
import bgForm from '../../assets/images/bgForm.jpg';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import firebase from '../config/firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { wait } from '../helpers/wait';

export default function Login({ navigation }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [toastActive, setToastActive] = useState(false);

    function togglePassword() {
        setHidden(!hidden);
    }

    async function signIn() {
        await firebase.database().ref('users').on('value', (snapshot) => {
            let state = Object.values(snapshot.val());
            for (let i = 0; i < state.length; i++) {
                if (state[i].email == name && state[i].password == password) {
                    navigation.navigate("Home");
                    i = state.length;
                } else {
                    setToastActive(true);
                }
            }
        })
    }
    if (toastActive) {
        wait(3000).then(() => {
            setToastActive(false);
        })
    }
    return (
        <View>
            <Image source={bgForm} style={styles.backgroundImage} />
            <View style={styles.backgroundContainer}>
                {toastActive && (
                    <View style={styles.toastContainer}>
                        <View style={styles.toastIcon}>
                            <Icon name="close-sharp" size={30} color="white"/>
                        </View>
                        <View>
                            <Text style={{fontSize: 16, marginLeft: 10}}>Usuário ou senha incorretos</Text>
                        </View>
                    </View>
                )}
                <View style={styles.cadastroContainer}>
                    <Text style={{ color: "#00476F", fontSize: 22, fontWeight: "700" }}>Login</Text>
                    <View style={styles.groupForm}>
                        <Text>Digite seu e-mail:</Text>
                        <TextInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Digite sua senha:</Text>
                        <View>
                            <TextInput
                                value={password}
                                secureTextEntry={hidden}
                                onChangeText={text => setPassword(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }} onPress={() => { togglePassword() }}>
                                <Icon name={hidden ? "eye-off" : "eye"} size={20} color="#00476F" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnSend} onPress={() => {
                        signIn();
                    }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Enviar</Text>
                    </TouchableOpacity>
                    <Text>ou</Text>
                    <TouchableOpacity style={styles.btnCadastro} onPress={() => {
                        navigation.navigate("Cadastro");
                    }}>
                        <Text style={{ color: "#00476F", fontSize: 16 }}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    toastContainer:{
        width: "90%",
        position: "absolute",
        top: 30,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        alignItems: "center",
    },
    toastIcon: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#E31111",
    },
    backgroundImage: {
        height: "100%",
        width: "100%",
        position: "absolute"
    },
    backgroundContainer: {
        minHeight: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000050",
    },
    cadastroContainer: {
        width: "90%",
        height: 300,
        alignItems: "center",
        borderWidth: 2,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: "#00000040",
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 10,
    },
    groupForm: {
        width: "100%",
    },
    input: {
        height: 30,
        fontSize: 16,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: "#00000070",
        borderRadius: 5,
        paddingLeft: 5,
        marginVertical: 5,
    },
    btnSend: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00476F",
        marginTop: 5,
    },
    btnCadastro: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#00476F",
        marginTop: 5,
    }
});