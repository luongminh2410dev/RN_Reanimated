import { StyleSheet, Dimensions, NativeModules, Platform } from "react-native";
const { width, height } = Dimensions.get('screen');
const { StatusBarManager } = NativeModules;
let statusHeight = StatusBarManager.HEIGHT;
if (Platform.OS === 'ios') {
    StatusBarManager.getHeight((data) => (statusHeight = data.height));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: statusHeight,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    header_btn: {
        justifyContent: "center",
        alignItems: "center"
    },
    // FILTER BAR
    filter_bar: {
        marginTop: 12,
    },
    title: {
        fontSize: 24,
        width: '100%',
        paddingHorizontal: 12,
        color: '#292f3c',
        fontWeight: "bold"
    },
    list_filter: {
        marginTop: 12,
    },
    list_filter_container: {
        paddingLeft: 12,
    },
    filter_item: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#dfdfe0',
        borderRadius: 100,
        overflow: 'hidden'
    },
    filter_item_active: {
        backgroundColor: '#232934',
        borderColor: '#232934'
    },
    filter_item_txt: {
        color: '#7b7f85'
    },
    filter_item_txt_active: {
        color: 'white'
    },
    // BODY
    body: {
        width: '100%'
    },
    list_shoes: {
        marginVertical: 24,
        width: '100%',
    },
    list_shoes_container: {
        paddingRight: 36,
    },
    shoes_item: {
        position: 'relative',
        width: 200,
        height: 200,
        padding: 20,
        borderRadius: 8,
        marginLeft: 36,
    },
    shoes_image: {
        width: 174,
        height: 100,
        position: 'absolute',
        right: -26,
        bottom: 30,
    },
    shoes_decor: {
        flex: 1,
        borderLeftWidth: 0.4,
        borderColor: 'white'
    },
    shoes_name: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold"
    },
    shoes_cost: {
        fontSize: 18,
        color: 'white',
    },
    // OPTIONS 
    more_options: {
        marginTop: 12,
        paddingHorizontal: 12,
    },
    options_total: {
        fontSize: 15,
        color: '#82868c',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    shoes_options_item: {
        marginTop: 12,
        width: "100%",
        flexDirection: "row",
        borderTopWidth: 2,
        borderColor: '#f6f7f6',
    },
    shoes_options_image: {
        width: 100,
        height: 100
    },
    shoes_options_info: {
        flex: 1,
        marginLeft: 6,
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    options_name: {
        fontSize: 16,
    },
    options_price: {
        color: '#9ea1a9'
    }
})
export default styles