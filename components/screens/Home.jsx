import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import firebase from '../config/firebase';

export default function Home({ navigation }) {
    const [users, setUsers] = useState("");
    const [usersVisibility, setUsersVisibility] = useState(false);

    function toggleUsersVisibility() {
        setUsersVisibility(!usersVisibility);
    }

    async function getUsers() {
        await firebase.database().ref('users').on('value', (snapshot) => {
            setUsers(Object.values(snapshot.val()));
        })
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>Seja bem-vindo</Text>
            <View style={{marginBottom: 5, width: "100%"}}>
                <TouchableOpacity style={styles.btnCadastro} onPress={() => { navigation.navigate("Cadastro") }}>
                    <Text style={{ color: "white", fontSize: 16 }}>Cadastrar Novo Usuário</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnShow} onPress={() => { toggleUsersVisibility() }}>
                    <Text style={{ fontSize: 16 }}>Mostrar Usuários Cadastrados</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {usersVisibility &&
                    users.map((item) => (
                        <View key={item.id} style={styles.cardUser}>
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
                            <Text style={{ fontSize: 16 }}>{item.email}</Text>
                            <Text style={{ fontSize: 16 }}>{item.phone}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    btnCadastro: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00476F",
        marginTop: 5,
    },
    btnShow: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#00476F",
        borderWidth: 1,
        marginTop: 5,
    },
    cardUser: {
        width: "48%",
        marginVertical: 5,
        minHeight: 100,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderRadius: 5,
        borderColor: "#00000080",
        padding: 5
    }
})