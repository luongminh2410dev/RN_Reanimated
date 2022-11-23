import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Screen1 from './stacks/screen1'
import Screen2 from './stacks/screen2'

const Stack = createStackNavigator();

const VpnInteraction = () => {
    return (
        <Stack.Navigator initialRouteName='Screen1' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
        </Stack.Navigator>
    )
}

export default VpnInteraction