import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
const { width, height } = Dimensions.get('screen');
const list_film = [
    { name: 'Dune', image: require('../../assets/dune_film.jpg') },
    { name: 'Captain Marvel', image: require('../../assets/marvel_film.png') },
    { name: 'Aquaman', image: require('../../assets/aquaman_film.png') },
    { name: 'Minions: The rise of Gru ', image: require('../../assets/minions_film.jpeg') },
    { name: 'The lord of the rings', image: require('../../assets/ring_film.jpeg') },
]
const FILM_ITEM_WIDTH = (width * 0.7) + 32;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);
const FilmItem = forwardRef((props, ref) => {
    const { item, index, filmItemAnim, toggleScrollEnable } = props;
    const activeBtnAnim = useSharedValue(0);
    useImperativeHandle(ref, () => ({
        normalMode: () => {
            inactiveBtnAnim();
        }
    }))
    const filmImageStyles = useAnimatedStyle(() => {
        const heightImage = interpolate(activeBtnAnim.value, [0, 1], [350, 0]);
        const widthImage = interpolate(activeBtnAnim.value, [0, 1], [((width * 0.7) - 16), 0]);
        const opacityImage = interpolate(activeBtnAnim.value, [0, 1], [1, 0]);
        return {
            height: heightImage,
            width: widthImage,
            opacity: opacityImage
        }
    })
    const hiddenContentStyles = useAnimatedStyle(() => {
        const height = interpolate(activeBtnAnim.value, [0, 1], [0, 350]);
        const translateY = interpolate(activeBtnAnim.value, [0, 1], [50, 0]);
        return {
            width: '100%',
            height,
            opacity: activeBtnAnim.value,
            transform: [{ translateY }]
        }
    })
    const filmItemStyles = useAnimatedStyle(() => {
        // scroll item
        const translateY = interpolate(filmItemAnim.value, [index - 1, index, index + 1], [40, 0, 40]);
        // button active
        const widthItem = interpolate(activeBtnAnim.value, [0, 1], [width * 0.7, width]);
        const translateX = interpolate(activeBtnAnim.value, [0, 1], [0, index == 0 ? - 32 : -64]);
        return {
            width: widthItem,
            transform: [{ translateX }, { translateY }]
        }
    })
    const buttonMoreStyles = useAnimatedStyle(() => {
        const opacity = interpolate(activeBtnAnim.value, [0, 1], [1, 0]);
        return {
            opacity
        }
    })
    const buttonBuyStyles = useAnimatedStyle(() => {
        return {
            opacity: activeBtnAnim.value
        }
    })
    const onPress = () => {
        activeBtnAnim.value = withSpring(1, { stiffness: 50 });
        toggleScrollEnable();
    }
    const inactiveBtnAnim = () => {
        activeBtnAnim.value = withTiming(0);
        toggleScrollEnable();
    }
    return (
        <Animated.View style={[styles.film_item, filmItemStyles]}>
            <AnimatedImage
                resizeMode='cover'
                source={item.image}
                style={[styles.film_img, filmImageStyles]}
            />
            <Text numberOfLines={1} style={styles.film_name}>{item.name}</Text>
            <View style={styles.film_type}>
                <View style={styles.film_type_item}>
                    <Text style={styles.film_type_item_txt}>Action</Text>
                </View>
                <View style={styles.film_type_item}>
                    <Text style={styles.film_type_item_txt}>Drama</Text>
                </View>
                <View style={styles.film_type_item}>
                    <Text style={styles.film_type_item_txt}>History</Text>
                </View>
            </View>
            <View style={styles.film_rating}>
                <Text style={styles.film_rating_point}>9.0</Text>
                <View style={styles.film_rating_star}>
                    <FontAwesome name='star' size={18} color='#fcb708' style={styles.star_icon} />
                    <FontAwesome name='star' size={18} color='#fcb708' style={styles.star_icon} />
                    <FontAwesome name='star' size={18} color='#fcb708' style={styles.star_icon} />
                    <FontAwesome name='star' size={18} color='#fcb708' style={styles.star_icon} />
                    <FontAwesome name='star' size={18} color='#c6cdd6' style={styles.star_icon} />
                </View>
            </View>
            <Animated.View style={hiddenContentStyles}>
                <View style={styles.list_actor}>
                    <View style={styles.actor_item}>
                        <Image
                            resizeMode='cover'
                            style={styles.actor_image}
                            source={{ uri: 'https://ztjkzx.com/wp-content/uploads/2021/06/tom-hiddleston-tai-tu-sinh-ra-de-dong-vai-ga-ac-nhan-dep-trai-tom_hiddleston_reveals_when_he_almost_felt_his_loki_journey_was_over-1170x878.jpeg' }}
                        />
                        <Text style={styles.actor_name}>Tom Thuner</Text>
                    </View>
                    <View style={styles.actor_item}>
                        <Image
                            resizeMode='cover'
                            style={styles.actor_image}
                            source={{ uri: 'https://i.pinimg.com/originals/ba/ed/bc/baedbce971cb0d603d6de12432e155c6.jpg' }}
                        />
                        <Text style={styles.actor_name}>Keanu Reeves</Text>
                    </View>
                    <View style={styles.actor_item}>
                        <Image
                            resizeMode='cover'
                            style={styles.actor_image}
                            source={{ uri: 'https://m.media-amazon.com/images/M/MV5BMjA4NDkyODA3M15BMl5BanBnXkFtZTgwMzUzMjYzNzM@._V1_.jpg' }}
                        />
                        <Text style={styles.actor_name}>Amber Heard</Text>
                    </View>
                </View>
                <Text numberOfLines={13} style={styles.film_discription}>
                    The moving images of a film are created by photographing actual scenes with a motion-picture camera, by photographing drawings or miniature models using traditional animation techniques, by means of CGI and computer animation, or by a combination of some or all of these techniques, and other visual effects.
                    {'\n'}Before the introduction of digital production, series of still images were recorded on a strip of chemically sensitized celluloid (photographic film stock), usually at the rate of 24 frames per second. The images are transmitted through a movie projector at the same rate as they were recorded, with a Geneva drive ensuring that each frame remains still during its short projection time. A rotating shutter causes stroboscopic intervals of darkness, but the viewer does not notice the interruptions due to flicker fusion. The apparent motion on the screen is the result of the fact that the visual sense cannot discern the individual images at high speeds, so the impressions of the images blend with the dark intervals and are thus linked together to produce the illusion of one moving image. An analogous optical soundtrack (a graphic recording of the spoken words, music and other sounds) runs along a portion of the film exclusively reserved for it, and was not projected.
                    {'\n'}Contemporary films are usually fully digital through the entire process of production, distribution, and exhibition.
                </Text>
            </Animated.View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={styles.film_button}>
                <AnimatedText style={[styles.film_button_txt, buttonMoreStyles]}>More infomation</AnimatedText>
                <View style={styles.film_button_txt_absolute}>
                    <AnimatedText style={[styles.film_button_txt, buttonBuyStyles]}>Buy Ticket</AnimatedText>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
})
const keyExtractor = (item, index) => `film_${index}`;
const CinemaBooking = () => {
    const backgroundImageAnim = useSharedValue(0);
    const filmItemAnim = useSharedValue(0);
    const [scrollEnable, setScrollEnable] = useState(true);
    const refFilmItems = useRef([]);
    const renderItem = ({ item, index }) => (
        <FilmItem
            ref={ref => refFilmItems.current[index] = ref}
            item={item}
            index={index}
            toggleScrollEnable={toggleScrollEnable}
            filmItemAnim={filmItemAnim} />
    )
    const renderBackgroudImage = list_film.map((i, idx) => {
        const imageBackgroundStyles = useAnimatedStyle(() => {
            const translateX = interpolate(backgroundImageAnim.value, [idx - 1, idx - 0.8, idx], [-width, -width, 0], Extrapolate.CLAMP);
            const translateY = interpolate(backgroundImageAnim.value, [idx - 1, idx - 0.6, idx], [50, -50, 0], Extrapolate.CLAMP);
            const opacity = interpolate(backgroundImageAnim.value, [idx - 1, idx - 0.8, idx], [0, 0, 1], Extrapolate.CLAMP);
            return {
                transform: [{ translateX }, { translateY }],
                opacity,
                backgroundColor: 'rgba(0,0,0,0.15)'
            }
        })
        return (
            <Animated.View key={idx} style={imageBackgroundStyles}>
                <Image
                    resizeMode='cover'
                    source={i.image}
                    style={[styles.background_image, { zIndex: idx }]}
                />
            </Animated.View>
        )
    })
    const snapToOffsets = list_film.map((i, idx) => {
        return FILM_ITEM_WIDTH * idx - 32;
    })
    const onScroll = event => {
        backgroundImageAnim.value = (event.nativeEvent.contentOffset.x + 32) / FILM_ITEM_WIDTH;
        filmItemAnim.value = (event.nativeEvent.contentOffset.x + 32) / FILM_ITEM_WIDTH;
    }
    const toggleScrollEnable = () => {
        setScrollEnable(!scrollEnable)
    }
    const disableAllScaleMode = () => {
        refFilmItems.current.map((i, idx) => {
            refFilmItems.current[idx]?.normalMode();
        })
        setScrollEnable(!scrollEnable)
    }
    return (
        <View style={styles.container}>
            {renderBackgroudImage}
            <TouchableOpacity activeOpacity={1} onPress={disableAllScaleMode}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0.5, y: 0.4 }}
                    end={{ x: 0.5, y: 1, }}
                    style={styles.background}>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.list_film}>
                <FlatList
                    data={list_film}
                    horizontal
                    pagingEnabled
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    onScroll={onScroll}
                    snapToOffsets={snapToOffsets}
                    scrollEnabled={scrollEnable}
                    decelerationRate='fast'
                    scrollEventThrottle={1}
                    contentContainerStyle={styles.list_film_container}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    bounces={false}
                />
            </View>
        </View>
    )
}

export default CinemaBooking