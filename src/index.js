import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
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
import DarkMode from './screens/dark_mode';
import { ThemeProvider } from 'styled-components';
import Storage from './utils/storage'
import { lightTheme, darkTheme } from './utils/theme';
FontAwesome.loadFont();
Ionicons.loadFont();
AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();
const App = () => {
    const [theme, setTheme] = useState(() => {
        return Storage.getString('theme') == 'dark' ? darkTheme : lightTheme;
    });
    useEffect(() => {
        const themeListener = Storage.addOnValueChangedListener((key) => {
            if (key == 'theme') {
                setTheme(Storage.getString('theme') == 'dark' ? darkTheme : lightTheme);
            }
        })
        return () => {
            themeListener.remove();
        }
    }, [])

    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>
                <Stack.Navigator
                    initialRouteName='Home'>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="RoundBottomTabs" component={RoundBottomTabs} />
                    <Stack.Screen name="AbsoluteButton" component={AbsoluteButton} />
                    <Stack.Screen name="InteractionConcept" component={InteractionConcept} />
                    <Stack.Screen name="CinemaBooking" component={CinemaBooking} />
                    <Stack.Screen name="SVGBottomTabs" component={SVGBottomTabs} />
                    <Stack.Screen name="ShoesShopping" component={ShoesShopping} options={{ headerShown: false }} />
                    <Stack.Screen name="DarkMode" component={DarkMode} />
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>
    )
}

export default App