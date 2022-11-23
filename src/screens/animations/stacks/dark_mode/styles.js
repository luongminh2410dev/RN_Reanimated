import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    switch_view: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    switch: {
        transform: [{ scale: 0.9 }]
    },
})
export default styles