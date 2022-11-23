import { StyleSheet } from "react-native";
import Metrics from "../../../../utils/metrics";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
        paddingTop: Metrics.STATUS_BAR_HEIGHT
    },
    linear_gradient: {
        position: 'absolute',
        right: 0,
        width: 400,
        height: 400,
    },
    header: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: Metrics.HOME_MARGIN_ITEM,
        paddingHorizontal: Metrics.HOME_MARGIN_ITEM,
    },
    header_btn: {
        padding: 14,
        backgroundColor: '#2a2a2c',
        borderRadius: 12,
    },
    header_title: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500'
    },
    // body
    body: {
        flex: 1,
        marginTop: Metrics.HOME_MARGIN_ITEM * 2,
        paddingHorizontal: Metrics.HOME_MARGIN_ITEM,
    },
    recent_connection: {
        width: '100%',
    },
    recent_connection_title: {
        fontSize: 16,
        color: 'white',
        fontWeight: "bold"
    },
    recent_connection_body: {
        marginTop: 12,
    },
    // connection item
    connection_container: {
        width: '100%',
        backgroundColor: '#2a2a2c',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        padding: 14,
        flexDirection: "row",
        marginBottom: Metrics.HOME_MARGIN_ITEM,
    },
    connection_icon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 14,
        overflow: "hidden"
    },
    connection_name: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    connection_speed: {
        fontSize: 13,
        color: '#8a8a8a',
        fontWeight: '500'
    },
    connection_checkbox: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 8,
    },
    list_connection: {
        flex: 1,
        marginTop: Metrics.HOME_MARGIN_ITEM * 2,
        paddingHorizontal: Metrics.HOME_MARGIN_ITEM,
    },
    list_connection_container: {
        paddingBottom: Metrics.getSafeAreaInsets().bottom
    },
    // Bottom tab
    bottom_tab: {
        position: 'absolute',
        bottom: Metrics.getSafeAreaInsets().bottom,
        width: '70%',
        alignSelf: "center"
    },
    bottom_tab_body: {
        width: '100%',
        padding: 8,
        flexDirection: "row",
        borderRadius: 100,
        backgroundColor: 'rgba(60,60,60, 0.8)',
        overflow: "hidden"
    },
    tab_item: {
        flex: 1,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    tab_item_txt: {
        fontSize: 16,
        fontWeight: "bold"
    }
})
export default styles