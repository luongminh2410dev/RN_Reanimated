import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { FadeInDown, FadeInLeft, FadeOutRight } from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Storage from '../../../../utils/storage'
import styles from './styles'

const recentConnections = [
    { id: 0, name: 'France2-Net', speed: '6.10mb/s', icon: 'https://cdn.britannica.com/82/682-050-8AA3D6A6/Flag-France.jpg', isFavorite: true },
    { id: 1, name: 'Chinsu-1.1', speed: '2.10mb/s', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png', isFavorite: false },
];

// const connections = [
//     { id: 1, name: 'Austria Connect', speed: '5.74mb/s', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/255px-Flag_of_Austria.svg.png', isFavorite: false },
//     { id: 2, name: 'United State_LA', speed: '6.25mb/s', icon: 'https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png', isFavorite: false },
//     { id: 3, name: 'Belgium_NTV', speed: '5.28mb/s', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/1182px-Flag_of_Belgium.svg.png', isFavorite: false },
//     { id: 4, name: 'US_California', speed: '4.45mb/s', icon: 'https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png', isFavorite: false },
//     { id: 5, name: 'France2-Net', speed: '6.10mb/s', icon: 'https://cdn.britannica.com/82/682-050-8AA3D6A6/Flag-France.jpg', isFavorite: false },
//     { id: 6, name: 'Portugal-PVP', speed: '4.40mb/s', icon: 'https://img.freepik.com/free-vector/illustration-portugal-flag_53876-18170.jpg?auto=format&h=200', isFavorite: true },
//     { id: 7, name: 'Japan-JNet', speed: '6.10mb/s', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png', isFavorite: false },
//     { id: 8, name: 'Cambodia 2.0', speed: '1.10mb/s', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/800px-Flag_of_Cambodia.svg.png?20200818191502', isFavorite: false },
//     { id: 9, name: 'China_Net', speed: '3.33mb/s', icon: 'https://www.countryflags.com/wp-content/uploads/china-flag-png-large.png', isFavorite: false },
//     { id: 10, name: 'Chinsu-2.1', speed: '3.10mb/s', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png', isFavorite: true },
// ]

const ConnectionItem = (props) => {
    const { item, index, currentActive } = props;
    const navigation = useNavigation();
    const [isFavorite, setFavorite] = useState(item.isFavorite);
    const isActive = currentActive == item.id;

    const toggleFavoriteConnection = () => {
        setFavorite(!isFavorite);
    }

    const onConnectionItemPress = () => { }

    return (
        <Animated.View
            entering={FadeInDown.duration(500).delay(index * 80)}
            exiting={FadeOutRight.duration(500).delay(index * 50)}>
            <TouchableOpacity
                onPress={onConnectionItemPress}
                style={styles.connection_container}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <Image
                        source={{ uri: item.icon }}
                        style={styles.connection_icon}
                    />
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.connection_name}>{item.name}</Text>
                        <Text style={styles.connection_speed}>Speed: {item.speed}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={toggleFavoriteConnection}>
                    {
                        isFavorite ?
                            <FontAwesome name='star' size={20} color='#c06339' />
                            :
                            <FontAwesome name='star-o' size={20} color='#716f74' />
                    }
                </TouchableOpacity>
                <View style={[styles.connection_checkbox, { backgroundColor: isActive ? '#e5fe46' : '#535353' }]}>
                    <AntDesign name='check' size={18} color={'#171717'} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const keyExtractor = (item, index) => `connection_${index}_${Math.random()}`;
const Screen2 = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [currentActive, setCurrentActive] = useState(0);
    const [typeList, setTypeList] = useState(0);
    const refConnections = useRef([]);

    useEffect(() => {
        const connections = JSON.parse(Storage.getString('connections'));
        setData(connections);
        refConnections.current = [...connections];
    }, [])

    const renderItem = ({ item, index }) => (
        <ConnectionItem
            item={item}
            index={index}
            key={index}
            currentActive={currentActive}
            setCurrentActive={setCurrentActive} />
    )

    const getHeader = () => (
        <>
            {
                typeList == 0 &&
                <View style={styles.recent_connection}>
                    <Animated.Text
                        entering={FadeInLeft.duration(500)}
                        exiting={FadeOutRight.duration(500)}
                        style={styles.recent_connection_title}>
                        Recent connection
                    </Animated.Text>
                    <View style={styles.recent_connection_body}>
                        {
                            recentConnections.map((item, index) => (
                                <ConnectionItem
                                    item={item}
                                    index={index}
                                    key={index}
                                    currentActive={currentActive}
                                    setCurrentActive={setCurrentActive} />
                            ))
                        }
                    </View>

                </View>
            }
            <Animated.View
                entering={FadeInLeft.duration(500)}
                exiting={FadeOutRight.duration(500)}
                style={{ marginBottom: 12, marginTop: 12, }}>
                <Text style={styles.recent_connection_title}>{typeList == 0 ? 'All connection' : 'Favourite'}</Text>
            </Animated.View>
        </>
    )

    const navigatePreviousScreen = () => navigation.goBack();

    if (data.length == 0) return null;
    return (
        <View style={styles.container}>
            <StatusBar translucent barStyle='light-content' />
            <LinearGradient
                colors={['#5c4183', '#0f0f0f']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.5, y: 0.5 }}
                style={styles.linear_gradient}>
            </LinearGradient>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigatePreviousScreen}
                    style={styles.header_btn}>
                    <AntDesign name='arrowleft' size={22} color='#a0a0a2' />
                </TouchableOpacity>
                <Text style={styles.header_title}>Servers</Text>
                <View style={[styles.header_btn, { opacity: 0 }]}>
                    <AntDesign name='arrowleft' size={22} color='#a0a0a2' />
                </View>
            </View>
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                style={styles.list_connection}
                contentContainerStyle={styles.list_connection_container}
                ListHeaderComponent={getHeader}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.bottom_tab}>
                <View style={styles.bottom_tab_body}>
                    <TouchableOpacity
                        onPress={() => {
                            if (typeList == 0) return;
                            setTypeList(0);
                            setData(refConnections.current);
                        }}
                        style={[styles.tab_item, { backgroundColor: typeList == 0 ? 'white' : 'rgba(79,79,79,0.8)', marginRight: 8, }]}>
                        <Text style={[styles.tab_item_txt, { color: typeList == 0 ? 'black' : 'white' }]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (typeList == 1) return;
                            setTypeList(1);
                            const newArr = refConnections.current.filter(i => {
                                return i.isFavorite;
                            })
                            setData(newArr);
                        }}
                        style={[styles.tab_item, { backgroundColor: typeList == 1 ? 'white' : 'rgba(79,79,79,0.8)' }]}>
                        <Text style={[styles.tab_item_txt, { color: typeList == 1 ? 'black' : 'white' }]}>Favourite</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Screen2