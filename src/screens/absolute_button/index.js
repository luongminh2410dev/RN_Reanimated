import React from 'react'
import { Dimensions, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withSpring, useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated'
import styles from './styles'
const BUTTON_SIZE = 40;
const AbsoluteButton = () => {
    const { width, height } = Dimensions.get('window')
    const btnPositionX = useSharedValue(0);
    const btnPositionY = useSharedValue(0);
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = btnPositionX.value;
            context.translateY = btnPositionY.value;
        },
        onActive: (event, context) => {
            btnPositionX.value = event.translationX + context.translateX;
            btnPositionY.value = event.translationY + context.translateY;
        },
        onEnd: (event, context) => {
            if (Math.abs(btnPositionX.value) > (width / 2)) {
                btnPositionX.value = withSpring(- (width - 16 - BUTTON_SIZE));
            }
            else btnPositionX.value = withSpring(0);

            if (btnPositionY.value > 30 || Math.abs(btnPositionY.value) > (height - 200)) {
                btnPositionY.value = withSpring(context.translateY)
            }
        }
    })
    const btnAnimStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: btnPositionX.value },
                { translateY: btnPositionY.value }
            ]
        }
    })
    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[
                    styles.absolute_btn, {
                        height: BUTTON_SIZE,
                        width: BUTTON_SIZE
                    },
                    btnAnimStyles
                ]} />
            </PanGestureHandler>
        </View>
    )
}

export default AbsoluteButton