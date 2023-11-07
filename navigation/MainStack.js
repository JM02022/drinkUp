import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"
import MenuPrincipal from "../components/menuPrincipal";
import Juego from "../components/juego";

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="MenuPrincipal"
                    component={MenuPrincipal}
                />
                <Stack.Screen
                    name="Juego"
                    component={Juego}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MainStack
