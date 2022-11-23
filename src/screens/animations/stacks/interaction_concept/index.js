import React, { useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeInDown, FadeOutDown, interpolate,
    Transition, useAnimatedStyle, useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const data = [
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
    {
        start: '07:54 AM', end: '02:26 PM', time_distance: '16 hrs 26 min',
        train_id: 'IRN 1763', start_date: '21.08.2022', end_date: '22.08.2022', distance: 650
    },
]
const keyExtractor = (item, index) => `ticket_${index}`;
const TicketItem = (props) => {
    const { item, index } = props;
    const ticketHiddentVisible = useRef(false);
    const containerAnim = useSharedValue(0);
    const ticketHiddenAnim = useSharedValue(0);
    const onPressIn = () => {
        containerAnim.value = withSpring(1);
    }
    const onPressOut = () => {
        containerAnim.value = withSpring(0, { stiffness: 500 });
    }
    const onPress = () => {
        ticketHiddentVisible.current = !ticketHiddentVisible.current
        ticketHiddenAnim.value = withTiming(ticketHiddentVisible.current ? 1 : 0);
    }
    // ANIMATION HANDLE
    const containerStyles = useAnimatedStyle(() => {
        const scale = interpolate(containerAnim.value, [0, 0.8, 1], [1, 0.96, 0.96])
        return {
            transform: [{ scale }]
        }
    })
    const ticketHiddenStyles = useAnimatedStyle(() => {
        const translateY = interpolate(ticketHiddenAnim.value, [0, 1], [140, 0]);
        const height = interpolate(ticketHiddenAnim.value, [0, 1], [0, 140])
        return {
            height,
            transform: [{ translateY }]
        }
    })
    return (
        <Animated.View
            style={containerStyles}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={0.8}
                style={styles.ticket_item}>
                <View style={styles.ticket_top}>
                    <View style={styles.ticket_top_clm}>
                        <Text style={styles.ticket_top_clm_txt_1}>Timisoara</Text>
                        <Text style={styles.ticket_top_clm_txt_2}>{item.start}</Text>
                        <Text style={styles.ticket_top_clm_txt_3}>Aug 21</Text>
                    </View>
                    <View style={styles.ticket_top_clm}>
                        <View style={styles.ticket_top_clm_decor}>
                            <View style={styles.ticket_dot_1} />
                            <View style={styles.ticket_line} />
                            <View style={styles.ticket_dot_2} />
                        </View>
                        <Text style={styles.ticket_time_distance}>{item.time_distance}</Text>
                    </View>
                    <View style={styles.ticket_top_clm}>
                        <Text style={styles.ticket_top_clm_txt_1}>lasi</Text>
                        <Text style={styles.ticket_top_clm_txt_2}>{item.end}</Text>
                        <Text style={styles.ticket_top_clm_txt_3}>Aug 21</Text>
                    </View>
                </View>
                <View style={styles.ticket_bottom}>
                    <View style={styles.ticket_bottom_item}>
                        <View style={styles.ticket_bottom_item_icon}>
                            <Ionicons name='ios-train-sharp' size={15} color='#3330d3' />
                        </View>
                        <Text style={styles.ticket_bottom_item_txt}>{item.train_id}</Text>
                    </View>
                    <View style={styles.ticket_bottom_item}>
                        <View style={styles.ticket_bottom_item_icon}>
                            <Text style={styles.ticket_bottom_item_icon_txt}>1</Text>
                        </View>
                        <Text style={styles.ticket_bottom_item_txt}>First Class</Text>
                    </View>
                    <View style={styles.ticket_bottom_item}>
                        <View style={styles.ticket_bottom_item_icon}>
                            <Text style={styles.ticket_bottom_item_icon_txt}>2</Text>
                        </View>
                        <Text style={styles.ticket_bottom_item_txt}>Second Class</Text>
                    </View>
                </View>
                <Animated.View
                    style={[styles.ticket_hidden, ticketHiddenStyles]}>
                    <Text style={styles.ticket_hidden_row}>Date:
                        <Text style={styles.ticket_hidden_value}> {item.start_date} - {item.end_date}</Text>
                    </Text>
                    <Text style={styles.ticket_hidden_row}>Time:
                        <Text style={styles.ticket_hidden_value}> {item.start} - {item.end}</Text>
                    </Text>
                    <Text style={styles.ticket_hidden_row}>Distance:
                        <Text style={styles.ticket_hidden_value}> {item.distance} km</Text>
                    </Text>
                    <TouchableOpacity style={styles.ticket_hidden_btn}>
                        <Text style={styles.ticket_hidden_btn_txt}>Buy Ticket</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    )
}
const InteractionConcept = () => {
    const renderItem = ({ item, index }) => (
        <TicketItem item={item} index={index} />
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                style={styles.list_ticket}
                contentContainerStyle={styles.list_ticket_container}
            />
        </View>
    )
}

export default InteractionConcept