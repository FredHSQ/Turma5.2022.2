import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { getEquipamentos } from "../../services/api";
import { styles } from "./styles";

import { listaEquipamentos } from "../../services/api";
import { EquipamentoCard } from "../../components/EquipamentoCard";
import { ModalStatus } from "../../components/Modais/ModalStatus";

export const Equipamentos = () => {

    const [carregando, setCarregando] = useState<boolean>(false);
    const [listaEquipamentos, setListaEquipamentos] = useState<listaEquipamentos[]>([]);

    const [indexSelecionado, setIndexSelecionado] = useState<string>("")
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        requisicaoListaEquipamentos();
    }, []);

    function requisicaoListaEquipamentos() {
        setCarregando(true);
        getEquipamentos().then((res) => {
            setListaEquipamentos(res.data.results)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setCarregando(false);
        });
    }

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
                    keyExtractor={item => item.index}
                    renderItem={({ item }) => {
                        return (
                            <EquipamentoCard
                                equipamento={item}
                                setIndexSelecionado={setIndexSelecionado}
                                setModal={setModal}
                            />
                        )
                    }
                    }
                />
            }
            {modal &&
                <ModalStatus
                    index={indexSelecionado}
                    modal={modal}
                    setModal={setModal}
                />
            }
        </View>
    )
}