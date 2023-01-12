import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const DISPLAY_WIDTH = width - 24;
const DISPLAY_HEIGHT = 150;
// const phrases = ['Cậu', 'Pháp', 'đi', 'ấy', 'đang', 'đến', 'từ', 'nấu ăn'];

const phrases = [
    { id: 0, content: 'Cậu' },
    { id: 1, content: 'Pháp' },
    { id: 2, content: 'đi' },
    { id: 3, content: 'ấy' },
    { id: 4, content: 'đang' },
    { id: 5, content: 'đến' },
    { id: 6, content: 'từ' },
    { id: 7, content: 'nấu ăn' },
    { id: 8, content: 'nấu ăn' }
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const PhraseItem = (props) => {
    const { item, index, selected, getPhrasePosition, onTogglePhraseItem, updateSizeOfPhrase } = props;
    const phraseOffset = useRef({ x: 0, y: 0 });
    const previousSelected = useRef(selected);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        const oldIndex = previousSelected.current.findIndex(i => i == index)
        const newIndex = selected.findIndex(i => i == index);
        if (oldIndex != newIndex) {
            if (newIndex != -1) {
                const { offsetX, offsetY } = getPhrasePosition(index, newIndex);
                const finalOffsetY = - (phraseOffset.current.y + (DISPLAY_HEIGHT - offsetY));
                const finalOffsetX = offsetX - phraseOffset.current.x;
                translateX.value = withTiming(finalOffsetX)
                translateY.value = withTiming(finalOffsetY)
            }
            else {
                translateX.value = withTiming(0)
                translateY.value = withTiming(0)
            }
        }
        previousSelected.current = selected;
    }, [selected])

    const onLayout = (e) => {
        phraseOffset.current = { x: e.nativeEvent.layout.x, y: e.nativeEvent.layout.y };
        updateSizeOfPhrase(index, { width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })
    }

    const absoluteButtonStyles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: translateY.value,
            left: translateX.value
        }
    })

    const onPress = () => {
        onTogglePhraseItem(index)
    }

    return (
        <View onLayout={onLayout}>
            <View style={[styles.phrase_item, { backgroundColor: 'lightgray' }]}>
                <Text style={[styles.phrase_item_txt, { opacity: 0 }]}>{item.content}</Text>
            </View>
            <AnimatedTouchable
                onPress={onPress}
                style={[
                    styles.phrase_item,
                    absoluteButtonStyles
                ]}>
                <Text style={styles.phrase_item_txt}>{item.content}</Text>
            </AnimatedTouchable>
        </View>
    )
}

const PairingPhrase = () => {
    const [selected, setSelected] = useState([]);
    const refConfigOfPhrases = useRef({});

    const _renderPhraseList = (item, index) => (
        <PhraseItem
            key={index}
            item={item}
            index={index}
            selected={selected}
            getPhrasePosition={getPhrasePosition}
            onTogglePhraseItem={onTogglePhraseItem}
            updateSizeOfPhrase={updateSizeOfPhrase} />
    )

    const updateSizeOfPhrase = (id, layout) => {
        refConfigOfPhrases.current[id] = { width: layout.width, height: layout.height };
    }

    const onTogglePhraseItem = (phraseId) => {
        const getIndex = selected.findIndex(i => i == phraseId);
        if (getIndex == -1) {
            setSelected([...selected, phraseId])
        }
        else {
            const newArray = [...selected];
            newArray.splice(getIndex, 1);
            setSelected(newArray);
        }
    }

    const getPhrasePosition = (id, position) => {
        let offsetX = 12;
        let offsetY = 12;
        const phraseHeight = refConfigOfPhrases.current[id].height;
        selected.map((item, index) => {
            if (index < position) {
                offsetX += refConfigOfPhrases.current[item].width;
                if (offsetX + refConfigOfPhrases.current[selected[index]].width > (DISPLAY_WIDTH + 12)) {
                    offsetX = 12;
                    offsetY += phraseHeight;
                }
            }
            return;
        })
        return { offsetX, offsetY };
    }

    return (
        <View style={styles.container}>
            <View style={[styles.display, { width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT }]}>
                <View style={styles.display_absolute}>
                    <View style={styles.display_line}>
                        <View style={[styles.phrase_item, { opacity: 0 }]}>
                            <Text style={styles.phrase_item_txt}>test</Text>
                        </View>
                    </View>
                    <View style={styles.display_line}>
                        <View style={[styles.phrase_item, { opacity: 0 }]}>
                            <Text style={styles.phrase_item_txt}>test</Text>
                        </View>
                    </View>
                    <View style={styles.display_line}>
                        <View style={[styles.phrase_item, { opacity: 0 }]}>
                            <Text style={styles.phrase_item_txt}>test</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.phrase_list}>
                {phrases.map(_renderPhraseList)}
            </View>

            <TouchableOpacity
                onPress={() => console.log(selected)} style={styles.result_btn}>
                <Text style={styles.result_btn_txt}>Show result</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PairingPhrase