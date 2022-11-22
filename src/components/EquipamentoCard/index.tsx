import React, { useContext } from "react";
import { Text, TouchableOpacityProps, TouchableOpacity, Image } from "react-native";
import { listaEquipamentos } from "../../services/api";
import { styles } from "./styles";

import CloseIcon from "../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png";
import { CarrinhoContexto } from "../../Context/CarrinhoContexto";

interface EquipamentoCardProps extends TouchableOpacityProps {
    equipamento: listaEquipamentos;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIndexSelecionado: React.Dispatch<React.SetStateAction<string>>;
    setPrecoSelecionado?: React.Dispatch<React.SetStateAction<number>>;
}

export const EquipamentoCard = ({ equipamento, setModal,setPrecoSelecionado, setIndexSelecionado }: EquipamentoCardProps) => {

    const removeEquipamentoDoCarrinho = useContext(CarrinhoContexto).removeEquipamentoDoCarrinho

    function abreModal() {
        setIndexSelecionado(equipamento.index);
        setPrecoSelecionado && setPrecoSelecionado(equipamento.preco)
        setModal(true);
    }

    return (

        <TouchableOpacity onPress={abreModal} style={styles.buttonMagicItem}>
            <Text style={styles.textMagicItem}>
                {equipamento.name}
            </Text>
            {equipamento.preco &&
                <TouchableOpacity onPress={()=>removeEquipamentoDoCarrinho(equipamento.index)}>
                    <Image source={CloseIcon} style={styles.closeIcon}/>
                </TouchableOpacity>
            }
        </TouchableOpacity>
    )
}