import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
const list_shoes = [
    { name: 'Alpha Savage', cost: 12.995, image: require('../../../../assets/shoes_1.jpeg'), background_color: '#dd4b4c' },
    { name: 'Air max 97', cost: 11.897, image: require('../../../../assets/shoes_2.png'), background_color: '#f0d800' },
    { name: 'Air Presto', cost: 12.995, image: require('../../../../assets/shoes_5.png'), background_color: '#616065' },
    { name: 'KD13 EP', cost: 12.995, image: require('../../../../assets/shoes_3.png'), background_color: '#aac877' },
    { name: 'Jordan 1', cost: 9.999, image: require('../../../../assets/shoes_4.png'), background_color: '#2c3049' },
]
const list_shoes_options = [
    { name: 'KD 13 White Navy', price: 8.249, image: require('../../../../assets/shoes_6.png') },
    { name: 'Air Zoom Pegasus', price: 9.129, image: require('../../../../assets/shoes_7.png') },
    { name: 'KD 13 EP', price: 9.129, image: require('../../../../assets/shoes_3.png') },
    { name: 'Air Presto', price: 18.129, image: require('../../../../assets/shoes_5.png') },
]
const filters = ['All', 'Air Max', 'Presto', 'Huarache', 'Jordan', 'Air Zoom'];
const keyFilterExtractor = (item, index) => `filter_${index}`;
const keyShoesExtractor = (item, index) => `shoes_${index}`;
const FilterItem = (props) => {
    const { item, index } = props;
    const [active, setActive] = useState(index == 0);
    const onPress = () => {
        setActive(!active)
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.filter_item, active && styles.filter_item_active]}>
            <Text style={[styles.filter_item_txt, active && styles.filter_item_txt_active]}>{item}</Text>
        </TouchableOpacity>
    )

}
const SHOES_ITEM_WIDTH = 200 + 36;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const ShoesItem = (props) => {
    const { item, index, shoesItemAnim } = props;
    const ShoesImageStyles = useAnimatedStyle(() => {
        const rotateZ = interpolate(
            shoesItemAnim.value,
            [index - 0.4, index, index + 0.6],
            [-0.26, 0, -0.26],
            Extrapolate.CLAMP
        );
        return {
            transform: [{ rotateZ: `${rotateZ}rad` }]
        }
    })
    const onPress = () => {

    }
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.shoes_item, { backgroundColor: item.background_color }]}>
            <AnimatedImage
                resizeMode='center'
                source={item.image}
                style={[styles.shoes_image, ShoesImageStyles]}
            />
            <Text style={styles.shoes_name}>{item.name}</Text>
            <Text style={styles.shoes_cost}>$ {item.cost}</Text>
            <View style={styles.shoes_decor} />
        </TouchableOpacity>
    )
}
const ShoesShopping = (props) => {
    const { navigation } = props;
    const shoesItemAnim = useSharedValue(0);
    const renderFilterItem = ({ item, index }) => (
        <FilterItem item={item} index={index} />
    )
    const renderShoesItem = ({ item, index }) => (
        <ShoesItem item={item} index={index} shoesItemAnim={shoesItemAnim} />
    )
    const renderShoesOptions = list_shoes_options.map((it, idx) => {
        return (
            <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                style={styles.shoes_options_item}>
                <Image
                    resizeMode='contain'
                    source={it.image}
                    style={styles.shoes_options_image}
                />
                <View style={styles.shoes_options_info}>
                    <Text style={styles.options_name}>{it.name}</Text>
                    <Text style={styles.options_price}>$ {it.price}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    const snapToOffsets = list_shoes.map((i, idx) => {
        return SHOES_ITEM_WIDTH * idx - 32;
    })
    const onScroll = event => {
        shoesItemAnim.value = (event.nativeEvent.contentOffset.x + 36) / SHOES_ITEM_WIDTH;
    }
    const navigatePreviousScreen = () => {
        navigation.goBack();
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigatePreviousScreen}
                    activeOpacity={0.7}
                    style={styles.header_btn}>
                    <MaterialCommunityIcons name='arrow-left' size={24} color='rgb(10,9,11)' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.header_btn}>
                    <MaterialCommunityIcons name='cloud-search-outline' size={24} color='rgb(10,9,11)' />
                </TouchableOpacity>
            </View>
            <View style={styles.filter_bar}>
                <Text style={styles.title}>Shoes</Text>
                <FlatList
                    data={filters}
                    horizontal
                    keyExtractor={keyFilterExtractor}
                    renderItem={renderFilterItem}
                    style={styles.list_filter}
                    contentContainerStyle={styles.list_filter_container}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.body}>
                <FlatList
                    data={list_shoes}
                    horizontal
                    pagingEnabled
                    snapToOffsets={snapToOffsets}
                    decelerationRate='fast'
                    onScroll={onScroll}
                    keyExtractor={keyShoesExtractor}
                    renderItem={renderShoesItem}
                    scrollEventThrottle={1}
                    style={styles.list_shoes}
                    contentContainerStyle={styles.list_shoes_container}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.more_options}>
                    <Text style={styles.options_total}>243 Options</Text>
                    {renderShoesOptions}
                </View>
            </View>
        </ScrollView>
    )
}

export default ShoesShopping