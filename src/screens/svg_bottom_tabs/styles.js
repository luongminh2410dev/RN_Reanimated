import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const TAB_WIDTH = width * 0.8;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default styles