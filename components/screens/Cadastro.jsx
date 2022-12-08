import React, { useState } from 'react';
import bgForm from '../../assets/images/bgForm.jpg';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { wait } from '../helpers/wait';
import firebase from '../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';

export default function Cadastro({ navigation }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [toastActive, setToastActive] = useState(false);
    const [toastColor, setToastColor] = useState("")
    const [toastIcon, setToastIcon] = useState("");
    const [toastTitle, setToastTitle] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [hidden, setHidden] = useState(true);

    if (toastActive) {
        wait(3000).then(() => { setToastActive(false) })
    }
    function toggleHidden(){
        setHidden(!hidden);
    }

    //o cadastro só funciona no segundo clique
    async function signUp() {
        if (name != "" && email != "" && phone != "" && password != "" && confirmPassword != "") {
            if (password == confirmPassword) {
                let users = await firebase.database().ref('users');
                setId(users.push().key)
                console.log(id)
                users.child(id).set({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    id: id,
                });
                setToastActive(true);
                setToastColor("#00476F");
                setToastIcon("check");
                setToastTitle("Sucesso!");
                setToastMessage("Usuário cadastrado com sucesso!");
                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setToastActive(true);
                setToastColor("#E31111");
                setToastIcon("close");
                setToastTitle("Erro!");
                setToastMessage("As senhas não conferem.");
            }
        } else {
            setToastActive(true);
            setToastColor("#E31111");
            setToastIcon("close");
            setToastTitle("Erro!");
            setToastMessage("Preencha todos os campos.");
        }
    }

    return (
        <View>
            <Image source={bgForm} style={styles.backgroundImage} />
            <View style={styles.backgroundContainer}>
                {toastActive && (
                    <View style={styles.toastContainer}>
                        <View style={[styles.toastIcon, { backgroundColor: toastColor }]}>
                            <Icon name={toastIcon} size={20} color="white" />
                        </View>
                        <View style={{ marginLeft: 8 }}>
                            <Text style={styles.toastTitle}>{toastTitle}</Text>
                            <Text style={styles.toastMessage}>{toastMessage}</Text>
                        </View>
                    </View>
                )}
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
                            secureTextEntry={hidden}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.groupForm}>
                        <Text>Confirme sua senha:</Text>
                        <View style={{justifyContent: "center"}}>
                            <TextInput
                                secureTextEntry={hidden}
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity style={{position: "absolute", right: 5}} onPress={()=>{toggleHidden()}}>
                                <IconIO name={hidden ? "eye" : "eye-off"} size={25} color="#00476F" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnSend} onPress={() => {
                        signUp();

                    }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Enviar</Text>
                    </TouchableOpacity>
                    <Text>ou</Text>
                    <TouchableOpacity style={styles.btnVoltar} onPress={() => { navigation.goBack() }}>
                        <Text style={{ color: "#00476F", fontSize: 16 }}>Voltar</Text>
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
    btnVoltar: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#00476F",
        borderWidth: 1,
        marginTop: 5,
    },
    toastContainer: {
        position: "absolute",
        top: 25,
        backgroundColor: "white",
        flexDirection: "row",
        width: "80%",
        padding: 8,
        borderRadius: 8
    },
    toastIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    toastTitle: {
        fontSize: 16,
        fontWeight: "700",
    }
});