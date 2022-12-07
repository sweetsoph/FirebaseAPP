import React, {useState} from 'react';
import { View, Text, TouchableOpacity, InputText } from 'react-native';

export default function Home (){
    const [name, setName] = useState("")
    return (
        <View>
            <Text>Cadastro</Text>
            <InputText
                placeholder="Digite seu nome"
                value={name}
                onChangeText={(text) => setName(text)}
            ></InputText>
        </View>
    )
}