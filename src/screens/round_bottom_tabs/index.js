import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Tab = createBottomTabNavigator();
const PRIMARY_COLOR = '#142d5e';
const WHITE_COLOR = '#ffffff';
const HomeScreen = () => {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}
const TabBarCustom = (props) => {
    const { state, navigation } = props;
    const { routes } = state;
    const { width, height } = Dimensions.get('screen');
    const backgroundAnim = useSharedValue(state.index);
    const backgroundAnimStyles = useAnimatedStyle(() => {
        const TAB_ITEM_WIDTH = ((width * 0.8) - 32) / 4;
        return {
            transform: [
                { translateX: backgroundAnim.value * TAB_ITEM_WIDTH },
            ]
        }
    })
    useEffect(() => {
        backgroundAnim.value = withSpring(state.index, {
            damping: 15,
        })
    }, [state.index])
    const renderTabItem = state.routes.map((route, index) => {
        return (
            <TabBarItem
                key={index}
                route={route}
                index={index}
                state={state}
                navigation={navigation} />
        )
    })
    return (
        <View style={styles.tab_bar}>
            <View style={styles.tab_background}>
                <Animated.View style={[styles.tab_background_item, backgroundAnimStyles]} />
            </View>
            {renderTabItem}
        </View>
    )
}
const TabBarItem = (props) => {
    const { route, index, state, navigation } = props;
    const isFocused = state.index === index;
    const tabBarAnim = useSharedValue(0);
    const tabBarStyles = useAnimatedStyle(() => {
        const scale = interpolate(tabBarAnim.value, [0, 0.8, 1], [1, 1, 1.3])
        return {
            transform: [{
                scale
            }]
        }
    })
    const iconStyles = useAnimatedStyle(() => {
        const iconColor = interpolateColor(tabBarAnim.value, [0, 1], [WHITE_COLOR, PRIMARY_COLOR]);
        return {
            color: iconColor
        }
    })
    useEffect(() => {
        tabBarAnim.value = withSpring(isFocused ? 1 : 0, {})
    }, [isFocused])
    const renderIcon = () => {
        switch (index) {
            case 0:
                return <AnimatedIcon name='home' size={18} style={iconStyles} />
            case 1:
                return <AnimatedIcon name='options' size={18} style={iconStyles} />
            case 2:
                return <AnimatedIcon name='people-sharp' size={18} style={iconStyles} />
            case 3:
                return <AnimatedIcon name='person-sharp' size={18} style={iconStyles} />
            default:
                break;
        }
    }
    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
        }
    };
    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            style={styles.tab_item}>
            <Animated.View style={tabBarStyles}>
                {renderIcon()}
            </Animated.View>
        </TouchableOpacity>
    )
}
const RoundBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeTab'
            tabBar={prps => <TabBarCustom {...prps} />}
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name="HomeTab" component={HomeScreen} />
            <Tab.Screen name="Settings" component={HomeScreen} />
            <Tab.Screen name="Comunity" component={HomeScreen} />
            <Tab.Screen name="Account" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default RoundBottomTabs