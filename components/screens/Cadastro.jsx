import React, { useState } from 'react';
import bgForm from '../../assets/images/bgForm.jpg';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import firebase from '../config/firebase';

export default function Cadastro({ navigation }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function signUp() {
        if (name != "" && email != "" && phone != "" && password != "" && confirmPassword != "") {
            if (password == confirmPassword) {
                let users = await firebase.database().ref('users');
                setId(users.push().key)
                users.child(id).set({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    id: id,
                })
                navigation.navigate("Home");
            } else {
                Alert.alert("As senhas não conferem!");
            }
        } else {
            Alert.alert("Preencha todos os campos!");
        }
    }

    return (
        <View>
            <Image source={bgForm} style={styles.backgroundImage} />
            <View style={styles.backgroundContainer}>
                <View style={styles.cadastroContainer}>
                    <Text style={{ color: "#00476F", fontSize: 22, fontWeight: "700" }}>Cadastro</Text>
                    <View style={styles.groupForm}>
                        <Text>Digite seu nome:</Text>
                        <TextInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Digite seu e-mail:</Text>
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Digite seu telefone:</Text>
                        <TextInput
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Digite sua senha:</Text>
                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Confirme sua senha:</Text>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnSend} onPress={() => {
                        signUp();
                    }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Enviar</Text>
                    </TouchableOpacity>
                    <Text>ou</Text>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => {
                        navigation.navigate("Login");
                    }}>
                        <Text style={{ color: "#00476F", fontSize: 16 }}>Já tenho conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        height: 460,
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
    btnLogin: {
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