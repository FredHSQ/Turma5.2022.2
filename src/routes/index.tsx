import React from 'react';
import { Equipamentos } from '../screens/Equipamentos';
import { Habilidades } from '../screens/Habilidades';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';

import ShopIcon from '../assets/icons/storefront_FILL0_wght400_GRAD0_opsz48.png'
import SkillsIcon from '../assets/icons/fact_check_FILL0_wght400_GRAD0_opsz48.png'
import CartIcon from '../assets/icons/shopping_cart_FILL0_wght400_GRAD0_opsz48.png'
import { Carrinho } from '../screens/Carrinho';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
    Habilidades: undefined;
    Loja: undefined;
    Carrinho: undefined;
}

const TabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#aaa",
                tabBarInactiveBackgroundColor: "#000",
                tabBarStyle: { backgroundColor: "#000", paddingBottom: 2 }
            }}
        >
            <Tab.Screen
                name='Habilidades'
                component={Habilidades}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <Image
                                resizeMode='contain'
                                source={SkillsIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Loja"
                component={Equipamentos}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <Image
                                resizeMode='contain'
                                source={ShopIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Carrinho"
                component={Carrinho}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (
                            <Image
                                resizeMode='contain'
                                source={CartIcon}
                                style={{ tintColor: color, width: 30 }}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}


export function Routes() {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}