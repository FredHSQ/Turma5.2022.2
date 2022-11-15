import React from "react";
import { TouchableOpacity, Image, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

import { habilidadeProps } from "../../screens/Habilidades";

import CirculoMagico from '../../assets/CirculoMagico.png';

interface CardHabilidadeProps extends TouchableOpacityProps {
    habilidade: habilidadeProps
}

export function CardHabilidade  ({ habilidade, ...rest }: CardHabilidadeProps) {


    return (
        <TouchableOpacity
            style={styles.buttonSkill}
            {...rest}
        >
            <Image
                source={CirculoMagico}
                style={styles.image}
            />
            <Text style={styles.textSkill}>
                {habilidade.nome}
            </Text>
        </TouchableOpacity>
    )
}