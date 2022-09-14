import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Animated, { ZoomIn } from 'react-native-reanimated'
import styles from './styles'

const animations = [
    { name: 'Absolute Button', stack: 'AbsoluteButton', image: require('../../assets/absolute_button.png') },
    { name: 'Round BottomTabs', stack: 'RoundBottomTabs', image: require('../../assets/round_bottom_tabs.png') },
    { name: 'Interaction Concept', stack: 'InteractionConcept', image: require('../../assets/interaction_concept.png') },
    { name: 'Cinema Booking', stack: 'CinemaBooking', image: require('../../assets/cinema_booking.png') },
    { name: 'SVG Bottom Tabs', stack: 'SVGBottomTabs', image: require('../../assets/svg_bottom_tabs.png') },
    { name: 'Shoes Shopping', stack: 'ShoesShopping', image: require('../../assets/shoes_shopping.png') },
]
const keyExtractor = (item, index) => `animation_${index}`
const Home = (props) => {
    const { navigation } = props;
    const renderItem = ({ item, index }) => {
        const navigateToAnimationScreen = () => {
            navigation.navigate(item.stack)
        }
        return (
            <Animated.View
                entering={ZoomIn.delay(index * 50)}
                style={styles.animation_item}>
                <TouchableOpacity
                    onPress={navigateToAnimationScreen}
                    activeOpacity={0.7}
                    style={styles.animation_btn}>
                    <Image
                        source={item.image}
                        resizeMode='contain'
                        style={styles.animation_img}
                    />
                    <Text style={styles.animation_name}>{item.name}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={animations}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={2}
                style={styles.list_animation}
                contentContainerStyle={styles.list_animation_container}
            />
        </View>
    )
}

export default Home