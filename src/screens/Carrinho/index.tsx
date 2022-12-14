import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { getEquipamentos } from "../../services/api";
import { styles } from "./styles";

import { listaEquipamentos } from "../../services/api";
import { EquipamentoCard } from "../../components/EquipamentoCard";
import { ModalStatus } from "../../components/Modais/ModalStatus";
import { CarrinhoContexto } from "../../Context/CarrinhoContexto";

export const Carrinho = () => {

    const listaDeEquipamentos  = useContext(CarrinhoContexto).listaDeEquipamentos
    const precoTotal = useContext(CarrinhoContexto).precoTotal

    const [indexSelecionado, setIndexSelecionado] = useState<string>("");
    const [precoSelecionado, setPrecoSelecionado] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>
                Carrinho
            </Text>
            <FlatList
                data={listaDeEquipamentos}
                keyExtractor={item => item.index}
                renderItem={({ item }) => {
                    return (
                        <EquipamentoCard
                            equipamento={item}
                            setIndexSelecionado={setIndexSelecionado}
                            setModal={setModal}
                            setPrecoSelecionado={setPrecoSelecionado}
                        />
                    )
                }
                }
            />
            <View style={styles.containerPreco}>
                <Text style={styles.title}>
                    Preço:
                </Text>
                <Text style={styles.title}>
                    R$ {precoTotal},00
                </Text>
            </View>
            {modal &&
                <ModalStatus
                    index={indexSelecionado}
                    modal={modal}
                    setModal={setModal}
                    preco={precoSelecionado}
                />
            }
        </View>
    )
}