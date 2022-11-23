import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
    },
    list_app: {
        flex: 1,
    },
    animation_item: {
        flex: 1,
        marginRight: 12,
        borderRadius: 4,
        backgroundColor: 'white',
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
        paddingVertical: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    animation_img: {
        width: '100%',
        height: 100,
    },
    animation_name: {
        fontSize: 16,
    }
})
export default styles