import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab_bar: {
        width: width,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: '#ff0000'
    },
    tab_bar_background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    svg: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab_item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
export default styles