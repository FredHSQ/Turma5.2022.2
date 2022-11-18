import React from "react";
import {  Text, TouchableOpacityProps, TouchableOpacity, Image } from "react-native";
import { listaEquipamentos } from "../../services/api";
import { styles } from "./styles";

interface EquipamentoCardProps extends TouchableOpacityProps {
    equipamento: listaEquipamentos;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIndexSelecionado: React.Dispatch<React.SetStateAction<string>>;
}

export const EquipamentoCard = ({ equipamento, setModal, setIndexSelecionado } : EquipamentoCardProps) =>{

    function abreModal () {
        setIndexSelecionado(equipamento.index);
        setModal(true);
    }

    return <TouchableOpacity onPress={abreModal} style={styles.buttonMagicItem}>
            <Text style={styles.textMagicItem}>
                {equipamento.name}
            </Text>

    </TouchableOpacity>
}