import React, { useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { styles } from "./styles";

export const Equipamentos = () => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [listaEquipamentos, setListaEquipamentos] = useState(["Fred", "Pedro"]);

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>
                Loja De Equipamentos
            </Text>
            {carregando ?
                <ActivityIndicator
                    size={"large"}
                />
                :
                <FlatList
                    data={listaEquipamentos}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text style={styles.title}>
                                    {item}
                                </Text>
                            </View>
                            
                        )
                    }
                    }
                />
            }
        </View>
    )
}