import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { ThemeProvider } from 'styled-components';
import Animations from './screens/animations';
import AbsoluteButton from './screens/animations/stacks/absolute_button';
import CinemaBooking from './screens/animations/stacks/cinema_booking';
import DarkMode from './screens/animations/stacks/dark_mode';
import InteractionConcept from './screens/animations/stacks/interaction_concept';
import PairingPhrase from './screens/animations/stacks/pairing-phrase';
import RoundBottomTabs from './screens/animations/stacks/round_bottom_tabs';
import ShoesShopping from './screens/animations/stacks/shoes_shopping';
import SVGBottomTabs from './screens/animations/stacks/svg_bottom_tabs';
import Home from './screens/home';
import MiniApps from './screens/mini-apps';
import VpnInteraction from './screens/vpn-interaction';
import Storage from './utils/storage';
import { darkTheme, lightTheme } from './utils/theme';

FontAwesome.loadFont();
Ionicons.loadFont();
AntDesign.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
Octicons.loadFont();
Feather.loadFont();

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
                    <Stack.Screen name="Animations" component={Animations} />
                    <Stack.Screen name="MiniApps" component={MiniApps} />

                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="VpnInteraction" component={VpnInteraction} />
                    </Stack.Group>

                    <Stack.Group>
                        <Stack.Screen name="RoundBottomTabs" component={RoundBottomTabs} />
                        <Stack.Screen name="AbsoluteButton" component={AbsoluteButton} />
                        <Stack.Screen name="InteractionConcept" component={InteractionConcept} />
                        <Stack.Screen name="CinemaBooking" component={CinemaBooking} />
                        <Stack.Screen name="SVGBottomTabs" component={SVGBottomTabs} />
                        <Stack.Screen name="ShoesShopping" component={ShoesShopping} options={{ headerShown: false }} />
                        <Stack.Screen name="DarkMode" component={DarkMode} />
                        <Stack.Screen name="PairingPhrase" component={PairingPhrase} />
                    </Stack.Group>
                </Stack.Navigator>
            </ThemeProvider>
        </NavigationContainer>
    )
}

export default App