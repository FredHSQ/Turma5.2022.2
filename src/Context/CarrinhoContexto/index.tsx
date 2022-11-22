import React, { createContext, useEffect, useState } from "react";
import { listaEquipamentos } from "../../services/api";

import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProvedorCarrinhoProps {
    children: React.ReactNode
}

interface CarrinhoContextoProps {
    listaDeEquipamentos: listaEquipamentos[];
    salvaListaDeEquipamentos: (equipamentos: listaEquipamentos) => void;
    precoTotal: number;
    removeEquipamentoDoCarrinho: (index: string) => void;
}

export const CarrinhoContexto = createContext<CarrinhoContextoProps>({
    listaDeEquipamentos: [{
        index: "",
        name: "",
        url: "",
    }],
    salvaListaDeEquipamentos: (equipamentos: listaEquipamentos) => { },
    precoTotal: 0,
    removeEquipamentoDoCarrinho: (index: string) => { },
});

export const ProvedorCarrinho = ({ children }: ProvedorCarrinhoProps) => {
    const [listaDeEquipamentos, setListaDeEquipamentos] = useState<listaEquipamentos[]>([]);
    const [precoTotal, setPrecoTotal] = useState<number>(0);

    useEffect(()=>{
        getData().then((res)=>{
            setListaDeEquipamentos(res ? res : [])
        })
    },[])

    useEffect(() => {
        let soma = 0;
        listaDeEquipamentos.length >= 1 && listaDeEquipamentos.map((equipamento: listaEquipamentos) => {
            soma = soma + Number(equipamento.preco)
        });
        setPrecoTotal(soma);
    }, [listaDeEquipamentos])

    const storeData = async (value: listaEquipamentos[]) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@itens_carrinho', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@itens_carrinho')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    function salvaListaDeEquipamentos(equipamento: listaEquipamentos) {
        setListaDeEquipamentos([...listaDeEquipamentos, equipamento]);
        storeData([...listaDeEquipamentos, equipamento])
    };

    function removeEquipamentoDoCarrinho(index: string) {
        let novaListaDeEquipamentos = listaDeEquipamentos.filter((equipamento) => {
            return equipamento.index !== index
        })
        setListaDeEquipamentos(novaListaDeEquipamentos);
        storeData(novaListaDeEquipamentos);
    };

    return (
        <CarrinhoContexto.Provider
            value={{
                listaDeEquipamentos,
                salvaListaDeEquipamentos,
                precoTotal,
                removeEquipamentoDoCarrinho
            }}
        >
            {children}
        </CarrinhoContexto.Provider>
    )
}