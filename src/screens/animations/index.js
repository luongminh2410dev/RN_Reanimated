import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import styled from 'styled-components/native';
import styles from './styles';

const animations = [
    { name: 'Absolute Button', stack: 'AbsoluteButton', image: require('../../assets/absolute_button.png') },
    { name: 'Round BottomTabs', stack: 'RoundBottomTabs', image: require('../../assets/round_bottom_tabs.png') },
    { name: 'Interaction Concept', stack: 'InteractionConcept', image: require('../../assets/interaction_concept.png') },
    { name: 'Cinema Booking', stack: 'CinemaBooking', image: require('../../assets/cinema_booking.png') },
    { name: 'SVG Bottom Tabs', stack: 'SVGBottomTabs', image: require('../../assets/svg_bottom_tabs.png') },
    { name: 'Shoes Shopping', stack: 'ShoesShopping', image: require('../../assets/shoes_shopping.png') },
    { name: 'Dark Mode', stack: 'DarkMode', image: require('../../assets/shoes_shopping.png') },
]
const keyExtractor = (item, index) => `animation_${index}`
const Animations = (props) => {
    const { navigation } = props;
    const renderItem = ({ item, index }) => {
        const navigateToAnimationScreen = () => {
            navigation.navigate(item.stack)
        }
        return (
            <HomeItem
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
                    <TextItem style={styles.animation_name}>{item.name}</TextItem>
                </TouchableOpacity>
            </HomeItem>
        )
    }
    return (
        <Container style={styles.container}>
            <FlatList
                data={animations}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={2}
                style={styles.list_animation}
                contentContainerStyle={styles.list_animation_container}
            />
        </Container>
    )
}

const Container = styled.View`
    background-color: ${({ theme }) => theme.background}
`;
const HomeItem = styled(Animated.View)`
    background-color: ${({ theme }) => theme.card}
`;
const TextItem = styled.Text`
    color: ${({ theme }) => theme.text}
`

export default Animations