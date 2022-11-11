import React from "react";
import { View, TouchableOpacity, Text, TextInput, Image } from "react-native";
import { styles } from "./styles";
import CirculoMagico from './CirculoMagico.png'

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olá turma!
      </Text>
      <TextInput
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
      >
        <Image
          source={CirculoMagico}
          style={styles.image}
        />
        <Text
          style={styles.buttonText}
        >
          Habilidades
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default App