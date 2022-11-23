import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { withTheme } from 'styled-components'
import Storage from '../../../../utils/storage'
import { darkTheme, lightTheme } from '../../../../utils/theme'
import styles from './styles'

const AnimatedText = Animated.createAnimatedComponent(Text);
const DarkMode = (props) => {
    const { theme } = props;
    const [isEnable, setEnable] = useState(theme.isDark);
    const themeAnim = useSharedValue(theme.isDark ? 1 : 0);
    const handleSwitchToggle = () => {
        Storage.set('theme', !isEnable ? 'dark' : 'light');
        themeAnim.value = withTiming(!isEnable ? 1 : 0);
        setEnable(!isEnable);
    }

    const backgroundStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(themeAnim.value, [0, 1], [lightTheme.background, darkTheme.background])
        return { backgroundColor }
    })
    const textStyles = useAnimatedStyle(() => {
        const color = interpolateColor(themeAnim.value, [0, 1], [lightTheme.text, darkTheme.text])
        return { color }
    })
    return (
        <Animated.View style={[styles.container, backgroundStyles]}>
            <View style={styles.switch_view}>
                <AnimatedText style={textStyles}>Enable DarkMode</AnimatedText>
                <Switch
                    trackColor={{ false: "#767577", true: "red" }}
                    thumbColor={isEnable ? "white" : "yellow"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleSwitchToggle}
                    value={isEnable}
                    style={styles.switch}

                />
            </View>
        </Animated.View>
    )
}


export default withTheme(DarkMode)