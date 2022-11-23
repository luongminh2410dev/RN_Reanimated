import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
    },
    list_animation: {
        width: '100%',
        flex: 1,
    },
    list_animation_container: {
        paddingVertical: 12,
    },
    animation_item: {
        width: width / 2 - 24,
        marginBottom: 12,
        marginRight: 12,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    animation_btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    animation_img: {
        width: '100%',
        height: 100,
    },
    animation_name: {
        marginTop: 4,
        fontSize: 15,
    }
})
export default styles