import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as shape from 'd3-shape';
import React, { useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}
const Tab = createBottomTabNavigator();
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const WHITE_COLOR = 'white';
const PRIMARY_COLOR = '#142d5e';
const TabBarItem = (props) => {
    const { route, index, state, navigation } = props;
    const isFocused = state.index === index;
    const tabBarAnim = useSharedValue(0);
    const iconStyles = useAnimatedStyle(() => {
        const iconColor = interpolateColor(tabBarAnim.value, [0, 1], [PRIMARY_COLOR, WHITE_COLOR]);
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
            {renderIcon()}
        </TouchableOpacity>
    )
}
const CustomTabBar = (props) => {
    const { state, navigation } = props;
    const { width, height } = Dimensions.get('screen');
    const backgroundAnim = useSharedValue(0);
    const CENTER_POINT = ((width - 32) / 4) / 2;
    const pathStyles = useAnimatedStyle(() => {
        const scaleY = interpolate(
            backgroundAnim.value,
            [state.index - 1, state.index - 0.8, state.index, state.index + 0.2, state.index + 1],
            [1, 0.4, 1, 0.4, 1],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ scaleY }]
        }
    })
    const path = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: 0, y: 0 },
        { x: 20, y: 4 },
        { x: CENTER_POINT - 12, y: 36 },
        { x: (CENTER_POINT), y: 40 },
        { x: CENTER_POINT + 12, y: 36 },
        { x: (CENTER_POINT * 2) - 20, y: 4 },
        { x: CENTER_POINT * 2, y: 0 },
    ]);
    useEffect(() => {
        backgroundAnim.value = withSpring(state.index, {
            damping: 13,
            stiffness: 70,
        })
    }, [state.index])
    const backgroundStyles = useAnimatedStyle(() => {
        const TAB_ITEM_WIDTH = (width - 32) / 4;
        return {
            transform: [{ translateX: backgroundAnim.value * TAB_ITEM_WIDTH }],
        }
    })
    const renderTabItem = state.routes.map((route, index) => (
        <TabBarItem
            key={index}
            route={route}
            index={index}
            state={state}
            navigation={navigation} />
    ))
    return (
        <View style={styles.tab_bar}>
            <View style={styles.tab_bar_background}>
                <Animated.View style={backgroundStyles}>
                    <View style={styles.svg}>
                        <Svg>
                            <AnimatedPath
                                fill='#ff0000'
                                d={path}
                                style={pathStyles}
                            />
                        </Svg>
                    </View>
                </Animated.View>
            </View>
            {renderTabItem}
        </View>
    )
}
const SVGBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={(prp) => <CustomTabBar {...prp} />}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Home2' component={Home} />
            <Tab.Screen name='Home3' component={Home} />
            <Tab.Screen name='Home4' component={Home} />
        </Tab.Navigator>
    )
}

export default SVGBottomTabs