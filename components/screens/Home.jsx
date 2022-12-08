import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text } from "react-native";
import firebase from '../config/firebase';

export default function Home({ navigation }) {
    const [users, setUsers] = useState("");

    function getUsers(){
        firebase.database().ref('users').on('value', (snapshot) => {
            setUsers(snapshot.val())
        })
    }

    useEffect(()=>{
        getUsers();
    })
    console.log(users)
    return(
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        padding: 20,
        alignItems: "center"
    }
})