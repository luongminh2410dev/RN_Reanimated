import * as shape from 'd3-shape'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { FadeInDown, FadeInRight, interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { getYForX, parse, ReText } from 'react-native-redash'
import Svg, { Path, Rect } from 'react-native-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import Metrics from '../../../../utils/metrics'
import styles from './styles'

const CountUpTimmer = forwardRef((props, ref) => {
    const [timmer, setTimmer] = useState(0);
    const refTimmerInterval = useRef();

    useImperativeHandle(ref, () => ({
        start: () => {
            refTimmerInterval.current = setInterval(() => {
                setTimmer(pre => pre + 1);
            }, 1000)
        },
        pause: () => {
            clearInterval(refTimmerInterval.current)
        }
    }))

    const hours = Math.floor(timmer / (60 * 60));
    const minute = Math.floor(timmer / 60);
    const second = timmer % 60;

    return (
        <Text style={styles.connection_state_countup}>
            {`${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`}
        </Text>
    )
})
const estimateValue = [40, 60, 40, 30, 50, 90, 60, 40];
const SVG_HEIGHT = 240;
const PATH_HEIGHT = SVG_HEIGHT / 2;
const PATH_WIDTH = Metrics.DEVICE_WIDTH - Metrics.HOME_MARGIN_ITEM * 2;
const path = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
    { x: -100, y: PATH_HEIGHT },
    { x: 24, y: PATH_HEIGHT * (1 - estimateValue[0] / 100) },
    { x: 24 + PATH_WIDTH * (1 / 8), y: PATH_HEIGHT * (1 - estimateValue[1] / 100) },
    { x: 24 + PATH_WIDTH * (2 / 8), y: PATH_HEIGHT * (1 - estimateValue[2] / 100) },
    { x: 24 + PATH_WIDTH * (3 / 8), y: PATH_HEIGHT * (1 - estimateValue[3] / 100) },
    { x: 24 + PATH_WIDTH * (4 / 8), y: PATH_HEIGHT * (1 - estimateValue[4] / 100) },
    { x: 24 + PATH_WIDTH * (5 / 8), y: PATH_HEIGHT * (1 - estimateValue[5] / 100) },
    { x: 24 + PATH_WIDTH * (6 / 8), y: PATH_HEIGHT * (1 - estimateValue[6] / 100) },
    { x: 24 + PATH_WIDTH * (7 / 8), y: PATH_HEIGHT * (1 - estimateValue[7] / 100) },
    { x: PATH_WIDTH + 100, y: PATH_HEIGHT },
]);
const pathParsed = parse(path);

const estimate_point = ['0k', '128k', '512k', '2m', '4m', '6m', '8m', '10m'];
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const Screen1 = ({ navigation }) => {
    const [isFavorite, setFavorite] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const connectAnim = useSharedValue(0);
    const graphX = useSharedValue(0);
    const activeGraphAnim = useSharedValue(false);
    const graphValueAnim = useSharedValue('0 ms');

    const refCountUpTimmer = useRef();

    const connectBtnStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(connectAnim.value, [0, 1], ['#ffffff', '#454445']);
        const borderColor = interpolateColor(connectAnim.value, [0, 1], ['#ffffff', '#e5fe46']);
        return {
            backgroundColor,
            borderColor
        }
    })

    const toggleFavouriteConnection = () => setFavorite(!isFavorite);

    const toggleConnectButton = () => {
        if (isConnected) {

        }
        isConnected ?
            refCountUpTimmer.current.pause()
            :
            refCountUpTimmer.current.start()
        connectAnim.value = withTiming(isConnected ? 0 : 1, { duration: 600 });
        setConnected(!isConnected);
    }

    const navigateToListConnection = () => {
        navigation.navigate('Screen2')
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event) => {
            activeGraphAnim.value = true;
            graphX.value = event.x;
        },
        onActive: (event) => {
            graphX.value = event.x;
            graphValueAnim.value = `${Math.floor((getYForX(pathParsed, graphX.value) / PATH_HEIGHT) * 200)} ms`;
        },
        onEnd: () => {
            activeGraphAnim.value = false;
        },
    })

    const cursorAnimStyles = useAnimatedStyle(() => {
        const translateX = graphX.value - 6;
        const translateY = (getYForX(pathParsed, graphX.value) - 6) || 0;
        return {
            transform: [
                { translateX },
                { translateY },
                { scale: withSpring(activeGraphAnim.value ? 1 : 0) }
            ],
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent barStyle='light-content' />
            <LinearGradient
                colors={['#5c4183', '#0f0f0f']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
                style={styles.linear_gradient}>
            </LinearGradient>
            <View style={styles.header}>
                <Text style={styles.header_title}>Fastest Location</Text>
            </View>
            <View style={styles.body}>
                <Animated.View
                    entering={FadeInRight.duration(600)}
                    style={styles.connection}>
                    <View style={styles.connection_info}>
                        <Image
                            source={{ uri: 'https://cdn.britannica.com/82/682-050-8AA3D6A6/Flag-France.jpg' }}
                            style={styles.connection_icon}
                        />
                        <View style={styles.connection_detail}>
                            <Text style={styles.connection_name}>France2-Net</Text>
                            <Text style={styles.connection_ip}>VPN IP: 79.110.53.95</Text>
                        </View>
                        <TouchableOpacity onPress={toggleFavouriteConnection}>
                            {
                                isFavorite ?
                                    <FontAwesome name='star' size={22} color='#c06339' />
                                    :
                                    <FontAwesome name='star-o' size={22} color='#716f74' />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.connection_state}>
                        <Text style={[styles.connection_state_txt, { color: isConnected ? '#e5fe46' : '#a5a2a6' }]}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
                        <View style={styles.connection_state_timming}>
                            <CountUpTimmer ref={refCountUpTimmer} />
                            <View style={styles.signal}>
                                <View style={{ width: 3, height: 6, backgroundColor: isConnected ? '#e5fe46' : '#a5a2a6' }}></View>
                                <View style={{ width: 3, height: 10, backgroundColor: isConnected ? '#e5fe46' : '#a5a2a6' }}></View>
                                <View style={{ width: 3, height: 14, backgroundColor: isConnected ? '#e5fe46' : '#a5a2a6' }}></View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
                <Animated.View entering={FadeInRight.duration(600).delay(200)} style={styles.signal_detail}>
                    <Text style={styles.time_delay}>Time delay: <Text style={{ color: '#fefefe', fontSize: 20, fontWeight: '600' }}>159</Text> ms</Text>
                    <View style={{ position: 'relative' }}>
                        <Svg>
                            <Path
                                fill='#e5fe46'
                                d={path}
                            />
                            <Rect
                                x="0"
                                y={SVG_HEIGHT / 2}
                                width={PATH_WIDTH}
                                height={SVG_HEIGHT / 2}
                                fill="#e5fe46"
                            />
                        </Svg>
                        <PanGestureHandler onGestureEvent={onGestureEvent}>
                            <Animated.View style={[styles.signal_cursor_container, { height: PATH_HEIGHT }]}>
                                <Animated.View style={[styles.signal_cursor, cursorAnimStyles]}>
                                    <View style={styles.cursor_value}>
                                        <ReText style={styles.cursor_value_txt} text={graphValueAnim} />
                                    </View>
                                    <View style={styles.cursor_box} />
                                </Animated.View>
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                    <View style={[styles.signal_absolute, { bottom: 24 }]}>
                        <View style={styles.signal_scale}>
                            {estimate_point.map((i, idx) => {
                                return (
                                    <Text key={idx} style={{ fontWeight: '600', color: '#131113' }}>{i}</Text>
                                )
                            })}
                        </View>
                    </View>
                </Animated.View>
                <View style={{ flex: 6 }}>
                    <View style={styles.row}>
                        <Animated.View entering={FadeInRight.duration(600).delay(400)} style={[styles.box, { marginRight: 12, }]}>
                            <View style={styles.box_name}>
                                <Text style={styles.box_name_txt}>Downloaded</Text>
                                <AntDesign name='arrowup' size={17} color='#fefdff' />
                            </View>
                            <View style={styles.box_value}>
                                <Text style={styles.box_value_txt}>960 mb</Text>
                            </View>
                        </Animated.View>
                        <Animated.View entering={FadeInRight.duration(600).delay(600)} style={styles.box}>
                            <View style={styles.box_name}>
                                <Text style={styles.box_name_txt}>Uploaded</Text>
                                <AntDesign name='arrowdown' size={17} color='#fefdff' />
                            </View>
                            <View style={styles.box_value}>
                                <Text style={styles.box_value_txt}>142 mb</Text>
                            </View>
                        </Animated.View>
                    </View>
                    <View style={styles.handle_bar_container}>
                        <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.handle_bar}>
                            <TouchableOpacity
                                onPress={navigateToListConnection}
                                style={styles.local_btn}>
                                <Octicons name='location' size={24} color='#f8f3fd' />
                            </TouchableOpacity>
                            <AnimatedTouchable
                                onPress={toggleConnectButton}
                                style={[styles.connect_btn, connectBtnStyles]}>
                                <Feather name='power' size={26} color={isConnected ? '#e5fe46' : '#131113'} />
                                <Text style={[styles.connect_btn_txt, { color: isConnected ? '#e5fe46' : '#131113' }]}>{isConnected ? 'Disconnected' : 'Connect'}</Text>
                            </AnimatedTouchable>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Screen1