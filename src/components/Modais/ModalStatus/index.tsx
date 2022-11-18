import React, { useEffect, useState } from 'react';
import { View, Modal, Text, ModalProps, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Botao } from '../../Botao';
import { styles } from './styles';

import CloseIcon from "../../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png"
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { equipamentoStatusProps, getEquipementoEspecifico } from '../../../services/api';

interface ModalStatusProps extends ModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    index: string;
}

export const ModalStatus = ({ modal, setModal, index, ...rest }: ModalStatusProps) => {


    const [equipamentoStatus, setEquipamentoStatus] = useState<equipamentoStatusProps>()
    const [carregando, setCarregando] = useState<boolean>(true);

    useEffect(() => {
        getEquipementoEspecifico(index).then((res) => {
            setEquipamentoStatus(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setCarregando(false);
        })
    }, [])

    let precoRandomico = Math.floor(Math.random() * 10000)

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal)
            }}
            {...rest}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    {carregando ?
                        <ActivityIndicator size={'large'} />
                        :
                        <>

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {equipamentoStatus.name}
                                </Text>
                                <TouchableOpacity
                                    style={{ alignContent: "flex-end", width: "10%" }}
                                    onPress={() => setModal(false)}
                                >
                                    <Image style={styles.closeIcon} source={CloseIcon} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.firstStatsContainer}>
                                    <View style={styles.firstStats}>
                                        <Text style={styles.textTitle}>
                                            Raridade:
                                        </Text>
                                        <Text style={styles.text}>
                                            {equipamentoStatus.rarity.name}
                                        </Text>
                                    </View>
                                    <View style={styles.firstStats}>
                                        <Text style={styles.textTitle}>
                                            Tipo:
                                        </Text>
                                        <Text style={styles.text}>
                                            {equipamentoStatus.desc[0]}
                                        </Text>
                                    </View>
                                    <View style={styles.firstStats}>
                                        <Text style={styles.textTitle}>
                                            Preco:
                                        </Text>
                                        <Text style={styles.text}>
                                            R$ {precoRandomico},00
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.textTitle}>
                                        Descricao:
                                    </Text>
                                    <Text style={styles.text}>
                                        {equipamentoStatus.desc[1]}
                                    </Text>
                                </View>
                                {equipamentoStatus.desc[2] &&
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.textTitle}>
                                            Informações adicionais:
                                        </Text>
                                        <Text style={styles.text}>
                                            {equipamentoStatus.desc.map((text,index)=>{
                                                if (index>1) 
                                                    return text
                                            })}

                                        </Text>
                                    </View>
                                }
                            </ScrollView>
                            <Botao
                                title='Comprar'
                                activeOpacity={0.9}
                            />
                        </>
                    }
                </View>
            </View>

        </Modal>
    )
}