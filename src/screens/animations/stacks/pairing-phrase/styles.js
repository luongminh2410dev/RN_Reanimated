import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    display: {
        marginTop: 12,
        alignSelf: 'center',
    },
    display_absolute: {
        position: 'absolute',
        width: '100%',
        top: 8,
    },
    display_line: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    phrase_list: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    phrase_item: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'gray',
        marginHorizontal: 4,
        marginBottom: 8,
        borderRadius: 16,
    },
    phrase_item_txt: {
        fontSize: 15,
        color: 'white'
    },
    result_btn: {
        marginTop: 24,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 4
    },
    result_btn_txt: {
        fontSize: 15,
        color: 'white'
    }
})
export default styles