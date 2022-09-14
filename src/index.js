import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AbsoluteButton from './screens/absolute_button';
import CinemaBooking from './screens/cinema_booking';
import Home from './screens/home';
import InteractionConcept from './screens/interaction_concept';
import RoundBottomTabs from './screens/round_bottom_tabs';
import ShoesShopping from './screens/shoes_shopping';
import SVGBottomTabs from './screens/svg_bottom_tabs';
FontAwesome.loadFont();
Ionicons.loadFont();
AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="RoundBottomTabs" component={RoundBottomTabs} />
                <Stack.Screen name="AbsoluteButton" component={AbsoluteButton} />
                <Stack.Screen name="InteractionConcept" component={InteractionConcept} />
                <Stack.Screen name="CinemaBooking" component={CinemaBooking} />
                <Stack.Screen name="SVGBottomTabs" component={SVGBottomTabs} />
                <Stack.Screen name="ShoesShopping" component={ShoesShopping} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App