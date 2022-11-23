import React from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import styles from './styles';

const listApp = [
    { name: 'VPN Interaction', stack: 'VpnInteraction' },
];
const keyExtractor = (item, index) => `app_${index}`;
const MiniApps = ({ navigation }) => {
    const renderItem = ({ item, index }) => {
        const navigateToAnimationScreen = () => {
            navigation.navigate(item.stack)
        }
        return (
            <Animated.View
                key={index}
                entering={ZoomIn.delay(index * 50)}
                style={styles.animation_item}>
                <TouchableOpacity
                    onPress={navigateToAnimationScreen}
                    activeOpacity={0.7}
                    style={styles.animation_btn}>
                    <Text style={styles.animation_name}>{item.name}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
                <FlatList
                    data={listApp}
                    numColumns={2}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    style={styles.list_app}
                />
            </View>
        </View>
    )
}

export default MiniApps