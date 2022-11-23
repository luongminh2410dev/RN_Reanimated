import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import styled from 'styled-components/native';
import styles from './styles';

const options = [
    { name: 'Animations', stack: 'Animations', },
    { name: 'MiniApps', stack: 'MiniApps' },
]
const Home = (props) => {
    const { navigation } = props;
    return (
        <Container style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
                {
                    options.map((item, index) => {
                        const navigateToAnimationScreen = () => {
                            navigation.navigate(item.stack)
                        }
                        return (
                            <HomeItem
                                key={index}
                                entering={ZoomIn.delay(index * 50)}
                                style={styles.animation_item}>
                                <TouchableOpacity
                                    onPress={navigateToAnimationScreen}
                                    activeOpacity={0.7}
                                    style={styles.animation_btn}>
                                    <TextItem style={styles.animation_name}>{item.name}</TextItem>
                                </TouchableOpacity>
                            </HomeItem>
                        )
                    })
                }
            </View>
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

export default Home