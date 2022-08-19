import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const TAB_WIDTH = width * 0.8;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab_bar: {
        width: TAB_WIDTH,
        padding: 16,
        alignSelf: "center",
        backgroundColor: '#142d5e',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        flexDirection: "row",
    },
    tab_background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        padding: 16,
    },
    tab_background_item: {
        width: (TAB_WIDTH - 32) / 4,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    list_tab: {
        flexDirection: "row",
    },
    tab_item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    }
})
export default styles