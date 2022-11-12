import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Image, FlatList, StatusBar } from "react-native";
import { styles } from "./styles";
import CirculoMagico from '../../assets/CirculoMagico.png';

interface habilidadeProps {
    id: string,
    nome: string,
}

export const Habilidades = () => {

    const [listaHabilidades, setListaHabilidades] = useState<habilidadeProps[]>([]);

    const [habilidade, setHabilidade] = useState<string>("");

    const [saudacoes, setSaudacoes] = useState<string>("");

    useEffect(() => {
        const horaAtual = new Date().getHours();
        if (horaAtual < 12) {
            setSaudacoes("Bom Dia!")
        } else if (horaAtual >= 12 && horaAtual < 18) {
            setSaudacoes("Boa Tarde!")
        } else {
            setSaudacoes("Boa noite!")
        }
    }, []);

    function adiconaHabilidade() {
        let habilidadeProvisoria: habilidadeProps = {
            id: String(new Date().getTime()),
            nome: habilidade
        }

        setListaHabilidades([...listaHabilidades, habilidadeProvisoria])
    }

    function removedorDeHabilidade(id: string) {

        let listaFiltrada = listaHabilidades.filter(
            habilidade=>habilidade.id !== id
            )

        setListaHabilidades(listaFiltrada)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Seja Bem Vindo! {listaHabilidades.length}
            </Text>
            <Text style={styles.title}>
                {saudacoes}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nova Habilidade"
                placeholderTextColor='#555'
                onChangeText={(value) => setHabilidade(value)}
            />

            <TouchableOpacity
                onPress={() => adiconaHabilidade()}
                style={styles.button}
            >
                <Text
                    style={styles.buttonText}
                >
                    Habilidades
                </Text>
            </TouchableOpacity>

            <FlatList
                style={{marginTop: 10}}
                data={listaHabilidades}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={()=> removedorDeHabilidade(item.id)}
                            style={styles.buttonSkill}
                        >
                            <Image
                                source={CirculoMagico}
                                style={styles.image}
                            />
                            <Text style={styles.textSkill}>
                                {item.nome}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}